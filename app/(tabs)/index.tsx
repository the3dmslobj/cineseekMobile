import AutoCarousel from "@/components/AutoCarousel";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { fetchMovies, fetchTmdbTrendingMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: tmdbTrendingMovies,
    loading: tmdbTrendingLoading,
    error: tmdbTrendingError,
  } = useFetch(fetchTmdbTrendingMovies);

  return (
    <View className="flex-1 bg-color5">
      <View className="px-5">
        <Text className="mt-20 text-color1 font-dmBold text-4xl mb-3">
          Cineseek
        </Text>
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
        />
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {moviesLoading || trendingLoading || tmdbTrendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError || tmdbTrendingError ? (
          <Text>
            Error :{" "}
            {moviesError?.message ||
              trendingError?.message ||
              tmdbTrendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-10">
            {tmdbTrendingMovies && <AutoCarousel movies={tmdbTrendingMovies} />}

            {trendingMovies && (
              <View className="mt-8">
                <Text className="text-2xl text-color4 font-ralewayBold mb3">
                  Trending on Cineseek.
                </Text>
                <>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-6" />}
                    className="mb-4 mt-4"
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                  />
                </>
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies.
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
