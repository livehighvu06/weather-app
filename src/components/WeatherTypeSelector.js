import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";

const WeatherTypeSelector = () => {
  const { setWeatherType } = useWeatherStore();
  const weatherTypes = [
    { value: "1", label: "晴天" },
    { value: "2", label: "晴時多雲" },
    { value: "3", label: "多雲時晴" },
    { value: "4", label: "多雲" },
    { value: "5", label: "多雲時陰" },
    { value: "6", label: "陰時多雲" },
    { value: "7", label: "陰天" },
    { value: "8", label: "多雲陣雨" },
    { value: "8", label: "多雲短暫雨" },
    { value: "8", label: "多雲短暫陣雨" },
    { value: "11", label: "雨天" },
  ];
  return (
    <select
      className="border border-gray-300 rounded px-3 py-2 text-sm h-10"
      onChange={(e) => setWeatherType(e.target.value)}
    >
      <option value="all">所有天氣</option>
      {weatherTypes.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
};

export default WeatherTypeSelector;
