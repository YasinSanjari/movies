import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/utils";
import type { MoviesResponse } from "../types/tmdb";

type MoviesParams = {
  query: string;
  page: number;
};

const fetchMovies = async ({
  query,
  page,
}: MoviesParams): Promise<MoviesResponse> => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `/movie/popular?page=${page}&language=en-US`;
  const { data } = await axiosInstance.get(endpoint);
  return data;
};

const useMovies = ({ query, page }: MoviesParams) => {
  return useQuery<MoviesResponse>({
    queryKey: ["movies", { query, page }],
    queryFn: () => fetchMovies({ query, page }),
  });
};

export default useMovies;
