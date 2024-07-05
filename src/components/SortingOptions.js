import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";

const SortingOptions = () => {
  const { setSortBy } = useWeatherStore();

  return (
    <select
      className="border border-gray-300 rounded px-3 py-2 text-sm h-10"
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="none">不排序</option>
      <option value="temperature">溫度</option>
      <option value="pop">降雨機率</option>
    </select>
  );
};

export default SortingOptions;
