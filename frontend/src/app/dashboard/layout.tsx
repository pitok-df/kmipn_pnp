'use client'
import React from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full">
        <Sidebar />
        <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
          <Header />
          <div className={`container mx-auto py-30`}>
            {children}
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
