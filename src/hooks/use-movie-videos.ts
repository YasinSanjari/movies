import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/utils";

type VideosResponse = { results: { key: string; site: string; type: string }[] };

export function useMovieVideos(id?: string | null) {
  return useQuery({
    queryKey: ["movie-videos", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await axiosInstance.get<VideosResponse>(`/movie/${id}/videos`);
      const yt = data.results.find(v => v.site === "YouTube" && v.type === "Trailer");
      return yt?.key || null;
    },
  });
}
export default useMovieVideos;
