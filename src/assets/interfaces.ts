export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
} | null;

export type DaysHoursForecast = {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
    pop: number;
    sys: { pod: string };
    visibility: number;
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
    main: string;
    length: number;
    wind: { speed: number; deg: number; gust: number };
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: { speed: number; deg: number; gust: number };
};

export type FiveDaysData = {
  city: {
    coord: { lat: number; lon: number };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  message: number;
  list: DaysHoursForecast[];
} | null;

export type LatLng = {
  lat: number;
  lng: number;
} | null;

export type ApiStatus = {
  apiName: string;
  apiStatus: string;
  message: string;
} | null;

export interface IProps {
  time?: string;
  date?: string;
  icon: string | undefined;
  temp?: number;
}
