import { Box, TextField, InputAdornment } from "@mui/material";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <Box className="w-full max-w-3xl mx-auto mt-6 flex items-center">
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search through 300+ movies online"}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component="img"
                src="/search.svg"
                alt="search"
                className="h-5 w-5"
              />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
          "& .MuiInputBase-input": {
            color: "#e5e7eb",
            fontSize: "16px",
            "&::placeholder": {
              color: "#a8b5db",
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
