import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { JobPostForm } from "../components/ui-custom/JobPostForm";

const PostJob = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="layout">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="main-content animate-fade-in">
          <div className="page-header">
            <h1 className="page-title">Post a New Job</h1>
            <p className="page-description">
              Create a new job listing to find the perfect candidates for your
              team.
            </p>
          </div>

          <JobPostForm />
        </main>
      </div>

      <style>
        {`
          .page-header {
            margin-bottom: 2rem;
          }
          
          .page-title {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(90deg, var(--onlyjobs-blue), var(--onlyjobs-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .page-description {
            color: var(--muted-foreground);
            font-size: 1rem;
          }
        `}
      </style>
    </div>
  );
};

export default PostJob;
