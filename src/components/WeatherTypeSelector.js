import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";

const WeatherTypeSelector = () => {
  const { setWeatherType } = useWeatherStore();

  return (
    <select onChange={(e) => setWeatherType(e.target.value)}>
      <option value="all">所有天氣</option>
      <option value="sunny">晴天</option>
      <option value="rainy">雨天</option>
      {/* 添加更多天氣類型 */}
    </select>
  );
};

export default WeatherTypeSelector;
