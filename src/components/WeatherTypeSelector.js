import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";

const WeatherTypeSelector = () => {
  const { setWeatherType } = useWeatherStore();
  const weatherTypes = [
    { id: "1", value: "1", label: "晴天" },
    { id: "2", value: "2", label: "晴時多雲" },
    { id: "3", value: "3", label: "多雲時晴" },
    { id: "4", value: "4", label: "多雲" },
    { id: "5", value: "5", label: "多雲時陰" },
    { id: "6", value: "6", label: "陰時多雲" },
    { id: "7", value: "7", label: "陰天" },
    { id: "8", value: "8", label: "多雲陣雨" },
    { id: "9", value: "8", label: "多雲短暫雨" },
    { id: "10", value: "8", label: "多雲短暫陣雨" },
    { id: "11", value: "11", label: "雨天" },
  ];

  return (
    <select
      className="border border-gray-300 rounded px-3 py-2 text-sm h-10"
      onChange={(e) => setWeatherType(e.target.value)}
    >
      <option value="all">所有天氣</option>
      {weatherTypes.map((type) => (
        <option key={type.id} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
};

export default WeatherTypeSelector;
