import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../api/weatherApi";

export const useWeatherQuery = (location, forecastType) => {
  return useQuery({
    queryKey: ["weather", location, forecastType],
    queryFn: () => fetchWeatherData(location, forecastType),
    enabled: !!forecastType,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};
