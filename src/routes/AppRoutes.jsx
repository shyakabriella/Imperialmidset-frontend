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
import Contact from "../pages/Contact";
import Appointments from "../pages/how-it-works/Appointments";
import Testimonials from "../pages/Testimonials";
import CompanyTeam from "../pages/CompanyTeam";
import CompanyPartners from "../pages/company/CompanyPartners";
import PartnershipRequest from "../pages/company/PartnershipRequest";
import ResourcesBlog from "../pages/resources/ResourcesBlog";
import ScholarshipTips from "../pages/resources/ScholarshipTips";
import CountryGuides from "../pages/resources/CountryGuides";
import UniversityFinder from "../pages/resources/UniversityFinder";
import FAQ from "../pages/FAQ";
import HowItWorks from "../pages/how-it-works/HowItWorks";
import Quotation from "../pages/how-it-works/Quotation";
import PaymentInvoice from "../pages/how-it-works/PaymentInvoice";
import Tracking from "../pages/how-it-works/Tracking";
import TechnicalSupport from "../pages/services/TechnicalSupport";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-it-works/appointments" element={<Appointments />} />
        <Route path="/testimonials" element={<Testimonials/>}/>
        <Route path="/companyTeam"element={<CompanyTeam/>}/>
        <Route path="/company/partners"element={<CompanyPartners/>}/>
        <Route path="/company/partners/request"element={<PartnershipRequest/>}/>
        <Route path="/resources/blog" element={<ResourcesBlog />} />
        <Route path="/resources/scholarships" element={<ScholarshipTips />} />
        <Route path="/resources/countries" element={<CountryGuides />} />
        <Route path="/resources/university-finder" element={<UniversityFinder />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/how-it-works/quotation" element={<Quotation />} />
        <Route path="/how-it-works/payment" element={<PaymentInvoice />} />
        <Route path="/how-it-works/appointments" element={<Appointments />} />
        <Route path="/how-it-works/tracking" element={<Tracking />} />
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
        <Route path="services/technical"element={<TechnicalSupport/>}/>
      </Route>
    </Routes>
  );
}
