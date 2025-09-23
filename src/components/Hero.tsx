import { Box, Container, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

type HeroProps = {
  search: string;
  onSearchChange: (v: string) => void;
};

const Hero = ({ search, onSearchChange }: HeroProps) => {
  return (
    <Box component="section" className="relative min-h-screen bg-[#030014]">
      <div
        className="absolute inset-0 w-full h-screen bg-center bg-cover z-0 -translate-y-12"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      />
      <Container className="px-5 py-12 max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <header className="mt-10">
                    <img
            src="/logo.png"
            alt="Logo"
            className="w-full max-w-[80px] h-auto object-contain mx-auto drop-shadow-md mb-4"
          />
          <img
            src="/hero.png"
            alt="Hero Banner"
            className="w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md mb-10"
          />
          <Typography
            component="h1"
            className="mx-auto max-w-4xl text-center font-bold text-white leading-tight"
            sx={{
              fontSize: { md:"48px", xs: "28px", sm: "36px", lg: "56px" },
              letterSpacing: 0,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontStyle: "bold",
            }}
          >
            Find{" "}
            <span className="bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent">
              Movies
            </span>{" "}
            You'll Enjoy
            <br />
            Without the Hassle
          </Typography>
          <SearchBar value={search} onChange={onSearchChange} />
        </header>
      </Container>
    </Box>
  );
};

export default Hero;
