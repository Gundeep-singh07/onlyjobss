import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import NavBar from "./Components/Webpage/NavBar/NavBar";
import Header from "./Components/Webpage/Header/Header";
import Features from "./Components/Webpage/Features/Features";
import Pricing from "./Components/Webpage/Pricing/Pricing";
import SuccessStory from "./Components/Webpage/SuccessStory/SuccessStory";
import Numbers from "./Components/Webpage/Numbers/Numbers";
import Work from "./Components/Webpage/Work/Work";
import FAQ from "./Components/Webpage/FAQ/FAQ";
import Newsletter from "./Components/Webpage/Newsletter/Newsletter";
import Footer from "./Components/Webpage/Footer/Footer";
import JobApplicationForm from "./Components/Webpage/Questions/Job Seeker/JobApplicationForm"
import EmployerForm from "./Components/Webpage/Questions/Employer/EmployerForm"
import Login from "./Components/Webpage/Login/Login";
import RoleSelect from "./Components/Webpage/Questions/RoleSelect/RoleSelect";
import HelperChat from "./Components/Webpage/Helper/HelperChat";
import JobSeekerFeed from "./Components/Job Seeker/Feed/JobSeekerFeed";
import JobSeekerProfile from "./Components/Job Seeker/Profile/JobSeekerProfile";

// Layout component to handle navbar visibility
const Layout = ({ children }) => {
    const location = useLocation();

    // Only show navbar on home page
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
            <HelperChat
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
            />
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

                    {/* Questions Flow */}
                    <Route path="/questions" element={<RoleSelect />} />
                    <Route
                        path="/questions/jobseeker"
                        element={<JobApplicationForm />}
                    />
                    <Route
                        path="/questions/employer"
                        element={<EmployerForm />}
                    />

                    {/* Job Seeker Feed */}
                    <Route path="/feed" element={<JobSeekerFeed />} />

                    {/* Job Seeker Profile */}
                    <Route path="/profile" element={<JobSeekerProfile />} />

                    {/* Add employer questions route when ready */}
                    {/* <Route path="/questions/employer" element={<EmployerQuestions />} /> */}
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
