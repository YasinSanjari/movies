import React from "react";
import useMovie from "../../hooks/use-movie";
import useMovieVideos from "../../hooks/use-movie-videos";
import useMovieModal from "../../hooks/use-movie-modal";
import MovieModalUI from "./MovieModalUI";

const MovieModal: React.FC = () => {
  const { movieId, close } = useMovieModal();
  const movieQ = useMovie(movieId);
  const trailerQ = useMovieVideos(movieId);
  return (
    <MovieModalUI
      open={Boolean(movieId)}
      onClose={close}
      loading={movieQ.isLoading}
      trailerLoading={trailerQ.isLoading}
      movie={movieQ.data}
      trailerKey={trailerQ.data}
    />
  );
};
export default MovieModal;
