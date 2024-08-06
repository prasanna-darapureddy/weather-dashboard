import { SxProps } from "@mui/material";

export const styles = {
  weekTotalCard: {
    color: "#fff",
  },
  cardsBox: {
    backgroundImage: "radial-gradient(#074f20, #072d1d 90%)",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: { xs: "auto", md:'none'},
    p: 2.5,
    gap: 2,
  },
} satisfies Record<string, SxProps>;
