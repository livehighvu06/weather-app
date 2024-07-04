import { create } from "zustand";

const useWeatherStore = create((set) => ({
  location: null,
  dateTime: new Date(),
  forecastType: "36hours",
  weatherType: "all",
  sortBy: "none",
  setLocation: (location) => set({ location }),
  setDateTime: (dateTime) => set({ dateTime }),
  setForecastType: (forecastType) => set({ forecastType }),
  setWeatherType: (weatherType) => set({ weatherType }),
  setSortBy: (sortBy) => set({ sortBy }),
}));

export default useWeatherStore;
