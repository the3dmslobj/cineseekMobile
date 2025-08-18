import { fetchMovieDetails } from "@/services/api";
import { getData, storeData } from "@/services/storage";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const saved = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function loadWatchList() {
        const value = await getData("watchlist");
        if (value) setWatchlist(value);
      }

      loadWatchList();
    }, [])
  );

  useEffect(() => {
    async function loadWatchList() {
      const value = await getData("watchlist");
      if (value) setWatchlist(value);
    }

    loadWatchList();
  }, []);

  useEffect(() => {
    async function storWatchList() {
      if (watchlist.length !== 0) {
        await storeData("watchlist", watchlist);
      }
    }

    storWatchList();
  }, [watchlist]);

  const [movies, setMovies] = useState<MovieDetails[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = await Promise.all(
        watchlist.map(async (id) => {
          const data = await fetchMovieDetails(id);
          return data;
        })
      );
      setMovies(fetchedMovies);
    }

    fetchMovies();
  }, [watchlist]);

  return (
    <View className="flex-1 bg-color5">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Text className="mt-20 text-color1 font-dmBold text-4xl">Cineseek</Text>
        <Text className="mt-8 font-dmBold text-3xl text-color2">
          WatchList.
        </Text>
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <Link href={"/"} asChild>
              <TouchableOpacity className="w-[30%] relative">
                <Image
                  source={{
                    uri: item.poster_path
                      ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                      : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                  }}
                  className="w-full h-52 rounded-lg"
                  resizeMode="cover"
                />
                <View className="absolute top-1.5 right-1.5 bg-color5/70 px-1 flex flex-row items-center gap-1 py-1 rounded">
                  <FontAwesome name="star" color="#e6e6e6" />
                  <Text className="text-color4 font-bold">
                    {item.vote_average.toFixed(1)}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          numColumns={3}
          scrollEnabled={false}
          className="mt-5"
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 20,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default saved;
