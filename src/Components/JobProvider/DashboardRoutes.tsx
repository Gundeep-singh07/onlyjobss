import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Index from "./pages/Index";
import FindCandidates from "./pages/FindCandidates";
import PostJob from "./pages/PostJob";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="profile" element={<Profile />} />
      <Route path="find-candidates" element={<FindCandidates />} />
      <Route path="post-job" element={<PostJob />} />
      <Route path="messages" element={<Messages />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
};

export default DashboardRoutes;
