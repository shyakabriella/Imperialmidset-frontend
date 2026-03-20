import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import DashboardLayout from "../components/DashboardLayout";

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

import Appointments from "../pages/how-it-works/Appointments";
import HowItWorks from "../pages/how-it-works/HowItWorks";
import Quotation from "../pages/how-it-works/Quotation";
import PaymentInvoice from "../pages/how-it-works/PaymentInvoice";
import Tracking from "../pages/how-it-works/Tracking";
<<<<<<< HEAD
import TechnicalSupport from "../pages/services/TechnicalSupport";
import StudyAbroadAssessment from "../pages/services/StudyAbroadAssessment";
import VisaSupportForm from "../pages/services/VisaSupportForm";
import UniversityDetails from "../pages/UniversityDetails";
=======

import CompanyPartners from "../pages/company/CompanyPartners";
import PartnershipRequest from "../pages/company/PartnershipRequest";

import ResourcesBlog from "../pages/resources/ResourcesBlog";
import ScholarshipTips from "../pages/resources/ScholarshipTips";
import CountryGuides from "../pages/resources/CountryGuides";
import UniversityFinder from "../pages/resources/UniversityFinder";

import AdminDashboard from "../dashboard/admin/AdminDashboard";

/* Temporary dashboard pages */
function WebManagePage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-[#0B3B82]">Web Manage</h1>
      <p className="mt-2 text-slate-600">
        This is the Web Manage page. Add website management tools here.
      </p>
    </div>
  );
}

function ApplicationPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-[#0B3B82]">Application</h1>
      <p className="mt-2 text-slate-600">
        This is the Application page. Add applications list and actions here.
      </p>
    </div>
  );
}

function ReportPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-[#0B3B82]">Report</h1>
      <p className="mt-2 text-slate-600">
        This is the Report page. Add reports and analytics here.
      </p>
    </div>
  );
}

function SettingPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-[#0B3B82]">Settings</h1>
      <p className="mt-2 text-slate-600">
        This is the Settings page. Add system settings here.
      </p>
    </div>
  );
}
>>>>>>> b8e550cf5d97516d57bdbe216ab3fd77dbd08a3a

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login page without header/footer */}
      <Route path="/login" element={<Login />} />

      {/* Public Website Routes with header/footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
<<<<<<< HEAD
        <Route path="/how-it-works/appointments" element={<Appointments />} />
        <Route path="/testimonials" element={<Testimonials/>}/>
        <Route path="/universities/:slug" element={<UniversityDetails />} />
        <Route path="/companyTeam"element={<CompanyTeam/>}/>
        <Route path="/company/partners"element={<CompanyPartners/>}/>
        <Route path="/company/partners/request"element={<PartnershipRequest/>}/>
=======
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/companyTeam" element={<CompanyTeam />} />
        <Route path="/company/partners" element={<CompanyPartners />} />
        <Route
          path="/company/partners/request"
          element={<PartnershipRequest />}
        />
>>>>>>> b8e550cf5d97516d57bdbe216ab3fd77dbd08a3a
        <Route path="/resources/blog" element={<ResourcesBlog />} />
        <Route path="/resources/scholarships" element={<ScholarshipTips />} />
        <Route path="/resources/countries" element={<CountryGuides />} />
        <Route
          path="/resources/university-finder"
          element={<UniversityFinder />}
        />
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
<<<<<<< HEAD
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
       <Route path="/services/study-abroad/assessment" element={<StudyAbroadAssessment />} />
       <Route path="/services/visa-support/request"element={<VisaSupportForm/>}/>
=======
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
        <Route
          path="/services/english-tests"
          element={<EnglishProficiency />}
        />
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
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* when user goes to /dashboard, redirect to /dashboard/admin */}
        <Route index element={<Navigate to="admin" replace />} />

        <Route path="admin" element={<AdminDashboard />} />
        <Route path="web-manage" element={<WebManagePage />} />
        <Route path="application" element={<ApplicationPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="setting" element={<SettingPage />} />
>>>>>>> b8e550cf5d97516d57bdbe216ab3fd77dbd08a3a
      </Route>
    </Routes>
  );
}