import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] relative">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/original${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/1a1a1a.png",
          }}
          className="w-full h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute top-1.5 right-1.5 bg-color5/70 px-1 flex flex-row items-center gap-1 py-1 rounded">
          <FontAwesome name="star" color="#e6e6e6" />
          <Text className="text-color4 font-bold">
            {vote_average.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
