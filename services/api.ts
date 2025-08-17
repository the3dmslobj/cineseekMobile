export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies, ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchTmdbTrendingMovies = async (): Promise<MovieDetails[]> => {
  let trendingDetails: MovieDetails[] = [];
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/popular?language=en-US&page=1`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies, ${response.statusText}`);
  }

  const data = await response.json();
  const trendingMovies = data.results;

  trendingMovies.map(async (movie: MovieDetails) => {
    try {
      const response = await fetch(
        `${TMDB_CONFIG.BASE_URL}/movie/${movie.id}?api_key=${TMDB_CONFIG.API_KEY}`,
        {
          method: "GET",
          headers: TMDB_CONFIG.headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      trendingDetails.push(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  return trendingDetails;
};

export const getDirector = async ({
  tvOrSerie,
  Id,
}: {
  tvOrSerie: string;
  Id: string;
}) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${Id}/credits`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies, ${response.statusText}`);
  }

  const data = await response.json();
  const directors = data.crew
    .filter(
      (c: any) =>
        c.known_for_department === "Directing" && c.department === "Directing"
    )
    .sort((a: any, b: any) => b.popularity - a.popularity);

  return directors[0];
};

export const getCasts = async ({
  tvOrSerie,
  Id,
}: {
  tvOrSerie: string;
  Id: string;
}) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${Id}/credits`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies, ${response.statusText}`);
  }

  const data = await response.json();
  return data.cast;
};
