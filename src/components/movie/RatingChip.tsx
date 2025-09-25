import React from "react";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { StarIcon } from "./Icons";

export const RatingChip: React.FC<{ value: number; count: number }> = ({ value, count }) => (
  <Tooltip title={`${value.toFixed(1)} / 10 (${count.toLocaleString()})`}>
    <Chip
      icon={<StarIcon className="text-amber-300" />}
      label={`${value.toFixed(1)} / 10 (${count.toLocaleString()})`}
      className="bg-amber-400/10 text-amber-300 border border-amber-400/25 backdrop-blur"
      sx={{ "& .MuiChip-label": { fontWeight: 600 } }}
      size="medium"
    />
  </Tooltip>
);
export default RatingChip;
