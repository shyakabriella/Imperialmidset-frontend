import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Testimonials from "../pages/Testimonials";
import CompanyTeam from "../pages/CompanyTeam";
import FAQ from "../pages/FAQ";

import Login from "../pages/Auth/Login";

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
import TechnicalSupport from "../pages/services/TechnicalSupport";
import StudyAbroadAssessment from "../pages/services/StudyAbroadAssessment";
import VisaSupportForm from "../pages/services/VisaSupportForm";

import Appointments from "../pages/how-it-works/Appointments";
import HowItWorks from "../pages/how-it-works/HowItWorks";
import Quotation from "../pages/how-it-works/Quotation";
import PaymentInvoice from "../pages/how-it-works/PaymentInvoice";
import Tracking from "../pages/how-it-works/Tracking";

import UniversityDetails from "../pages/UniversityDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/universities/:slug" element={<UniversityDetails />} />
        <Route path="/companyTeam" element={<CompanyTeam />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/how-it-works/quotation" element={<Quotation />} />
        <Route path="/how-it-works/payment" element={<PaymentInvoice />} />
        <Route path="/how-it-works/appointments" element={<Appointments />} />
        <Route path="/how-it-works/tracking" element={<Tracking />} />

        <Route
          path="/services/study-abroad/university"
          element={<StudyAbroadUniversity />}
        />
        <Route path="/services/Visa" element={<VisaSupport />} />
        <Route path="/services/Culture_exchange" element={<CultureExchange />} />
        <Route
          path="/services/Culture_exchange/events"
          element={<CultureExchangeEvents />}
        />
        <Route
          path="/services/Culture_exchange/events/:eventId/apply"
          element={<CultureEventApply />}
        />
        <Route path="/services/Air_ticket" element={<AirTicketing />} />
        <Route path="/services/english-tests" element={<EnglishProficiency />} />
        <Route
          path="/services/english-tests/dashboard"
          element={<EnglishTestsDashboard />}
        />
        <Route path="/services/Career" element={<CareerGuidance />} />
        <Route
          path="/services/Career/book-meeting"
          element={<CareerBookMeeting />}
        />
        <Route path="/services/technical" element={<TechnicalSupport />} />
        <Route
          path="/services/study-abroad/assessment"
          element={<StudyAbroadAssessment />}
        />
        <Route
          path="/services/visa-support/request"
          element={<VisaSupportForm />}
        />
      </Route>
    </Routes>
  );
}