import { fetchCastDetails, getMoviesAppearedIn } from "@/services/api";
import useFetch from "@/services/useFetch";
import { dateFormatter } from "@/utils";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
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

type CrewInfoProps = {
  label: string;
  value: string | number | null | undefined;
};

const CrewInfo = ({ label, value }: CrewInfoProps) => (
  <View className="flex-col items-start justify-center text-sm mt-6">
    <Text className="text-color2 font-dmBold text-[24px]">{label}</Text>
    <Text className="text-color4 font-dmSemi text-xl mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Director = () => {
  const router = useRouter();
  const { crewId } = useLocalSearchParams();

  const { data: crew, loading } = useFetch(() =>
    fetchCastDetails(crewId as string)
  );

  const { data: movies, loading: moviesLoading } = useFetch(() =>
    getMoviesAppearedIn({ castOrCrew: "crew", Id: crewId as string })
  );

  const [uniqueMovieArray, setUniqueMovieArray] = useState<Movie[] | undefined>(
    undefined
  );
  useEffect(() => {
    function uniqueMovieArray() {
      if (!movies) return;
      const filtered = movies.filter(
        (movie: Movie, index: number, self: Movie[]) =>
          index === self.findIndex((t) => t.id === movie.id)
      );

      setUniqueMovieArray(filtered);
    }

    uniqueMovieArray();
  }, [movies]);

  return (
    <View className="bg-color5 flex-1">
      {loading && moviesLoading ? (
        <ActivityIndicator size="large" color="#8c8c8c" />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="relative w-full h-[600px]">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${crew?.profile_path}`,
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
              {crew?.name}
            </Text>
            {crew?.biography && (
              <CrewInfo label="Biography." value={crew?.biography} />
            )}
            {crew?.birthday && (
              <CrewInfo
                label="Born on."
                value={dateFormatter(crew?.birthday, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              />
            )}

            {crew?.deathday && (
              <CrewInfo
                label="Died on."
                value={dateFormatter(crew?.deathday, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              />
            )}

            {crew?.place_of_birth && (
              <CrewInfo label="Birthplace." value={crew.place_of_birth} />
            )}

            {crew?.known_for_department && (
              <CrewInfo label="Occupation." value={crew.known_for_department} />
            )}

            <Text className="text-color2 font-dmBold text-[24px] mt-6">
              Directed.
            </Text>
            <FlatList
              horizontal
              data={uniqueMovieArray as Movie[]}
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
                    </View>
                  </TouchableOpacity>
                </Link>
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ marginTop: 12, gap: 10 }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Director;
