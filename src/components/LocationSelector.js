import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";

const locationMap = [
  "全部縣市",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
  "臺北市",
  "新北市",
  "桃園市",
  "臺中市",
  "臺南市",
  "高雄市",
  "基隆市",
  "新竹縣",
  "新竹市",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "嘉義市",
  "屏東縣",
];

const LocationSelector = () => {
  const { setLocation } = useWeatherStore();
  return (
    <select onChange={(e) => setLocation(e.target.value || null)}>
      {locationMap.map((locationMap) => (
        <option value={locationMap}>{locationMap}</option>
      ))}
    </select>
  );
};

export default LocationSelector;
