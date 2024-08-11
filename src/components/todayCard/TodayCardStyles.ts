import { SxProps } from "@mui/material";

export const styles = {
  totalPaper: {
    backgroundColor: "#072d1d",
    color: "white",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "center", md: "flex-start" },
    borderRadius: "20px",
    p: 2.5,
    gap: 2,
  },
  todayLeftBox: {
    backgroundImage: "radial-gradient(#074f20, #072d1d 80%)",
    display: "flex",
    flexDirection: "column",
    width: { xs: "100%", sm: "75%" },
    gap: 2,
  },
  todayText: {
    color: "#fff",
  },

  cardsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: { xs: "auto", md: "none" },
    gap: 2,
  },
  tommorrowBox: {
    backgroundColor: "#062317",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "20px",
    px: 2.5,
    py: 2,
  },
  tmrDes: {
    textTransform: "capitalize",
  },
  sunDetailsBox: {
    backgroundColor: "#062317",
    display: "flex",
    flexDirection: { xs: "row", sm: "column" },
    justifyContent: "space-between",
    overflow: { xs: "auto", md: "none" },
    height: "100%",
    borderRadius: "20px",
    width: { xs: "100%", sm: "25%" },
    gap: { xs: 5, md: 0 },
    p: 2.5,
  },
  dayLengthText: {
    textWrap: "nowrap",
  },
} satisfies Record<string, SxProps>;
