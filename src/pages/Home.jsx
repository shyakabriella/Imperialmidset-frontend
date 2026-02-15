import Welcome from "./Welcome";
import Explore from "./Explore";
import CourseCategory from "./UniversityPartners";
import ExploreOpportunities from "./ExploreOpportunities";
import AboutUs from "./AboutUs";
import UpcomingEvents from "./UpcomingEvents";
import Testimonials from "./Testimonials";

export default function Home() {
  return (
    <div>
      <Welcome />
      <Explore />
      <CourseCategory />
      <ExploreOpportunities />
      <AboutUs />
      <UpcomingEvents />
      <Testimonials />
    </div>
  );
}
