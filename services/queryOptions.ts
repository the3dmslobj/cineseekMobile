import { queryOptions } from "@tanstack/react-query";
import { fetchMovies, fetchTmdbTrendingMovies } from "./api";
import { getTrendingMovies } from "./appwrite";

export function trendingMoviesQueryOptions() {
  return queryOptions({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
  });
}

export function fetchMoviesQueryOptions(query: string) {
  return queryOptions({
    queryKey: ["Movies"],
    queryFn: () => fetchMovies({ query }),
  });
}

export function tmdbTrendingMoviesQueryOptions() {
  return queryOptions({
    queryKey: ["tmdbTrending"],
    queryFn: fetchTmdbTrendingMovies,
  });
}
