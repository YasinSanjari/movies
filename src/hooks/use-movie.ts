import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/utils";
import type { MovieDetails } from "../types/tmdb";

export function useMovie(id?: string | null) {
  return useQuery({
    queryKey: ["movie", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await axiosInstance.get<MovieDetails>(`/movie/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
export default useMovie;
