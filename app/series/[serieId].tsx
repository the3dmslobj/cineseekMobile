import { fetchSerieDetails, getCasts, getDirector } from "@/services/api";
import { getData, storeData } from "@/services/storage";
import useFetch from "@/services/useFetch";
import { dateFormatter } from "@/utils";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MovieInfoProps = {
  label: string;
  value: string | number | null | undefined;
};

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center text-sm mt-6">
    <Text className="text-color2 font-dmBold text-[24px]">{label}</Text>
    <Text className="text-color4 font-dmSemi text-xl mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const serie = () => {
  const { serieId } = useLocalSearchParams();

  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    async function loadWatchList() {
      const value = await getData("watchlist");
      if (value) setWatchlist(value);
    }

    loadWatchList();
  }, []);

  useEffect(() => {
    async function storeWatchList() {
      if (watchlist.length !== 0) {
        await storeData("watchlist", watchlist);
      }
    }

    storeWatchList();
  }, [watchlist]);

  const { data: serie, loading } = useFetch(() =>
    fetchSerieDetails(serieId as string)
  );

  const {
    data: director,
    loading: directorLoading,
    error,
  } = useFetch(() => getDirector({ tvOrSerie: "tv", Id: serieId as string }));

  const {
    data: casts,
    loading: castsLoading,
    error: castsError,
  } = useFetch(() => getCasts({ tvOrSerie: "tv", Id: serieId as string }));

  return (
    <View className="bg-color5 flex-1">
      {loading && directorLoading && castsLoading ? (
        <ActivityIndicator size="large" color="#8c8c8c" />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="relative w-full h-[600px]">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${serie?.poster_path}`,
              }}
              className="w-full h-[600px]"
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "#121212"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <TouchableOpacity
              className="absolute top-16 left-5 bg-color1/70 rounded-full py-5 flex flex-row items-center justify-center z-50"
              onPress={router.back}
            >
              <View className="px-[18px]">
                <FontAwesome name="arrow-left" color="#ffffff" size={18} />
              </View>
            </TouchableOpacity>

            {!watchlist?.includes(serieId as string) ? (
              <TouchableOpacity
                className="absolute top-16 right-5 bg-color1/70 rounded-full py-5 flex flex-row items-center justify-center z-50"
                onPress={() => {
                  setWatchlist((prev) => [...prev, serieId as string]);
                }}
              >
                <View className="px-[20px]">
                  <FontAwesome name="bookmark" color="#ffffff" size={18} />
                </View>
              </TouchableOpacity>
            ) : (
              <View className="px-4 absolute top-16 right-5 bg-color1/70 rounded-full py-4 flex flex-row items-center justify-center z-50">
                <Text className="text-color4 font-dmSemi text-xl">
                  In Watchlist
                </Text>
              </View>
            )}
          </View>

          <View className="flex-col items-start justify-center px-5 z-10">
            <Text className="text-color4 font-bold text-4xl font-dmBold">
              {serie?.name}
            </Text>
            <View className="flex-row items-center gap-x-2 mt-5">
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold">
                {serie?.status}
              </Text>
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold text-cente">
                <FontAwesome name="star" />
                {" " + Math.round(serie?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold">
                {serie?.vote_count} votes
              </Text>
            </View>

            <View className="flex-row items-center bg-dark-100 rounded-md gap-x-2 mt-2">
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold text-cente">
                {serie?.number_of_seasons} Seasons
              </Text>
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold">
                {serie?.number_of_episodes} Episodes
              </Text>
            </View>

            <MovieInfo label="Overview." value={serie?.overview} />
            <MovieInfo
              label="Genres."
              value={serie?.genres.map((g) => g.name).join(", ") || "N/A"}
            />

            <MovieInfo
              label="Aired."
              value={`${dateFormatter(serie?.first_air_date as string, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })} - ${
                serie?.status === "Ended"
                  ? dateFormatter(serie?.last_air_date as string, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Ongoing"
              }`}
            />

            <MovieInfo
              label="Production Companies."
              value={
                serie?.production_companies.map((c) => c.name).join(", ") ||
                "N/A"
              }
            />

            <Text className="text-color2 font-dmBold text-[24px] mt-6">
              Director.
            </Text>
            <Link href={`/directors/${director?.id}`}>
              <Text className="text-color4 font-dmSemi text-xl mt-2">
                {director?.name}
              </Text>
            </Link>

            <Text className="text-color2 font-dmBold text-[24px] mt-6">
              Casts.
            </Text>
            <FlatList
              horizontal
              data={casts}
              renderItem={({ item }) => (
                <Link href={`/actors/${item.id}`} asChild>
                  <TouchableOpacity>
                    <View className="h-fit w-[100px]">
                      <Image
                        className="w-[100px] h-[100px] rounded"
                        source={{
                          uri: `https://image.tmdb.org/t/p/original${item?.profile_path}`,
                        }}
                      />
                      <Text className="text-color4 font-dmSemi text-lg mt-2">
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Link>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ marginTop: 12, gap: 10 }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default serie;
