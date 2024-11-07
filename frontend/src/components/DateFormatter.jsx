// src/components/DateFormatter.js

import React from "react";

const DateFormatter = ({ isoDate }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return <>{formatDate(isoDate)}</>;
};

export default DateFormatter;