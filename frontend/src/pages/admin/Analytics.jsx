import React from "react";

import TodayCard from "../../components/admin/Analytics/TodayCard";
import MonthCard from "../../components/admin/Analytics/MonthCard";
import YearCard from "../../components/admin/Analytics/YearCard";
import SellChart from "../../components/admin/Analytics/SellChart";

const Analytics = () => {
  return (
    <div className="m-2">
      <div className="grid lg:grid-cols-3 lg:gap-6 md:grid-cols-2 sm:grid-cols-1 gap-3">
        {/* Today Card */}
        <TodayCard />

        {/* Month Card */}
        <MonthCard />

        {/* Year Card */}
        <YearCard />
      </div>
      <SellChart />
    </div>
  );
};

export default Analytics;
