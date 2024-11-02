import React, { Suspense } from "react";
import SalesProfit from "../components/dashboard/SalesProfit";
import TotalFollowers from "../components/dashboard/TotalFollowers";
import TotalIncome from "../components/dashboard/TotalIncome";
import PopularProducts from "../components/dashboard/PopularProducts";
import EarningReports from "../components/dashboard/EarningReports";
import BlogCards from "../components/dashboard/BlogCards";
import Link from "next/link";
import { Metadata } from "next";
import InformasiTeam from "../components/dashboard/InfoTeam";
import Loading from "./Loading";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Informasi umum"
}

const page = () => {
  return (
    <>
      <h2 className="text-3xl font-bold  mb-6">Wellcome!</h2>
      <Suspense fallback={<Loading />}>
        <InformasiTeam />
      </Suspense>
    </>
  );
};

export default page;
