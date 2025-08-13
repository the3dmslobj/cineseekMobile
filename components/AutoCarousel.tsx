import { dateFormatter } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

// Memoized Carousel Item
const CarouselItem = React.memo(
  ({ item, width }: { item: MovieDetails; width: number }) => {
    return (
      <Link href={`/movies/${item.id}`} asChild>
        <Pressable style={{ width, height: 220 }}>
          <ImageBackground
            source={{
              uri: item.backdrop_path
                ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                : "https://placehold.co/600x400/1a1a1a/ffffff.png",
            }}
            style={[styles.image, { width }]}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.9)"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={{ flex: 1 }}
            />
          </ImageBackground>

          <View style={[styles.content, { width }]}>
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
        </Pressable>
      </Link>
    );
  }
);

export default function AutoCarousel({ movies }: { movies: MovieDetails[] }) {
  const flatListRef = useRef<FlatList<MovieDetails> | null>(null);
  const intervalRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay start
  const startAutoPlay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = movies.length ? (prev + 1) % movies.length : 0;
        if (movies.length) {
          flatListRef.current?.scrollToIndex({ index: next, animated: true });
        }
        return next;
      });
    }, 5000);
  };

  // Autoplay stop
  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    startAutoPlay();
    return () => stopAutoPlay();
  }, [movies.length, width]);

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
        scrollEnabled={false} // disable manual scroll while autoplaying
        renderItem={({ item }) => <CarouselItem item={item} width={width} />}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        snapToInterval={width}
        snapToAlignment="start"
        decelerationRate="fast"
        removeClippedSubviews
        initialNumToRender={3}
        onScrollBeginDrag={stopAutoPlay}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);

          if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
          resumeTimeoutRef.current = setTimeout(
            () => startAutoPlay(),
            3000
          ) as unknown as number;
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
    height: 220,
    position: "absolute",
    top: 0,
    left: 0,
    alignSelf: "center",
  },
  content: {
    height: 220,
    padding: 20,
    justifyContent: "space-between",
  },
});
