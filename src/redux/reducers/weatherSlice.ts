import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ApiStatus,
  FiveDaysData,
  LatLng,
  WeatherData,
} from "../../assets/interfaces";

export interface WeatherDataState {
  searchValue: string;
  currentLatLng: LatLng;
  weatherData: WeatherData;
  fiveDaysForcastData: FiveDaysData;
  hourlyForcastData: FiveDaysData;
  apiStatus: ApiStatus;
}

const initialState: WeatherDataState = {
  searchValue: "",
  currentLatLng: null,
  weatherData: null,
  fiveDaysForcastData: null,
  hourlyForcastData: null,
  apiStatus: null,
};

const apiKey = "8258383fad3691852f1fba0737edd5e2";

export const getCurrentLocationData = createAsyncThunk(
  "getCurrentLocationData",
  async (currentLatLng: LatLng, { fulfillWithValue, rejectWithValue }) => {
    const lat = currentLatLng?.lat?.toFixed(2);
    const lng = currentLatLng?.lng?.toFixed(2);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;
    const response = await axios.get(url);
    try {
      if (response?.status === 200) {
        return fulfillWithValue(response);
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(response);
    }
  }
);

export const getSearchCityData = createAsyncThunk(
  "getSearchCityData",
  async (searchValue: string, { fulfillWithValue, rejectWithValue }) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}`;
    const response = await axios.get(url);
    try {
      if (response?.status === 200) {
        return fulfillWithValue(response);
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(response);
    }
  }
);

export const getDaysHoursForcastData = createAsyncThunk(
  "getDaysHoursForcastData",
  async (weatherData: WeatherData, { fulfillWithValue, rejectWithValue }) => {
    const lat = weatherData?.coord?.lat;
    const lon = weatherData?.coord?.lon;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(url);

    try {
      if (response?.status === 200) {
        return fulfillWithValue(response);
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(response);
    }
  }
);

export const WeatherSlice = createSlice({
  name: "WeatherSlice",
  initialState,
  reducers: {
    handleSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    updateCurrentLatLng: (state, action) => {
      state.currentLatLng = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCurrentLocationData.pending, (state, action) => {
        state.apiStatus = {
          apiName: "currentLocation",
          apiStatus: "loading",
          message: "",
        };
      })
      .addCase(getCurrentLocationData.fulfilled, (state, action) => {
        state.weatherData = action?.payload?.data;
      })
      .addCase(getCurrentLocationData.rejected, (state, action) => {
        state.apiStatus = {
          apiName: "currentLocation",
          apiStatus: "failed",
          message: action?.payload as string,
        };
      })
      .addCase(getSearchCityData.pending, (state, action) => {
        state.apiStatus = {
          apiName: "searchLocation",
          apiStatus: "loading",
          message: "",
        };
      })
      .addCase(getSearchCityData.fulfilled, (state, action) => {
        state.weatherData = action?.payload?.data;
        if (action?.payload?.status === 200) {
          toast.success("Success", {
            theme: "colored",
            position: "top-center",
          });
        } else {
          toast.warning("No City Found", {
            theme: "colored",
            position: "top-center",
          });
        }
      })
      .addCase(getSearchCityData.rejected, (state, action) => {
        state.apiStatus = {
          apiName: "searchLocation",
          apiStatus: "failed",
          message: action?.payload as string,
        };
        toast.warning("No City Found", {
          theme: "colored",
          position: "top-center",
        });
      })
      .addCase(getDaysHoursForcastData.pending, (state, action) => {
        state.apiStatus = {
          apiName: "daysHoursForcast",
          apiStatus: "loading",
          message: "",
        };
      })
      .addCase(getDaysHoursForcastData.fulfilled, (state, action) => {
        state.hourlyForcastData = action?.payload?.data;
      })
      .addCase(getDaysHoursForcastData.rejected, (state, action) => {
        state.apiStatus = {
          apiName: "daysHoursForcast",
          apiStatus: "failed",
          message: action?.payload as string,
        };
      });
  },
});
export const { handleSearchValue, updateCurrentLatLng } = WeatherSlice.actions;
export default WeatherSlice.reducer;
