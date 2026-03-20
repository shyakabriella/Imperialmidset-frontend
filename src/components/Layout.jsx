import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  React.useLayoutEffect(() => {
    // stop browser from restoring previous scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // always go to top when route changes
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-clip">
      <ScrollToTop />

      <Header />

      {/* Header is fixed height (84px) */}
      <main className="flex-1 w-full pt-[84px] overflow-x-clip">
        <div className="w-full min-w-0">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}