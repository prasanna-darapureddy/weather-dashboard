import { Box, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDaysHoursForcastData } from "../../redux/reducers/weatherSlice";
import { AppDispatch, RootState } from "../../redux/store/Store";
import DayTimeWiseBox from "../common/DayTimeWiseBox";
import { styles } from "./TodayCardStyles";

const TodayCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, hourlyForcastData, apiStatus } = useSelector(
    (state: RootState) => state.weatherData
  );

  useEffect(() => {
    dispatch(getDaysHoursForcastData(weatherData));
  }, [weatherData]);

  const iconData = {
    icon: weatherData?.weather && weatherData?.weather[0]?.icon,
    temp: weatherData && Math.ceil(weatherData?.main?.temp - 273.15),
  };

  const tempInKelvin = hourlyForcastData?.list?.at(7)?.main?.temp ?? 0;

  const tommorrowData = {
    temp: Math.floor(tempInKelvin - 273.15),
    icon:
      hourlyForcastData?.list?.at(7)?.weather &&
      hourlyForcastData?.list?.at(7)?.weather[0]?.icon,
    description:
      hourlyForcastData?.list?.at(7)?.weather &&
      hourlyForcastData?.list?.at(7)?.weather[0]?.description,
  };

  const dayLengthSecs =
    weatherData && weatherData?.sys?.sunset - weatherData?.sys?.sunrise;
  const hours = dayLengthSecs && Math.floor(dayLengthSecs / 3600);
  const mints =
    dayLengthSecs && (Math.floor(dayLengthSecs % 3600) / 60).toFixed(0);

  const renderSuccessView = () => {
    return (
      <>
        <Box sx={styles.todayLeftBox}>
          <Typography variant={"h5"} sx={styles.todayText}>
            Today
          </Typography>
          <Stack sx={styles.cardsBox}>
            {hourlyForcastData?.list?.slice(0, 6).map((eachItem, index) => (
              <Fragment key={index + "hrs"}>
                <DayTimeWiseBox
                  time={eachItem.dt_txt}
                  icon={iconData?.icon}
                  temp={eachItem.main.temp}
                />
              </Fragment>
            ))}
          </Stack>
          <Stack sx={styles.tommorrowBox}>
            <Stack direction="column">
              <Typography>Tommorrow</Typography>
              <Typography sx={styles.tmrDes}>
                {tommorrowData.description}
              </Typography>
            </Stack>
            <Typography>{tommorrowData.temp}° C</Typography>
            <Box
              component={"img"}
              alt={"Weather icon"}
              src={`http://openweathermap.org/img/w/${tommorrowData.icon}.png`}
            />
          </Stack>
        </Box>

        <Box sx={styles.sunDetailsBox}>
          <Box>
            <Typography>Sunrise</Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>
                {moment(weatherData && weatherData?.sys?.sunrise * 1000).format(
                  "LT"
                )}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography>Sunset</Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>
                {moment(weatherData && weatherData?.sys?.sunset * 1000).format(
                  "LT"
                )}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography sx={styles.dayLengthText}>Day length</Typography>
            <Typography sx={styles.dayLengthText}>
              {hours} Hrs {mints} Min
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <Paper sx={styles.totalPaper}>
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
      </Paper>
    </>
  );
};
export default TodayCard;
