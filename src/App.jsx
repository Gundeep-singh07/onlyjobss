import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./Components/Webpage/NavBar/NavBar.jsx";
import Header from "./Components/Webpage/Header/Header.jsx";
import Features from "./Components/Webpage/Features/Features.jsx";
import Pricing from "./Components/Webpage/Pricing/Pricing.jsx";
import SuccessStory from "./Components/Webpage/SuccessStory/SuccessStory.jsx";
import Numbers from "./Components/Webpage/Numbers/Numbers.jsx";
import Work from "./Components/Webpage/Work/Work.jsx";
import FAQ from "./Components/Webpage/FAQ/FAQ.jsx";
import Newsletter from "./Components/Webpage/Newsletter/Newsletter.jsx";
import Footer from "./Components/Webpage/Footer/Footer.jsx";
import JobApplicationForm from "./Components/Webpage/Questions/Job Seeker/JobApplicationForm.jsx";
import EmployerForm from "./Components/Webpage/Questions/Employer/EmployerForm.jsx";
import Login from "./Components/Webpage/Login/Login.jsx";
import RoleSelect from "./Components/Webpage/Questions/RoleSelect/RoleSelect.jsx";
import HelperChat from "./Components/Webpage/Helper/HelperChat.jsx";
import JobSeekerFeed from "./Components/JobSeeker/Feed/JobSeekerFeed.jsx";
import JobSeekerProfile from "./Components/JobSeeker/Profile/JobSeekerProfile.jsx";

import Payment from "./Components/Payments/Payment.jsx"; // 👈 ye line add karo imports me

import AboutUs from "./Components/Footer-links/About/About.jsx";
import Branding from "./Components/Footer-links/Brand/Brand.jsx";
import TermsOfService from "./Components/Footer-links/Terms/Terms.jsx";
import College from "./Components/Footer-links/College/College.jsx";
import OnlyJobsDownload from "./Components/Footer-links/Download/Download.jsx";
import Nitro from "./Components/Footer-links/Nitro/Nitro.tsx";
import Support from "./Components/Footer-links/Support/Support.jsx";
import { Blog, CreateBlog } from "./Components/Footer-links/Blog/Blog.jsx";
import Feedback from "./Components/Footer-links/Feedback/Feedback.jsx";

// ✅ Import the JobProvider Dashboard Component
import JobProviderComponent from "./Components/JobProvider/JobProvider.tsx";
import NotFound from "./Components/NotFound/NotFound.jsx";

// // ✅ Import the OnlyJobsVideo Component
import OnlyJobsVideo from "./Components/Webpage/OnlyJobsVideo/OnlyJobsVideo.jsx";

// Layout component to handle navbar visibility
const Layout = ({ children }) => {
  const location = useLocation();

  // ✅ Only show NavBar on non-dashboard pages
  const showNavbar = location.pathname === "/";

  // Only show help button on home page
  const showHelpButton = location.pathname === "/";

  return (
    <>
      {showNavbar && <NavBar />}
      {children}
      {showHelpButton && <FloatingHelpButton />}
    </>
  );
};

// Floating Help Button Component
const FloatingHelpButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <div
        className={`floating-button ${isVisible ? "show" : ""}`}
        title="Need Help?"
        onClick={() => setIsChatOpen(true)}
      >
        <span role="img" aria-label="help">
          💬
        </span>
      </div>
      <HelperChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

// Home Page Component
const Home = () => (
  <>
    <Header />
    <Features />
    <Pricing />
    <SuccessStory />
    <Numbers />
    <Work />
    <FAQ />
    <Newsletter />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />

          {/* Footer Links */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/brand" element={<Branding />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/college" element={<College />} />
          <Route path="/download" element={<OnlyJobsDownload />} />
          <Route path="/nitro" element={<Nitro />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/support" element={<Support />} />
          <Route path="/feedback" element={<Feedback />} />

          {/* Questions Flow */}
          <Route path="/questions" element={<RoleSelect />} />
          <Route path="/questions/jobseeker" element={<JobApplicationForm />} />
          <Route path="/questions/jobprovider" element={<EmployerForm />} />

          {/* Job Seeker Feed */}
          <Route path="/feed" element={<JobSeekerFeed />} />

          {/* Job Seeker Profile */}
          <Route path="/profile" element={<JobSeekerProfile />} />

          {/* ✅ Dashboard (JobProvider) Route */}
          <Route path="/dashboard/*" element={<JobProviderComponent />} />

          {/* ✅ OnlyJobsVideo Route */}
          {<Route path="/video" element={<OnlyJobsVideo />} />}

          <Route path="*" element={<NotFound />} />

          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
