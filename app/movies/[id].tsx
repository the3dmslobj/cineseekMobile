import { fetchMovieDetails, getCasts, getDirector } from "@/services/api";
import useFetch from "@/services/useFetch";
import { dateFormatter } from "@/utils";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
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

const movie = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  const {
    data: director,
    loading: directorLoading,
    error,
  } = useFetch(() => getDirector({ tvOrSerie: "movie", Id: id as string }));

  const {
    data: casts,
    loading: castsLoading,
    error: castsError,
  } = useFetch(() => getCasts({ tvOrSerie: "movie", Id: id as string }));

  return (
    <View className="bg-color5 flex-1">
      {loading && directorLoading && castsLoading ? (
        <ActivityIndicator size="large" color="#8c8c8c" />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="relative w-full h-[600px]">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${movie?.poster_path}`,
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
          </View>

          <View className="flex-col items-start justify-center px-5 z-10">
            <Text className="text-color4 font-bold text-4xl font-dmBold">
              {movie?.title}
            </Text>
            <View className="flex-row items-center gap-x-2 mt-5">
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold">
                {movie?.status}
              </Text>
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold">
                {movie?.release_date
                  ? dateFormatter(movie?.release_date, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </Text>
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold">
                {movie?.runtime} m
              </Text>
            </View>

            <View className="flex-row items-center bg-dark-100 rounded-md gap-x-2 mt-2">
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold text-cente">
                <FontAwesome name="star" />
                {" " + Math.round(movie?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-color5 text-lg bg-color2 px-2 rounded font-dmBold">
                {movie?.vote_count} votes
              </Text>
            </View>

            <MovieInfo label="Overview" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={movie?.genres.map((g) => g.name).join(", ") || "N/A"}
            />

            <View className="flex flex-row gap-16">
              <MovieInfo
                label="Budget"
                value={movie?.budget ? `${movie.budget / 1000000} mil` : "N/A"}
              />
              <MovieInfo
                label="Revenue"
                value={
                  movie?.revenue
                    ? `${(Math.round(movie?.revenue) / 1000000).toFixed(2)} mil`
                    : "N/A"
                }
              />
            </View>

            <MovieInfo
              label="Production Companies"
              value={
                movie?.production_companies.map((c) => c.name).join(", ") ||
                "N/A"
              }
            />

            <MovieInfo label="Director" value={director?.name} />

            <Text className="text-color2 font-dmBold text-[24px] mt-6">
              Casts
            </Text>
            <FlatList
              horizontal
              data={casts}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View className="h-fit w-[100px]">
                    <Image
                      className="w-[100px] h-[100px] rounded"
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${item?.profile_path}`,
                      }}
                    />
                    <Text className="text-color4 font-dmSemi text-xl mt-2">
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ marginTop: 12, gap: 10 }}
            />
          </View>
        </ScrollView>
      )}

      <TouchableOpacity
        className="absolute bottom-8 left-0 right-0 mx-10 bg-color1/95 rounded-lg py-5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <FontAwesome name="arrow-left" color="#ffffff" size={15} />
      </TouchableOpacity>
    </View>
  );
};

export default movie;
