import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocationSelector from "./components/LocationSelector";
import DateTimePicker from "./components/DateTimePicker";
import ForecastTypeSelector from "./components/ForecastTypeSelector";
import WeatherTypeSelector from "./components/WeatherTypeSelector";
import SortingOptions from "./components/SortingOptions";
import WeatherDisplay from "./components/WeatherDisplay.js";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>天氣預報應用</h1>
        <LocationSelector />
        <DateTimePicker />
        <ForecastTypeSelector />
        <WeatherTypeSelector />
        <SortingOptions />
        <WeatherDisplay />
      </div>
    </QueryClientProvider>
  );
}

export default App;
