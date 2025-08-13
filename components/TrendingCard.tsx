import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => fetchMovieDetails(movie_id.toString()));

  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-3">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-1 left-1 rounded-full">
          <Text className="font-bold text-color4 text-5xl font-ralewayBold">
            {index + 1}
          </Text>
        </View>

        <View className="absolute top-1 -right-2 bg-color5/70 px-2 py-1 rounded-lg flex flex-row items-center gap-1">
          <FontAwesome name="star" color="#e6e6e6" />
          <Text className="text-color4 font-bold">
            {trendingMovies?.vote_average.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
