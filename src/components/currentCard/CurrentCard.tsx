import { RoomOutlined } from "@mui/icons-material";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCurrentLocationData,
  updateCurrentLatLng,
} from "../../redux/reducers/weatherSlice";
import { AppDispatch, RootState } from "../../redux/store/Store";
import { styles } from "./CurrentCardStyles";

const CurrentCard = () => {
  const { currentLatLng, weatherData, apiStatus } = useSelector(
    (state: RootState) => state.weatherData
  );
  const dispatch = useDispatch<AppDispatch>();

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(updateCurrentLatLng({ lat: latitude, lng: longitude }));
      },
      (error) => {
        toast.error("Error getting user location");
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    dispatch(getCurrentLocationData(currentLatLng));
  }, [currentLatLng]);

  const convertToCelcious = (value: number | undefined) => {
    const res = weatherData && value && Math.ceil(value - 273.15);
    return res;
  };
  const iconData = {
    icon: weatherData?.weather && weatherData?.weather[0]?.icon,
  };

  const renderSuccessView = () => {
    return (
      <>
        <Box sx={styles.chipBox}>
          <Chip
            icon={<RoomOutlined color="inherit" />}
            label={weatherData && weatherData.name}
            sx={styles.chip}
          />
        </Box>
        <Stack sx={styles.dateWeatherResBox}>
          <Stack
            direction="column"
            justifyContent={"space-between"}
            height={"100%"}
          >
            <Stack sx={styles.dateBox}>
              <Typography variant="h5" fontSize={30}>
                Weather
              </Typography>
              <Typography>
                {weatherData && moment(weatherData?.dt * 1000).format("L")}
              </Typography>
            </Stack>
            <Stack direction="column" sx={styles.reportBox}>
              <Typography variant="h3">
                {convertToCelcious(weatherData?.main?.temp)}° C
              </Typography>
              <Typography>
                Feels Like {convertToCelcious(weatherData?.main?.feels_like)}°
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={styles.imageBox}>
            <Box
              component={"img"}
              alt={"Icon"}
              src={`http://openweathermap.org/img/w/${iconData?.icon}.png`}
            />
            <Stack direction={"row"} gap={3}>
              <Typography>
                High: {convertToCelcious(weatherData?.main?.temp_max)}°
              </Typography>
              <Typography>
                Low: {convertToCelcious(weatherData?.main?.temp_min)}°
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  };

  return (
    <>
      <Paper sx={styles.totalPaper}>
        {currentLatLng
          ? renderSuccessView()
          : apiStatus?.apiName === "currentLocation" &&
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
export default CurrentCard;
