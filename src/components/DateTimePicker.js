import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";

const DateTimePicker = () => {
  const { setDateTime } = useWeatherStore();

  return (
    <input
      type="datetime-local"
      onChange={(e) => setDateTime(new Date(e.target.value))}
      className="border border-gray-300 rounded px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default DateTimePicker;
