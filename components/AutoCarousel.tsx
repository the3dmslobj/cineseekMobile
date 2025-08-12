import { dateFormatter } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function AutoCarousel({ movies }: { movies: MovieDetails[] }) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= movies.length) nextIndex = 0;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({
        animated: true,
        index: nextIndex,
      });
    }, 5000); // slide every 3 seconds

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <View
      style={styles.container}
      className="relative rounded-xl overflow-hidden"
    >
      <FlatList
        ref={flatListRef}
        data={movies}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/movies/${item.id}`}>
            <View className="flex flex-col relative" style={{ width: width }}>
              <ImageBackground
                source={{
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                    : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                }}
                style={{
                  width,
                  height: 220,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  alignSelf: "center",
                }}
              >
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.9)"]}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 1 }}
                  style={{ flex: 1 }}
                />
              </ImageBackground>

              <View className="w-ful h-full p-5 flex flex-col justify-between">
                <Text className="text-color4 text-2xl font-ralewayBold mr-20">
                  {item.title}
                </Text>
                <View>
                  <Text
                    className="text-color4 font-dmBold mb-8 text-lg mr-20"
                    numberOfLines={2}
                  >
                    {item.tagline}
                  </Text>
                  <Text className="text-color4 font-dmBold">
                    TMDB Rating - {item.vote_average.toFixed(1)} / 10
                  </Text>
                  <Text className="text-color4 font-dmBold mt-1">
                    Release Date -{" "}
                    {dateFormatter(item.release_date, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </Link>
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
  },
  image: {
    width: width,
    height: 220,
    alignSelf: "center",
  },
});
