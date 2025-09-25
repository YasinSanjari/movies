import { useNavigate, useSearchParams } from "react-router";

export function useMovieModal() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const movieId = params.get("movie");
  const close = () => {
    params.delete("movie");
    navigate({ search: params.toString() ? `?${params.toString()}` : "" }, { replace: true });
  };
  const open = (id: number | string) => {
    const next = new URLSearchParams(params);
    next.set("movie", String(id));
    navigate({ search: `?${next.toString()}` }, { replace: false });
  };
  return { movieId, open, close };
}
export default useMovieModal;
