import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary"
import { Outlet, useLocation} from "react-router";

import type { FallbackProps } from "react-error-boundary";

import log from "electron-log/renderer";
import SideNav from "./side";
import Navbar from "./navbar";
import PlayBar from "./playbar";

// import Fallback from "@/components/error-fallback";
const Fallback = ({ resetErrorBoundary }: FallbackProps) => {return "Error"};

const Layout = () => {


    return (
        <ErrorBoundary
            FallbackComponent={Fallback}
            resetKeys={[location.pathname]}
            onError={(error, info) => {
                log.error("[ErrorBoundary]", error, info)
            }}>
          <div className="flex h-full flex-col">
            <div className="flex min-h-0 w-full flex-1">
                <SideNav />
                <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                    <div className="h-16 flex-none">
                        <Navbar />
                    </div>
                    <div className="min-h-0 felx overflow-hidden">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="relative z-50 h- w-full flex-none shadow-2xl">
                <PlayBar />
            </div>
          </div>
          
        </ErrorBoundary>
    )
};

export default Layout