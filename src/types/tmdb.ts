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
