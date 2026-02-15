import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // ✅ immediate jump to top before paint (prevents vertical flicker)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}