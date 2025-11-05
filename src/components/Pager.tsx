import { IconButton, Stack, Typography } from "@mui/material";
import arrow from "../assets/arrow.svg";
import type { RefObject } from "react";

type PagerProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  moviesRef: RefObject<HTMLDivElement | null>;
};

const Pager = ({ page, totalPages, onChange, moviesRef }: PagerProps) => {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handlePrev = () => {
    if (canPrev) {
      onChange(page - 1);
      moviesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (canNext) {
      onChange(page + 1);
      moviesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 4, gap: 4 }}
    >
      {/* Left Arrow */}
      <IconButton
        aria-label="Previous page"
        disabled={!canPrev}
        onClick={handlePrev}
        sx={{
          opacity: !canPrev ? 0.3 : 1,
          cursor: !canPrev ? "not-allowed" : "pointer",
          transition: "opacity 0.2s ease",
        }}
      >
        <img src={arrow} alt="previous" />
      </IconButton>

      <Typography color="#cecefb" fontWeight={600}>
        {page}/{totalPages}
      </Typography>

      {/* Right Arrow */}
      <IconButton
        aria-label="Next page"
        disabled={!canNext}
        onClick={handleNext}
        sx={{
          opacity: !canNext ? 0.3 : 1,
          cursor: !canNext ? "not-allowed" : "pointer",
          transition: "opacity 0.2s ease",
        }}
      >
        <img src={arrow} alt="next" className="rotate-180" />
      </IconButton>
    </Stack>
  );
};

export default Pager;
