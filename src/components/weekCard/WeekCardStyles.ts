import { SxProps } from "@mui/material";

export const styles = {
  weekTotalCard: {
    color: "#fff",
    height: "100%",
  },
  cardsBox: {
    backgroundImage: "radial-gradient(#074f20, #072d1d 90%)",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: { xs: "auto", md: "none" },
    height: "100%",
    p: 2.5,
    gap: 2,
  },
} satisfies Record<string, SxProps>;
