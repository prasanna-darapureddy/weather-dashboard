import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from '../reducers/weatherSlice'


const store = configureStore({
  reducer: {
    weatherData: weatherSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store