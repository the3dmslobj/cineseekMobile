import SearchBar from "@/components/SearchBar";
import SearchMovieCard from "@/components/SearchMovieCard";
import SearchTvCard from "@/components/SearchTvCard";
import { fetchMoviesWPages } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const flatlistRef = useRef<FlatList>(null);

  const [isTv, setIsTv] = useState<boolean>(false);

  const {
    data,
    loading: moviesLoading,
    error: moviesError,
    refetch: moviesRefetch,
    reset,
  } = useFetch(
    () =>
      fetchMoviesWPages({
        query: searchQuery,
        page: currentPage,
        tvOrMovie: isTv,
      }),
    false
  );

  useEffect(() => {
    moviesRefetch();
  }, [currentPage]);

  useEffect(() => {
    if (data?.results.length > 0 && data?.results[0]) {
      updateSearchCount(searchQuery, data.results[0]);
    }
  }, [data]);

  return (
    <View className="flex-1 bg-color5 px-5">
      <FlatList
        ref={flatlistRef}
        data={data?.results}
        renderItem={({ item }) =>
          !isTv ? <SearchMovieCard {...item} /> : <SearchTvCard {...item} />
        }
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text
              className="mt-20 text-color1 font-dmBold text-4xl"
              onPress={() => router.push("/")}
            >
              Cineseek
            </Text>
            <View className="mt-6 mb-5 flex-row items-center gap-2">
              <SearchBar
                placeholder="Search movies"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                onSubmitEditing={() => {
                  moviesRefetch();
                  setCurrentPage(1);
                }}
                resetSearch={() => {
                  setSearchQuery("");
                  reset();
                }}
              />
              <Pressable
                className="flex-row w-fit bg-color3 h-full items-center rounded-lg relative"
                onPress={() => setIsTv(!isTv)}
              >
                <View className="py-3 pl-4 pr-2 w-fit">
                  <Text className="font-dmBold">S</Text>
                </View>
                <View className="py-3 px-3 w-fit">
                  <Text className="font-dmBold">M</Text>
                </View>
                <View
                  className={`absolute bottom-1 top-1 ${
                    !isTv ? "left-1 right-10" : "left-10 right-1"
                  } bg-color1 rounded`}
                ></View>
              </Pressable>
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#8c8c8c"
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              data?.results.length > 0 && (
                <Text className="text-xl text-color2 font-dmSemi mb-1.5">
                  Search Results for{" "}
                  <Text className="text-color4 font-dmBold">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-20 px-5">
              <Text className="text-center text-color2 font-ralewaySemi text-xl tracking-wide">
                {searchQuery.trim() !== ""
                  ? `No ${!isTv ? "Movies Found" : "Series Found"}.`
                  : `Search for a ${!isTv ? "Movie" : "Serie"}.`}
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          data &&
          data.total_pages > 1 && (
            <View className="flex flex-row justify-center items-center pt-2 mt-2">
              {currentPage > 1 && (
                <>
                  <Pressable
                    onPress={() => {
                      setCurrentPage(1);
                      flatlistRef.current?.scrollToOffset({
                        offset: 0,
                        animated: true,
                      });
                    }}
                    className="w-10 h-10 mx-1 rounded flex items-center justify-center bg-transparent"
                  >
                    <FontAwesome
                      name="angle-double-left"
                      size={20}
                      color="#666"
                    />
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setCurrentPage(currentPage - 1);
                      flatlistRef.current?.scrollToOffset({
                        offset: 0,
                        animated: true,
                      });
                    }}
                    className="w-10 h-10 mx-1 rounded flex items-center justify-center bg-transparent"
                  >
                    <FontAwesome name="angle-left" size={20} color="#666" />
                  </Pressable>
                </>
              )}

              {Array.from({ length: 3 }, (_, i) => currentPage + i)
                .filter((page) => page <= data.total_pages)
                .map((page) => (
                  <Pressable
                    key={page}
                    onPress={() => {
                      setCurrentPage(page);
                      flatlistRef.current?.scrollToOffset({
                        offset: 0,
                        animated: true,
                      });
                    }}
                    className={`w-10 h-10 mx-1 rounded flex items-center justify-center ${
                      page === currentPage ? "bg-color1" : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-lg font-bold ${
                        page === currentPage ? "text-color4" : "text-color2"
                      }`}
                    >
                      {page}
                    </Text>
                  </Pressable>
                ))}

              {currentPage < data.total_pages && (
                <>
                  <Pressable
                    onPress={() => {
                      setCurrentPage(currentPage + 1);
                      flatlistRef.current?.scrollToOffset({
                        offset: 0,
                        animated: true,
                      });
                    }}
                    className="w-10 h-10 mx-1 rounded flex items-center justify-center bg-transparent"
                  >
                    <FontAwesome name="angle-right" size={20} color="#666" />
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setCurrentPage(data.total_pages);
                      flatlistRef.current?.scrollToOffset({
                        offset: 0,
                        animated: true,
                      });
                    }}
                    className="w-10 h-10 mx-1 rounded flex items-center justify-center bg-transparent"
                  >
                    <FontAwesome
                      name="angle-double-right"
                      size={20}
                      color="#666"
                    />
                  </Pressable>
                </>
              )}
            </View>
          )
        }
      />
    </View>
  );
};

export default search;
