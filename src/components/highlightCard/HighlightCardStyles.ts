import { SxProps } from "@mui/material";

export const styles = {
  highlightCard: {
    backgroundColor: "#072d1d",
    borderRadius: "20px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    p: 2.5,
    pt: 1.5,
    gap: 1.5,
  },
  cardsBox: {
    backgroundImage: "radial-gradient(#074f20, #072d1d  30%)",
    display: "flex",
    flexWrap: "wrap",
    gap: 1.5,
  },
  rainCard: {
    backgroundColor: "#00180e",
    borderRadius: "20px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: { xs: "100%", md: "47.7%", lg: "48.7%" },
    p: 1,
  },
  subHeading: {
    textAlign: "left",
    alignSelf: "flex-start",
  },
  weatherIcon: {
    height: "70px",
    width: "90px",
  },
  windIcon: {
    width: { xs: "200px", md: "100%" },
    height: "70px",
  },
} satisfies Record<string, SxProps>;
