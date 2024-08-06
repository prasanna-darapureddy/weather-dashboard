import { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getSearchCityData,
  handleSearchValue,
  updateCurrentLatLng,
} from "../../redux/reducers/weatherSlice";
import { AppDispatch, RootState } from "../../redux/store/Store";
import CurrentCard from "../currentCard/CurrentCard";
import HightlightCard from "../highlightCard/HighlightCard";
import TodayCard from "../todayCard/TodayCard";
import WeekCard from "../weekCard/WeekCard";
import "./Dashboard.css";

const Dashboard = () => {
  const {
    searchValue,
    apiStatus,
    currentLatLng,
    weatherData,
    hourlyForcastData,
  } = useSelector((state: RootState) => state.weatherData);

  const dispatch = useDispatch<AppDispatch>();

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(updateCurrentLatLng({ lat: latitude, lng: longitude }));
      },
      (error) => {
        toast.warn("Error getting user location");
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleChangeSearch = (event: { target: { value: string } }) => {
    dispatch(handleSearchValue(event.target.value));
  };

  const handlePressSearch = (event: { key: string }) => {
    if (event.key === "Enter") {
      dispatch(getSearchCityData(searchValue));
      dispatch(handleSearchValue(""));
    }
  };

  const renderCardsView = () => {
    return (
      <>
        <div className="cards-box">
          <CurrentCard />
          <TodayCard />
        </div>
        <div className="cards-box">
          <HightlightCard />
          <WeekCard />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="home">
        <div className="sidebar">
          <div className="icon-bg">
            <div className="icon-circle">
              <RxDashboard className="icon" fill={"#000"} />
            </div>
          </div>
        </div>
        <div className="content-container">
          <div className="search-box">
            <IoIosSearch className="search-icon" />
            <input
              type="search"
              placeholder="Search City"
              className="search-input"
              onChange={handleChangeSearch}
              value={searchValue}
              onKeyUp={handlePressSearch}
            />
          </div>
          <div className="total-cards-container">
            {currentLatLng !== null ||
            weatherData !== null ||
            hourlyForcastData !== null ? (
              renderCardsView()
            ) : (
              <div className="loader-container">
                <span className="loader"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
