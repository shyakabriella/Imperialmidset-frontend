import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-clip">
      <Header />

      {/* Header is fixed height (84px) */}
      <main className="flex-1 w-full pt-[84px] overflow-x-clip">
        <div className="w-full min-w-0">
          <Outlet />
        </div>
      </main>

      {/* ✅ Sticky footer when page content is short */}
      <Footer />
    </div>
  );
}