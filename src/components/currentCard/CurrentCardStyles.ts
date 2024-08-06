import { SxProps } from "@mui/material";

export const styles = {
  totalPaper: {
    backgroundColor: "#082c1d",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: { xs: "center", md: "flex-start" },
    borderRadius: "20px",
  },
  chipBox: {
    color: "#000",
    alignSelf: "center",
    p: 2.5,
  },
  chip: {
    backgroundColor: "#fff",
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  dateWeatherResBox: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: { xs: "center", sm: "space-between" },
    alignItems: "center",
    width: "100%",
  },
  dateBox: {
    px: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: { xs: "center", sm: "flex-start" },
  },
  reportBox: {
    backgroundColor: "#062317",
    borderRadius: "90px 90px 70px 20px",
    p: 2.5,
  },
  imageBox: {
    flexDirection: "column",
    gap: 2,
    p: 2.5,
  },
  mainIcon: {
    height: "200px",
    width: "200px",
  },
} satisfies Record<string, SxProps>;
