import { Box, Typography, Stack } from "@mui/material";

type TrendingProps = {
  movies: Array<{ id: number; poster_path?: string; title: string }>;
};

const Trending = ({ movies }: TrendingProps) => {
  if (!movies?.length) return null;
  const top = movies.slice(0, 5);
  return (
    <Box component="section" className="mt-12 mb-16">
      <Typography
        component="h2"
        className="text-white font-semibold mb-8"
        sx={{
          fontSize: {md:"30px", xs: "20px", sm: "22px" },
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 700,
          fontStyle: "bold",
          mb: 4,
        }}
      >
        Trending
      </Typography>
      <Stack
        direction="row"
        spacing={2.5}
        className="w-full"
        sx={{
          overflow: "hidden",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {top.map((movie, index) => (
          <Box
            key={movie.id}
            className="flex flex-row items-center min-w-[230px]"
          >
            <Typography
              className="text-transparent font-bold whitespace-nowrap mt-6"
              sx={{
                fontSize: "120px",
                WebkitTextStroke: "2px rgba(255, 255, 255, 0.08)",
                fontFamily: '"Bebas Neue", sans-serif',
                lineHeight: 1,
                color: "#CECEFB36",
                textAlign: "left",
                mr: 1,
              }}
            >
              {index + 1}
            </Typography>
            <Box
              component="img"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "/no-movie.png"
              }
              alt={movie.title}
              className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5 shadow-lg"
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Trending;
