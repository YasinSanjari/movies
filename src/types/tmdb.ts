export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  vote_average?: number;
  poster_path?: string;
  release_date?: string;
  original_language?: string;
  genre_ids?: number[];
  genres?: Genre[];
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieDetails = Movie & {
  overview: string;
  runtime?: number;
  spoken_languages?: { english_name: string }[];
  production_countries?: { name: string }[];
  production_companies?: { name: string }[];
  budget?: number;
  revenue?: number;
  tagline?: string;
  vote_average?: number;
  vote_count?: number;
  backdrop_path?: string;
  homepage?: string;
};
