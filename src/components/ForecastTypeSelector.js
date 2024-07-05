import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";

const ForecastTypeSelector = () => {
  const { setForecastType } = useWeatherStore();

  return (
    <select
      className="border border-gray-300 rounded px-3 py-2 text-sm h-10"
      onChange={(e) => setForecastType(e.target.value)}
    >
      <option value="36hours">未來36小時</option>
      <option value="2days">未來兩天</option>
      <option value="1week">未來一週</option>
    </select>
  );
};

export default ForecastTypeSelector;
