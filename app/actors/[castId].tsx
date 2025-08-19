import { fetchCastDetails, getMoviesAppearedIn } from "@/services/api";
import useFetch from "@/services/useFetch";
import { dateFormatter } from "@/utils";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
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

type CastInfoProps = {
  label: string;
  value: string | number | null | undefined;
};

const CastInfo = ({ label, value }: CastInfoProps) => (
  <View className="flex-col items-start justify-center text-sm mt-6">
    <Text className="text-color2 font-dmBold text-[24px]">{label}</Text>
    <Text className="text-color4 font-dmSemi text-xl mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Actor = () => {
  const router = useRouter();
  const { castId } = useLocalSearchParams();

  const { data: cast, loading } = useFetch(() =>
    fetchCastDetails(castId as string)
  );

  const { data: movies, loading: moviesLoading } = useFetch(() =>
    getMoviesAppearedIn({ castOrCrew: "cast", Id: castId as string })
  );

  return (
    <View className="bg-color5 flex-1">
      {loading ? (
        <ActivityIndicator size="large" color="#8c8c8c" />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="relative w-full h-[600px]">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${cast?.profile_path}`,
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
          </View>

          <View className="flex-col items-start justify-center px-5 z-10">
            <Text className="text-color4 font-bold text-4xl font-dmBold">
              {cast?.name}
            </Text>
            {cast?.biography && (
              <CastInfo label="Biography." value={cast?.biography} />
            )}
            {cast?.birthday && (
              <CastInfo
                label="Born on."
                value={dateFormatter(cast?.birthday, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              />
            )}

            {cast?.deathday && (
              <CastInfo
                label="Died on."
                value={dateFormatter(cast?.deathday, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              />
            )}

            {cast?.place_of_birth && (
              <CastInfo label="Birthplace." value={cast.place_of_birth} />
            )}

            {cast?.known_for_department && (
              <CastInfo label="Occupation." value={cast.known_for_department} />
            )}

            <Text className="text-color2 font-dmBold text-[24px] mt-6">
              Appeared in as.
            </Text>
            <FlatList
              horizontal
              data={movies}
              renderItem={({ item }) => (
                <Link href={`/movies/${item.id}`} asChild>
                  <TouchableOpacity>
                    <View className="h-fit w-[100px]">
                      <View className="h-[150px] w-[100px] relative">
                        <Image
                          className="w-[100px] h-[150px] rounded"
                          source={{
                            uri: `https://image.tmdb.org/t/p/original${item?.poster_path}`,
                          }}
                        />
                        <View className="absolute top-1.5 right-1.5 bg-color5/70 px-1 flex flex-row items-center gap-1 py-1 rounded">
                          <FontAwesome name="star" color="#e6e6e6" />
                          <Text className="text-color4 font-bold">
                            {item.vote_average.toFixed(1)}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-color4 font-dmSemi text-lg mt-2">
                        {item.character}
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

export default Actor;
