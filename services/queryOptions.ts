import { queryOptions } from "@tanstack/react-query";
import {
  fetchMovieDetails,
  fetchMovies,
  fetchTmdbTrendingMovies,
  getCasts,
  getDirector,
} from "./api";
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

export function getCastsQueryOptions({
  tvOrSerie,
  Id,
}: {
  tvOrSerie: string;
  Id: string;
}) {
  return queryOptions({
    queryKey: [`cast:${Id}`],
    queryFn: () => getCasts({ tvOrSerie, Id }),
  });
}

export function getMovieDetailsQueryOptions(id: string) {
  return queryOptions({
    queryKey: [`movieDetails:${id}`],
    queryFn: () => fetchMovieDetails(id),
  });
}

export function getDirectorQueryOptions({
  tvOrSerie,
  Id,
}: {
  tvOrSerie: string;
  Id: string;
}) {
  return queryOptions({
    queryKey: [`director:${Id}`],
    queryFn: () => getDirector({ tvOrSerie, Id }),
  });
}
