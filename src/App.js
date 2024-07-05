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
      <div className="max-w-7xl mt-4 mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          天氣預報應用
        </h1>
        <div className="grid p-2 gap-4 md:grid-cols-6">
          <LocationSelector />
          <DateTimePicker />
          <ForecastTypeSelector />
          <WeatherTypeSelector />
          <SortingOptions />
        </div>
        <WeatherDisplay />
      </div>
    </QueryClientProvider>
  );
}

export default App;
