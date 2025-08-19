import { fetchMovieDetails } from "@/services/api";
import { getData, storeData } from "@/services/storage";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const saved = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [activeCard, setActiveCard] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      async function loadWatchList() {
        const value = await getData("watchlist");
        if (value) setWatchlist(value);
      }

      setActiveCard("");

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
      setLoading(false);
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

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#8c8c8c"
            className="mt-10 self-center"
          />
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="w-[30%] relative overflow-hidden"
                onPress={() => {
                  if (activeCard === item.id.toString()) {
                    setActiveCard("");
                  } else {
                    setActiveCard(item.id.toString());
                  }
                }}
              >
                <View
                  className={`relative w-full ${
                    activeCard === item.id.toString()
                      ? "-translate-x-full"
                      : "translate-x-0"
                  }`}
                >
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
                </View>

                <View
                  className={`absolute inset-0 ${
                    activeCard === item.id.toString()
                      ? "translate-x-0"
                      : "translate-x-full"
                  } items-center justify-center flex-col gap-4`}
                >
                  <Text
                    className="font-dmBold text-lg text-color4 text-center"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>

                  <Link href={`/movies/${item.id}`}>
                    <View
                      className="w-10 h-10 items-center border-2 justify-center
                 border-color4 rounded-full"
                    >
                      <FontAwesome
                        name="info-circle"
                        size={20}
                        color="#e6e6e6"
                      />
                    </View>
                  </Link>

                  <TouchableOpacity
                    onPress={() => {
                      setWatchlist((prev) =>
                        prev.filter((movie) => movie !== item.id.toString())
                      );
                    }}
                  >
                    <View
                      className="w-10 h-10 items-center border-2 justify-center
                 border-[#F54927] rounded-full"
                    >
                      <FontAwesome name="trash" size={20} color="#F54927" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
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
        )}
      </ScrollView>
    </View>
  );
};

export default saved;
