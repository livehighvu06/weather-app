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

  // 解析日期字串成為 Date 物件，假設日期格式為 "YYYY-MM-DD HH:mm:ss"
  const parseDateString = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
  };

  let closestTimePeriod = null;
  let closestDifference = Infinity;

  // 遍歷時間資料，尋找最接近的時間段
  for (const timePeriod of timeData) {
    if (timePeriod.startTime && timePeriod.endTime) {
      const startDate = parseDateString(timePeriod.startTime);

      // 計算與目標時間的差距
      const difference = Math.abs(inputDate - startDate);

      // 找出最接近的時間段
      if (difference < closestDifference) {
        closestDifference = difference;
        closestTimePeriod = timePeriod;
      }
    }
    if (timePeriod.dataTime) {
      const startDate = parseDateString(timePeriod.dataTime);

      // 計算與目標時間的差距
      const difference = Math.abs(inputDate - startDate);

      // 找出最接近的時間段
      if (difference < closestDifference) {
        closestDifference = difference;
        closestTimePeriod = timePeriod;
      }
    }
  }

  return closestTimePeriod;
};

const WeatherDisplay = () => {
  const { location, forecastType, dateTime, weatherType, sortBy } =
    useWeatherStore();
  const { data, isLoading, error } = useWeatherQuery(location, forecastType);

  if (isLoading)
    return <div className="text-3xl font-bold text-gray-900">Loading...</div>;
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
    T: "溫度",
  };

  // 調整排序
  const sortCitiesByCriteria = (
    matchingData,
    cityOrder,
    sortBy,
    forecastType
  ) => {
    // 照大小排序 由高至低
    // 溫度、降雨機率
    const sortByTemperature = sortBy === "temperature";
    const sortByPoP = sortBy === "pop";
    const sortByWeatherType = weatherType !== "all";

    // Helper function to extract the maximum temperature for a city
    const getMaxTemperature = (cityData, forecastType) => {
      if (forecastType === "36hours") {
        return parseInt(cityData[4].parameter.parameterName, 10);
      } else {
        return parseInt(cityData[3].elementValue[0].value, 10);
      }
    };

    let sortedCities;

    if (forecastType === "36hours") {
      sortedCities = cityOrder
        .filter((city) => city in matchingData)
        .filter((location) => {
          // 當 weatherType 不等於 'all' 時進行篩選
          if (sortByWeatherType) {
            return (
              matchingData[location][0].parameter.parameterValue === weatherType
            );
          }
          return true;
        })
        .sort((a, b) => {
          if (sortByTemperature) {
            return (
              getMaxTemperature(matchingData[b], forecastType) -
              getMaxTemperature(matchingData[a], forecastType)
            );
          }
          if (sortByPoP) {
            return (
              parseInt(matchingData[b][1].parameter.parameterName, 10) -
              parseInt(matchingData[a][1].parameter.parameterName, 10)
            );
          }
          return cityOrder.indexOf(a) - cityOrder.indexOf(b);
        });
    } else {
      sortedCities = cityOrder
        .filter((city) => city in matchingData)
        .filter((location) => {
          // 當 weatherType 不等於 'all' 時進行篩選
          if (sortByWeatherType) {
            const wx = matchingData[location].find(
              (el) => el.elementName === "Wx"
            );
            return (
              parseInt(wx.elementValue[1].value, 10) ===
              parseInt(weatherType, 10)
            );
          }
          return true;
        })
        .sort((a, b) => {
          if (sortByTemperature) {
            return (
              getMaxTemperature(matchingData[b], forecastType) -
              getMaxTemperature(matchingData[a], forecastType)
            );
          }
          if (sortByPoP) {
            return (
              parseInt(matchingData[b][0].elementValue[0].value, 10) -
              parseInt(matchingData[a][0].elementValue[0].value, 10)
            );
          }
          return 0; // 不做額外排序
        });
    }

    // 將排序後的城市資料轉為物件
    const sortedMatchingData = sortedCities.reduce((obj, city) => {
      obj[city] = matchingData[city];
      return obj;
    }, {});

    return sortedMatchingData;
  };
  const sortedCities = sortCitiesByCriteria(
    matchingData,
    cityOrder,
    sortBy,
    forecastType
  );
  if (!Object.keys(sortedCities).length) {
    return (
      <div className="mt-6 text-2xl font-bold text-gray-900">沒有符合資料</div>
    );
  }
  return (
    <div className="mt-6">
      {forecastType === "36hours" && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            三十六小時天氣預報
          </h2>
          {Object.keys(sortedCities).map((locationName, index) => {
            return (
              <div key={index} className="mb-6 pb-6 border-b-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {locationName}
                </h2>
                <p className="text-sm text-gray-600">
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
                      <div key={elemIndex} className="mt-2">
                        <p className="text-sm text-gray-700">
                          <strong className="font-medium">
                            {weatherStatus[elementName]}:
                          </strong>{" "}
                          {data.parameter.parameterName}
                          {(elementName === "MinT" || elementName === "MaxT") &&
                            "˚C"}
                          {elementName === "PoP" && "%"}
                        </p>
                      </div>
                    )
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {forecastType === "2days" && (
        <div>
          <h1 className="text-3xl  font-semibold text-gray-900 mb-6">
            未來兩天天氣預報
          </h1>
          {Object.keys(sortedCities).map((locationName, index) => (
            <div key={index} className="mb-6 pb-6 border-b-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {locationName}
              </h2>
              <p className="text-sm text-gray-600">
                {sortedCities[locationName][0].startTime} -{" "}
                {sortedCities[locationName][0].endTime}
              </p>
              {sortedCities[locationName].map((data, elemIndex) => {
                const { elementName, elementValue } = data;
                return (
                  <div key={elemIndex} className="mt-2">
                    {(elementName === "WeatherDescription" ||
                      elementName === "PoP6h" ||
                      elementName === "T") && (
                      <p className="text-sm text-gray-700">
                        <strong className="font-medium">
                          {weatherStatus[elementName]}:
                        </strong>{" "}
                        {elementValue[0].value}
                        {(elementName === "PoP6h" && "%") ||
                          (elementName === "T" && "˚C")}
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
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            未來一週天氣預報
          </h1>
          {Object.keys(sortedCities).map((locationName, index) => (
            <div key={index} className="mb-6 pb-6 border-b-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {locationName}
              </h2>
              <p className="text-sm text-gray-600">
                {sortedCities[locationName][0].startTime} -{" "}
                {sortedCities[locationName][0].endTime}
              </p>
              {sortedCities[locationName].map((data, elemIndex) => {
                const { elementName, elementValue } = data;
                return (
                  <div key={elemIndex} className="mt-2">
                    {(elementName === "WeatherDescription" ||
                      elementName === "PoP6h" ||
                      elementName === "T") && (
                      <p className="text-sm text-gray-700">
                        <strong className="font-medium">
                          {weatherStatus[elementName]}:
                        </strong>{" "}
                        {elementValue[0].value}
                        {(elementName === "PoP6h" && "%") ||
                          (elementName === "T" && "˚C")}
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
