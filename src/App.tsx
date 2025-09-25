import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { MoviesResponse, Movie } from "./types/tmdb";
import useMovies from "./hooks/use-movies";
import Hero from "./components/Hero";
import MovieCard from "./components/MovieCard";
import Trending from "./components/Trending";
import Pager from "./components/Pager";
import MovieModal from "./components/movie/MovieModal";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: movies,
    isLoading,
    isError,
  } = useMovies({ query: searchTerm, page });

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <Box component="main" className="min-h-screen relative bg-[#030014]">
      <Hero search={searchTerm} onSearchChange={setSearchTerm} />
      <Container className="px-5 py-12 max-w-7xl mx-auto flex flex-col relative z-10">
        {!searchTerm && (
          <Trending
            movies={(movies as MoviesResponse | undefined)?.results ?? []}
          />
        )}

        <Box component="section" className="space-y-9">
          <Typography
            component="h2"
            className="text-white font-semibold"
            sx={{
              fontSize: { md: "30px", xs: "20px", sm: "22px" },
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontStyle: "bold",
              mb: 4,
            }}
          >
            {searchTerm ? "Search Results" : "Popular"}
          </Typography>

          {isLoading ? (
            <Box className="flex justify-center py-8">
              <CircularProgress sx={{ color: "#9ca4ab" }} />
            </Box>
          ) : isError ? (
            <Alert
              severity="error"
              sx={{ backgroundColor: "transparent", color: "#ef4444" }}
            >
              Failed to load movies.
            </Alert>
          ) : (
            <Box className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
              {((movies as MoviesResponse | undefined)?.results ?? []).map(
                (movie: Movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                )
              )}
            </Box>
          )}
          {!isError &&
            ((movies as MoviesResponse | undefined)?.total_pages ?? 0) > 1 && (
              <Pager
                page={page}
                totalPages={Math.min(
                  (movies as MoviesResponse).total_pages,
                  500
                )}
                onChange={setPage}
              />
            )}
        </Box>
      </Container>
      <MovieModal />
    </Box>
  );
}

export default App;
