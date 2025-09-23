import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import type { Movie } from "../types/tmdb";

const genreMap: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Anime",
  35: "Comedy",
  80: "Crime",
  99: "Doc",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { title, vote_average, poster_path, genre_ids } = movie;

  const getGenre = () => {
    if (!genre_ids || genre_ids.length === 0) return "Movie";
    return genreMap[genre_ids[0]] || "Unknown";
  };

  const genre = getGenre();

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "#0f0d23",
        borderRadius: "12px",
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
        sx={{
          borderRadius: "8px",
          width: "100%",
          height: "auto",
          aspectRatio: "2/3",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          p: 0,
          "&:last-child": { pb: 0 },
          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="#fff"
          sx={{
            fontSize: "16px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>

        {/* Rating and Genre */}
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ mt: 1, overflow: "hidden" }}
        >
          <Stack display="flex" direction="row" alignItems="center" gap={0.5}>
            <Box
              component="img"
              src="/star.svg"
              alt="Star Icon"
              sx={{ width: 16, height: 16, objectFit: "contain" }}
            />
            <Typography color="#fff" fontWeight={700} sx={{ fontSize: "14px" }}>
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </Typography>
          </Stack>

          <Typography sx={{ fontSize: "14px", color: "#9ca4ab" }}>•</Typography>

          <Typography
            sx={{
              fontSize: "14px",
              color: "#9ca4ab",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {genre}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
