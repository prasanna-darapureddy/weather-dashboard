import { Box, Typography } from "@mui/material";
import moment from "moment";
import { IProps } from "../../assets/interfaces";
import { styles } from "./CommonStyles";

const DayTimeWiseBox = ({ time, date, icon, temp }: IProps) => {
  const formatedTemp = temp && Math.ceil(temp - 273.15);
  return (
    <>
      <Box sx={styles.timeVerCard}>
        {time && (
          <Typography sx={styles.timeOrDate}>
            {moment(time).format("LT")}
          </Typography>
        )}
        {date && (
          <Typography sx={styles.timeOrDate}>
            {moment(date).format("ddd")}
          </Typography>
        )}
        <Box
          component={"img"}
          alt={"icon"}
          src={`http://openweathermap.org/img/w/${icon}.png`}
        />
        <Typography>{formatedTemp}° C</Typography>
      </Box>
    </>
  );
};
export default DayTimeWiseBox;
