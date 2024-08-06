import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDaysHoursForcastData } from "../../redux/reducers/weatherSlice";
import { AppDispatch, RootState } from "../../redux/store/Store";
import DayTimeWiseBox from "../common/DayTimeWiseBox";
import { styles } from "./WeekCardStyles";

const WeekCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, hourlyForcastData, apiStatus } = useSelector(
    (state: RootState) => state.weatherData
  );

  useEffect(() => {
    dispatch(getDaysHoursForcastData(weatherData));
  }, [weatherData]);

  const daysList = hourlyForcastData && hourlyForcastData?.list?.slice(7);
  const fiveDaysList =
    daysList &&
    daysList?.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            moment(t.dt_txt).format("L") === moment(item.dt_txt).format("L")
        )
    );

  const iconData = {
    icon: weatherData?.weather && weatherData?.weather[0]?.icon,
    temp: weatherData && Math.ceil(weatherData?.main?.temp - 273.15),
  };

  const renderSuccessView = () => {
    return (
      <>
        <Stack sx={styles.cardsBox}>
          {fiveDaysList &&
            fiveDaysList?.map((eachItem, index) => (
              <Fragment key={index + "days"}>
                <DayTimeWiseBox
                  date={eachItem.dt_txt}
                  icon={iconData?.icon}
                  temp={eachItem.main.temp}
                />
              </Fragment>
            ))}
        </Stack>
      </>
    );
  };

  return (
    <>
      <Box sx={styles.weekTotalCard}>
        <Typography variant="h6">5 Days</Typography>{" "}
        {hourlyForcastData
          ? renderSuccessView()
          : apiStatus?.apiName === "daysHoursForcast" &&
            apiStatus?.apiStatus === "failed" && (
              <Stack
                direction="column"
                justifyContent={"center"}
                width={"100%"}
              >
                <Typography fontSize={20} color={"#fff"} textAlign={"center"}>
                  No Data Found
                </Typography>
              </Stack>
            )}
      </Box>
    </>
  );
};
export default WeekCard;
