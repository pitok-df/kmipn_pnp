import Logo from "@/app/dashboard2/layout/shared/logo/Logo";
import React, { useEffect } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import AuthLogin from "../authforms/AuthLogin";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};
const BoxedLogin = () => {
  return (
    <>
      <div className="relative overflow-hidden h-screen bg-muted dark:bg-dark">
        <div className="flex h-full justify-center items-center px-4">
          <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative  break-words md:w-[450px] w-full border-none ">
            <div className="flex h-full flex-col justify-center gap-2 p-0 w-full">
              <div className="mx-auto">
                <Logo />
              </div>
              <p className="text-lg text-center text-dark my-3">Login to your account</p>
              <AuthLogin />
              <div className="flex gap-2 md:text-base text-sm font-medium mt-6 items-center justify-center">
                <p>Don't have account?</p>
                <Link
                  href={"/auth/register"}
                  className="text-primary text-sm font-medium"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoxedLogin;
