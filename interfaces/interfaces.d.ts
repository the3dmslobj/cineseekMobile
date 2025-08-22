interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline: string;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

interface TVSeries {
  id: number;
  name: string; // title of the TV show
  original_name: string; // original title
  origin_country?: string[]; // array of country codes
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string; // first episode air date
  last_air_date?: string; // optional, last episode air date
  genre_ids?: number[]; // optional array of genre IDs
  vote_average: number;
  vote_count: number;
  in_production: boolean; // if the series is still running
  number_of_episodes: number;
  number_of_seasons: number;
  tagline?: string;
  episode_run_time?: number[]; // array of runtimes per episode
}

interface TVSeriesDetails {
  id: number;
  name: string;
  original_name: string;
  overview: string | null;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  original_language: string;
  status: string; // "Returning Series", "Ended", etc.
  tagline: string | null;
  type: string; // "Scripted", "Reality", etc.
  popularity: number;
  vote_average: number;
  vote_count: number;
  in_production: boolean;
  number_of_episodes: number;
  number_of_seasons: number;
  first_air_date: string;
  last_air_date: string | null;
  backdrop_path: string | null;
  poster_path: string | null;
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }[];
  next_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
  } | null;
  last_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
  } | null;
}
