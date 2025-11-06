import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import LatestProtections from "@/components/ecommerce/RecentOrders";

export const metadata: Metadata = {
  title:
    "GVA e.V. DSDB",
  // description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-5 mt-6">
        <div className="col-span-12 space-y-6 xl:col-span-6">
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-6">
          <LatestProtections />
        </div>
      </div>
    </div>
  );
}
