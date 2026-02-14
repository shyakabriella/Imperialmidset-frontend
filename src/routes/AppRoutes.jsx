import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import StudyAbroadUniversity from "../pages/services/StudyAbroadUniversity";
import VisaSupport from "../pages/services/VisaSupport";
import CultureExchange from "../pages/services/CultureExchange";
import CultureEventApply from "../pages/services/CultureEventApply";
import CultureExchangeEvents from "../pages/services/CultureExchangeEvents";
import AirTicketing from "../pages/services/AirTicketing";
import EnglishProficiency from "../pages/services/EnglishProficiency";
import EnglishTestsDashboard from "../pages/services/EnglishTestsDashboard";
import CareerGuidance from "../pages/services/CareerGuidance";
import CareerBookMeeting from "../pages/services/CareerBookMeeting";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />

        {/* ✅ Study Abroad page */}
        <Route
          path="services/study-abroad/university"
          element={<StudyAbroadUniversity />}
        />
        <Route path="services/Visa" element={<VisaSupport />} />
        <Route path="services/Culture_exchange" element={<CultureExchange />} />
        <Route path="services/Culture_exchange/events" element={<CultureExchangeEvents />} />
        <Route path="services/Culture_exchange/events/:eventId/apply" element={<CultureEventApply />} />
        <Route path="services/Air_ticket" element={<AirTicketing />} />
        <Route path="services/english-tests" element={<EnglishProficiency />} />
        <Route path="services/english-tests/dashboard" element={<EnglishTestsDashboard />} />
        <Route path="services/Career" element={<CareerGuidance />} />
        <Route path="services/Career/book-meeting" element={<CareerBookMeeting />} />
      </Route>
    </Routes>
  );
}
