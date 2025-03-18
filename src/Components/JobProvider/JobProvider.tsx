import { ThemeProvider } from "./components/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import DashboardRoutes from "./DashboardRoutes"; // New file

import NotFound from "./pages/NotFound";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Show navbar on all pages except NotFound
  const showNavbar = location.pathname !== "/404"; // ✅ Fixed

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {showNavbar && <Navbar toggleSidebar={toggleSidebar} />}
      {children}
    </>
  );
};

const queryClient = new QueryClient();

const JobProviderComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>
          <Routes>
            {/* Redirect root path to Profile */}
            <Route
              path="/"
              element={<Navigate to="/dashboard/profile" replace />}
            />

            {/* Dashboard Routes (Nested) */}
            <Route path="/dashboard/*" element={<DashboardRoutes />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default JobProviderComponent;
