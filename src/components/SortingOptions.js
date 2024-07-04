import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";

const SortingOptions = () => {
  const { setSortBy } = useWeatherStore();

  return (
    <select onChange={(e) => setSortBy(e.target.value)}>
      <option value="none">不排序</option>
      <option value="temperature">溫度</option>
      <option value="weatherType">天氣類型</option>
    </select>
  );
};

export default SortingOptions;
