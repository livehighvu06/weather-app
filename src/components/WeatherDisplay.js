import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";
import { useWeatherQuery } from "../hooks/useWeatherQuery";

const WeatherDisplay = () => {
  const { location, forecastType, weatherType, sortBy } = useWeatherStore();
  const { data, isLoading, error } = useWeatherQuery(location, forecastType);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 處理數據、過濾和排序的邏輯
  // ...

  return (
    <div>
      {/* 顯示處理後的天氣數據 */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default WeatherDisplay;
