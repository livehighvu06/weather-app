import React from "react";
import useWeatherStore from "../hooks/useWeatherStore";

const DateTimePicker = () => {
  const { setDateTime } = useWeatherStore();

  return (
    <input
      type="datetime-local"
      onChange={(e) => setDateTime(new Date(e.target.value))}
    />
  );
};

export default DateTimePicker;
