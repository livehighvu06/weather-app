import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";
import { useWeatherQuery } from "../hooks/useWeatherQuery";

// 預設城市排序
const cityOrder = [
  "基隆市",
  "臺北市",
  "新北市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "苗栗縣",
  "臺中市",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義市",
  "嘉義縣",
  "臺南市",
  "高雄市",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
];

// 篩選符合時間的資料
const findTimeData = (inputTime, timeData) => {
  const inputDate = new Date(inputTime);
  for (const timePeriod of timeData) {
    if (timePeriod.startTime && timePeriod?.endTime) {
      const startDate = new Date(timePeriod?.startTime.replace(" ", "T"));
      const endDate = new Date(timePeriod?.endTime.replace(" ", "T"));
      if (inputDate >= startDate && inputDate < endDate) {
        return timePeriod;
      }
    }
  }
  return null;
};

const WeatherDisplay = () => {
  const { location, forecastType, dateTime } = useWeatherStore();
  const { data, isLoading, error } = useWeatherQuery(location, forecastType);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const matchingData = {};
  const filteredData = data.records.locations || data.records.location;

  if (forecastType === "36hours" && dateTime) {
    filteredData.forEach((location) => {
      location.weatherElement.forEach((element) => {
        const foundData = findTimeData(dateTime, element.time);
        if (foundData) {
          if (!matchingData[location.locationName]) {
            matchingData[location.locationName] = [];
          }
          matchingData[location.locationName].push({
            elementName: element.elementName,
            ...foundData,
          });
        }
      });
    });
  } else {
    filteredData[0].location.forEach((location) => {
      location.weatherElement.forEach((element) => {
        const foundData = findTimeData(dateTime, element.time);
        if (foundData) {
          if (!matchingData[location.locationName]) {
            matchingData[location.locationName] = [];
          }
          matchingData[location.locationName].push({
            elementName: element.elementName,
            ...foundData,
          });
        }
      });
    });
  }
  // 氣象資訊描述
  const weatherStatus = {
    Wx: "天氣現象",
    WeatherDescription: "天氣描述",
    PoP: "降雨機率",
    PoP12h: "降雨機率(12小時分段)",
    PoP6h: "降雨機率(6小時分段)",
    MinT: "最低溫",
    MaxT: "最高溫",
    CI: "舒適程度",
  };
  // 調整排序
  const sortedCities = Object.keys(matchingData)
    .sort((a, b) => cityOrder.indexOf(a) - cityOrder.indexOf(b))
    .reduce((obj, key) => {
      obj[key] = matchingData[key];
      return obj;
    }, {});
  return (
    <div>
      {forecastType === "36hours" && (
        <div>
          <h1>三十六小時天氣預報</h1>
          {Object.keys(sortedCities).map((locationName, index) => (
            <div key={index}>
              <h2>{locationName}</h2>
              <p>
                {sortedCities[locationName][0].startTime} -{" "}
                {sortedCities[locationName][0].endTime}
              </p>
              {matchingData[locationName].map((data, elemIndex) => {
                const { elementName } = data;
                return (
                  (elementName === "Wx" ||
                    elementName === "PoP" ||
                    elementName === "MinT" ||
                    elementName === "MaxT") && (
                    <div key={elemIndex}>
                      <p>
                        <strong>{weatherStatus[elementName]}</strong>:{" "}
                        {data.parameter.parameterName}
                      </p>
                    </div>
                  )
                );
              })}
            </div>
          ))}
        </div>
      )}

      {forecastType === "2days" && (
        <div>
          <h1>未來兩天天氣預報</h1>
          {Object.keys(sortedCities).map((locationName, index) => (
            <div key={index}>
              <h2>{locationName}</h2>
              <p>
                {sortedCities[locationName][0].startTime} -{" "}
                {sortedCities[locationName][0].endTime}
              </p>
              {sortedCities[locationName].map((data, elemIndex) => {
                const { elementName, elementValue } = data;
                return (
                  <div key={elemIndex}>
                    {(elementName === "WeatherDescription" ||
                      elementName === "PoP6h") && (
                      <p>
                        <strong>{weatherStatus[elementName]}</strong>:{" "}
                        {elementName === "PoP6h"
                          ? `${elementValue[0].value}˚C`
                          : elementValue[0].value}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {forecastType === "1week" && (
        <div>
          <h1>未來一週天氣預報</h1>
          {Object.keys(sortedCities).map((locationName, index) => (
            <div key={index}>
              <h2>{locationName}</h2>
              <p>
                {sortedCities[locationName][0].startTime} -{" "}
                {sortedCities[locationName][0].endTime}
              </p>
              {sortedCities[locationName].map((data, elemIndex) => {
                const { elementName, elementValue } = data;
                return (
                  <div key={elemIndex}>
                    {(elementName === "WeatherDescription" ||
                      elementName === "PoP6h") && (
                      <p>
                        <strong>{weatherStatus[elementName]}</strong>:{" "}
                        {elementName === "PoP6h"
                          ? `${elementValue[0].value}˚C`
                          : elementValue[0].value}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
