import { IconButton, Stack, Typography } from "@mui/material";
import arrow from "../assets/arrow.svg";

type PagerProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pager = ({ page, totalPages, onChange }: PagerProps) => {
  const canPrev = page > 1;
  const canNext = page < totalPages;
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
        onClick={() => canPrev && onChange(page - 1)}
        sx={{
          opacity: !canPrev ? 0 : 1,
          cursor: !canPrev ? "not-allowed" : "pointer",
        }}
      >
        <img src={arrow} alt="next" className="" />
      </IconButton>

      <Typography color="#cecefb" fontWeight={600}>
        {page}/{totalPages}
      </Typography>

      {/* Right Arrow */}
      <IconButton
        aria-label="Next page"
        disabled={!canNext}
        onClick={() => canNext && onChange(page + 1)}
      >
        <img src={arrow} alt="next" className="rotate-180" />
      </IconButton>
    </Stack>
  );
};

export default Pager;
