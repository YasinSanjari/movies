import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// removed RatingChip import (it wasn't used)
import MetaRow from "./MetaRow";
import { CloseIcon, StarIcon } from "./Icons";
import type { MovieDetails } from "../../types/tmdb";
import { fmtDate, fmtMoney, joinOrDash } from "../../utils/format";

const SURFACE = "bg-[#0B0A1A]";
const CARD = "bg-[#15112E]";
const BORDER = "border-[#2A2151]/60";
const RADIUS = "rounded-[24px]";
const RADIUS_SM = "rounded-[14px]";

function formatRuntime(min?: number) {
  if (!min) return "—";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
}

export const MovieModalUI: React.FC<{
  open: boolean;
  onClose: () => void;
  loading: boolean;
  trailerLoading: boolean;
  movie?: MovieDetails;
  trailerKey?: string | null;
}> = ({ open, onClose, loading, trailerLoading, movie, trailerKey }) => {
  const poster = useMemo(
    () =>
      movie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : undefined,
    [movie]
  );
  const backdrop = useMemo(
    () =>
      movie?.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
        : undefined,
    [movie]
  );

  // avoid `any` – allow optional status if present in API
  const statusText =
    (movie as MovieDetails & { status?: string })?.status ?? "Released";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        className: `${SURFACE} text-white overflow-hidden ${RADIUS} border ${BORDER}`,
        sx: {
          background:
            "radial-gradient(120% 160% at 50% 0%, rgba(128,86,255,0.10) 0%, rgba(12,10,26,0) 52%), #0B0A1A",
          boxShadow:
            "0 80px 160px rgba(5,3,22,0.85), 0 0 0 1px rgba(255,255,255,0.06), 0 0 120px 16px rgba(128,86,255,0.22)",
          backdropFilter: "blur(8px)",
          borderRadius: "24px",
        },
      }}
    >
      {/* HEADER */}
      <Box className="relative p-6 pb-4">
        <h1
          className="font-semibold tracking-tight"
          style={{
            fontSize: 28,
            lineHeight: "34px",
            color: "#F5F3FF",
            textShadow: "0 0 18px rgba(128,86,255,0.35)",
          }}
        >
          {loading ? (
            <Skeleton variant="text" width={260} height={38} />
          ) : (
            movie?.title ?? ""
          )}
        </h1>

        <p className="mt-1 text-white/70 text-[14px]">
          {loading ? (
            <Skeleton variant="text" width={200} height={18} />
          ) : (
            <>
              {movie?.release_date
                ? new Date(movie.release_date).getFullYear()
                : "—"}{" "}
              • PG-13 • {formatRuntime(movie?.runtime)}
            </>
          )}
        </p>

        <Box className="absolute top-5 right-5 flex items-center gap-3">
          {movie && (
            <Tooltip
              title={`${(movie.vote_average ?? 0).toFixed(1)} / 10 (${(
                movie.vote_count ?? 0
              ).toLocaleString()})`}
            >
              <Box className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1B1536] border border-[#7a5cff]/20 shadow">
                <StarIcon className="text-amber-300" />
                <span className="text-amber-300 font-semibold text-[14px]">
                  {(movie.vote_average ?? 0).toFixed(1)}/10 (
                  {(movie.vote_count ?? 0).toLocaleString()})
                </span>
              </Box>
            </Tooltip>
          )}
          <IconButton
            aria-label="Close"
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20"
          >
            <CloseIcon className="text-white" />
          </IconButton>
        </Box>
      </Box>

      {/* MEDIA STRIP */}
      <Box className="px-6">
        <Box
          className={`grid grid-cols-1 md:grid-cols-12 gap-6 ${CARD} p-4 rounded-[18px] border ${BORDER}`}
        >
          {/* Poster */}
          <Box className="md:col-span-4">
            {loading ? (
              <Skeleton
                variant="rectangular"
                height={360}
                className={RADIUS_SM}
              />
            ) : (
              <img
                src={poster || "/no-movie.png"}
                alt={movie?.title || "Movie Poster"}
                className={`w-full h-[360px] object-cover ${RADIUS_SM} border ${BORDER} shadow-[0_10px_30px_rgba(0,0,0,0.45)]`}
              />
            )}
          </Box>

          {/* Trailer / Backdrop */}
          <Box className="md:col-span-8">
            <div
              className={`aspect-video w-full ${RADIUS_SM} overflow-hidden border ${BORDER} shadow-[0_10px_30px_rgba(0,0,0,0.45)]`}
            >
              {trailerLoading ? (
                <Skeleton variant="rectangular" height={360} />
              ) : trailerKey ? (
                <iframe
                  title="Trailer"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : backdrop ? (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.4)), url(${backdrop})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/60">
                  No trailer available
                </div>
              )}
            </div>
          </Box>
        </Box>
      </Box>

      {/* GENRES + CTA */}
      <Box className="px-6 mt-4 flex items-center justify-between gap-3 ml-auto">

        {movie?.homepage && (
          <Button
            href={movie.homepage}
            target="_blank"
            rel="noreferrer"
            className="relative overflow-hidden rounded-[12px] px-4 py-2 min-h-0 font-semibold"
            sx={{
              color: "#fff",
              boxShadow:
                "0 8px 24px rgba(128,86,255,0.35), inset 0 0 0 1px rgba(255,255,255,0.15)",
              background:
                "linear-gradient(92deg, #8A63FF 0%, #B96AFF 45%, #FF62AE 100%)",
              textTransform: "none",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow:
                  "0 12px 30px rgba(128,86,255,0.45), inset 0 0 0 1px rgba(255,255,255,0.2)",
                background:
                  "linear-gradient(92deg, #9570FF 0%, #C976FF 45%, #FF72B8 100%)",
              },
              transition: "all .18s ease-out",
            }}
          >
            Visit Homepage →
          </Button>
        )}
      </Box>

      {/* OVERVIEW */}
      <Box className="px-6 mt-5">
        <div className="text-white/80 leading-7 font-medium text-[20px]">
          {loading ? (
            <>
              <Skeleton variant="text" width="92%" height={18} />
              <Skeleton variant="text" width="86%" height={18} />
              <Skeleton variant="text" width="75%" height={18} />
            </>
          ) : (
            movie?.overview
          )}
        </div>
      </Box>

      {/* META — single column */}
      <Box className="px-6 py-6">
        <div className="grid grid-cols-1 gap-4">
          {/* Genres row with BOXES (chips) */}
          <div className="flex items-start gap-4 bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <span className="text-white/60 w-40 shrink-0 tracking-wide">
              Genres
            </span>
            <div className="flex flex-wrap gap-2">
              {movie?.genres?.length ? (
                movie.genres.map((g) => (
                  <Chip
                    key={g.id}
                    size="small"
                    label={g.name}
                    className="bg-[#6356af] text-white/90 border border-white/10 rounded-full p-5"
                    sx={{
                      "& .MuiChip-label": {
                        fontWeight: 600,
                        color : "white",
                        backgroundColor : "#6356af",
                        borderRadius : "9999px",
                        padding : "4px",
                        letterSpacing: 0.2,
                      },
                    }}
                  />
                ))
              ) : (
                <span className="text-white/90 font-medium">—</span>
              )}
            </div>
          </div>

          {/* The order mirrors the screenshot */}
          {/* <MetaRow label="Overview" value={movie?.overview || "—"} /> */}
          <MetaRow label="Release date" value={fmtDate(movie?.release_date)} />
          <MetaRow
            label="Countries"
            value={joinOrDash(movie?.production_countries?.map((c) => c.name))}
          />
          <MetaRow label="Status" value={statusText} />
          <MetaRow
            label="Language"
            value={joinOrDash(
              movie?.spoken_languages?.map((l) => l.english_name)
            )}
          />
          <MetaRow label="Budget" value={fmtMoney(movie?.budget)} />
          <MetaRow label="Revenue" value={fmtMoney(movie?.revenue)} />
          <MetaRow label="Tagline" value={movie?.tagline ?? "—"} />
          <MetaRow
            label="Production Companies"
            value={joinOrDash(movie?.production_companies?.map((c) => c.name))}
          />
        </div>
      </Box>
    </Dialog>
  );
};

export default MovieModalUI;
