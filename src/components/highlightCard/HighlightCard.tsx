import { Box, Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useSelector } from "react-redux";
import { humidityIcon, seeLevelIcon, windIcon } from "../../assets";
import { RootState } from "../../redux/store/Store";
import { styles } from "./HighlightCardStyles";

const HightlightCard = () => {
  const { weatherData, hourlyForcastData, apiStatus } = useSelector(
    (state: RootState) => state.weatherData
  );

  const weatherFormatedData = {
    humidity: weatherData && Math.ceil(weatherData?.main?.humidity % 100),
    seeLevel: weatherData && Math.ceil(weatherData?.main?.sea_level * 3.28084),
    pressure: weatherData && Math.ceil(weatherData?.main?.pressure),
    windSpeed: weatherData && Math.ceil(weatherData?.wind?.speed),
    uv:
      hourlyForcastData?.list &&
      Math.ceil(hourlyForcastData?.list[0]?.wind?.gust),
  };
  const renderSuccessView = () => {
    return (
      <>
        <Typography variant="h6">Today's Highlights</Typography>
        <Box sx={styles.cardsBox}>
          <Box sx={styles.rainCard}>
            <Typography sx={styles.subHeading}>See Level</Typography>
            <Box component={"img"} src={seeLevelIcon} sx={styles.weatherIcon} />
            <Typography>
              {weatherFormatedData.seeLevel?.toFixed(2)} Feet
            </Typography>
          </Box>
          <Box sx={styles.rainCard}>
            <Typography sx={styles.subHeading}>UV Index</Typography>
            <Gauge
              width={120}
              height={70}
              value={weatherFormatedData.uv}
              startAngle={-90}
              endAngle={90}
              valueMax={10}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 18,
                  stroke: "#ffffff",
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#52b202",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
            />
            <Typography>
              {" "}
              {weatherFormatedData?.uv && weatherFormatedData?.uv >= 5
                ? "High"
                : "Low"}
            </Typography>
          </Box>
          <Box sx={styles.rainCard}>
            <Typography sx={styles.subHeading}>Wind Status</Typography>
            <Box component={"img"} src={windIcon} sx={styles.windIcon} />
            <Typography>{weatherFormatedData.windSpeed} KM</Typography>
          </Box>
          <Box sx={styles.rainCard}>
            <Typography sx={styles.subHeading}>Humidity</Typography>
            <Box component={"img"} src={humidityIcon} />
            <Typography>{weatherFormatedData.humidity}</Typography>
          </Box>
        </Box>
      </>
    );
  };
  return (
    <>
      <Box sx={styles.highlightCard}>
        {weatherData
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
      </Box>
    </>
  );
};
export default HightlightCard;
