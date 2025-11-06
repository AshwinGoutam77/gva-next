import GridShape from "@/components/common/GridShape"; 
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <GridShape />
              <div className="flex flex-col items-center  ">
                <Link href="/" className="flex mb-4 gap-3 items-center">
                <img src="images/logo/logo-icon.svg" alt="" />
                  <p className="text-[36px] text-white">GVA e.V. DSDB</p>
                </Link>
                <p className="text-center text-gray-400 dark:text-white/60 max-w-2xs">
                  Powerful Admin Dashboard designed for smooth management and insights.
                </p>
              </div>
            </div>
          </div> 
        </div> 
    </div>
  );
}
