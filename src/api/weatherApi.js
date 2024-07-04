import axios from "axios";

const BASE_URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/";
const API_KEY = "CWA-6283E856-037B-4A72-B73C-D7D12B6EE357";

const ENDPOINTS = {
  "36hours": "F-C0032-001",
  "2days": {
    宜蘭縣: "F-D0047-001",
    桃園市: "F-D0047-005",
    新竹縣: "F-D0047-009",
    苗栗縣: "F-D0047-013",
    彰化縣: "F-D0047-017",
    南投縣: "F-D0047-021",
    雲林縣: "F-D0047-025",
    嘉義縣: "F-D0047-029",
    屏東縣: "F-D0047-033",
    臺東縣: "F-D0047-037",
    花蓮縣: "F-D0047-041",
    澎湖縣: "F-D0047-045",
    基隆市: "F-D0047-049",
    新竹市: "F-D0047-053",
    嘉義市: "F-D0047-057",
    臺北市: "F-D0047-061",
    高雄市: "F-D0047-065",
    新北市: "F-D0047-069",
    臺中市: "F-D0047-073",
    臺南市: "F-D0047-077",
    連江縣: "F-D0047-081",
    金門縣: "F-D0047-085",
    all: "F-D0047-089",
  },
  "1week": {
    宜蘭縣: "F-D0047-003",
    桃園市: "F-D0047-007",
    新竹縣: "F-D0047-011",
    苗栗縣: "F-D0047-015",
    彰化縣: "F-D0047-019",
    南投縣: "F-D0047-023",
    雲林縣: "F-D0047-027",
    嘉義縣: "F-D0047-031",
    屏東縣: "F-D0047-035",
    臺東縣: "F-D0047-039",
    花蓮縣: "F-D0047-043",
    澎湖縣: "F-D0047-047",
    基隆市: "F-D0047-051",
    新竹市: "F-D0047-055",
    嘉義市: "F-D0047-059",
    臺北市: "F-D0047-063",
    高雄市: "F-D0047-067",
    新北市: "F-D0047-071",
    臺中市: "F-D0047-075",
    臺南市: "F-D0047-079",
    連江縣: "F-D0047-083",
    金門縣: "F-D0047-089",
    all: "F-D0047-091",
  },
};

export const fetchWeatherData = async (location, forecastType) => {
  let endpoint;
  if (forecastType === "36hours") {
    endpoint = ENDPOINTS["36hours"];
  } else if (!location) {
    endpoint = ENDPOINTS[forecastType]["all"];
  } else {
    endpoint = ENDPOINTS[forecastType][location];
  }

  let url = `${BASE_URL}${endpoint}?Authorization=${API_KEY}&format=JSON`;

  if (location && forecastType === "36hours") {
    url += `&locationName=${location}`;
  }
  console.log(location);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
