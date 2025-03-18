import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { SwipeInterface } from "../components/ui-custom/SwipeInterface";
import { useNavigate } from "react-router-dom";

interface Candidate {
  id: string;
  name: string;
  photo: string;
  location: string;
  title: string;
  experience: string;
  skills: string[];
  bio: string;
}

const companyName = "Tech Innovations Inc.";

const FindCandidates = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFinishSwipe = (candidates: Candidate[]) => {
    setSelectedCandidates(candidates);
    setShowResults(true);
  };

  const handleContinue = () => {
    navigate("/");
  };

  const handleRestart = () => {
    setShowResults(false);
    setSelectedCandidates([]);
  };

  return (
    <div className="min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} companyName={companyName} />

      <div className="layout">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="main-content animate-fade-in">
          <div className="text-center mb-6">
            <h1 className="page-title">Find Your Perfect Candidates</h1>
            <p className="page-description">
              Swipe right to save promising candidates, or left to pass. Your
              matches will be saved for you to contact.
            </p>
          </div>

          <SwipeInterface onFinish={handleFinishSwipe} />

          {showResults && (
            <div className="results-overlay">
              <div className="results-modal">
                <h2 className="results-title">Search Complete!</h2>

                <p className="results-description">
                  You've selected {selectedCandidates.length} candidates for
                  your positions.
                </p>

                {selectedCandidates.length > 0 ? (
                  <div className="candidates-list">
                    {selectedCandidates.map((candidate) => (
                      <div key={candidate.id} className="candidate-item">
                        <div className="candidate-photo">
                          <img src={candidate.photo} alt={candidate.name} />
                        </div>
                        <div className="candidate-info">
                          <p className="candidate-name">{candidate.name}</p>
                          <p className="candidate-meta">
                            {candidate.title} • {candidate.experience}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-candidates-message">
                    You didn't select any candidates. Would you like to try
                    again?
                  </p>
                )}

                <div className="results-actions">
                  <button
                    className="button button-outline"
                    onClick={handleRestart}
                  >
                    Search Again
                  </button>
                  <button
                    className="button button-default"
                    onClick={handleContinue}
                  >
                    Continue to Feed
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>
        {`
          .min-h-screen {
            min-height: 100vh;
            background-color: var(--background);
            color: var(--foreground);
          }
          
          .layout {
            display: flex;
            padding-top: 4rem;
            min-height: calc(100vh - 4rem);
          }
          
          .main-content {
            flex: 1;
            padding: 1.5rem;
            max-width: 1280px;
            margin: 0 auto;
            animation: fadeIn 0.3s ease-out;
          }
          
          .text-center {
            text-align: center;
          }
          
          .mb-6 {
            margin-bottom: 1.5rem;
          }
          
          .page-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--foreground);
          }
          
          .page-description {
            color: var(--muted-foreground);
            max-width: 600px;
            margin: 0 auto;
          }
          
          .results-overlay {
            position: fixed;
            inset: 0;
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            animation: fadeIn 0.3s ease-out;
          }
          
          .results-modal {
            width: 100%;
            max-width: 32rem;
            background-color: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            animation: scaleIn 0.3s ease-out;
          }
          
          .results-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-align: center;
          }
          
          .results-description {
            text-align: center;
            margin-bottom: 1.5rem;
            color: var(--foreground);
          }
          
          .candidates-list {
            max-height: 15rem;
            overflow-y: auto;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            margin-bottom: 1.5rem;
          }
          
          .candidate-item {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            gap: 0.75rem;
            border-bottom: 1px solid var(--border);
          }
          
          .candidate-item:last-child {
            border-bottom: none;
          }
          
          .candidate-photo {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            overflow: hidden;
            flex-shrink: 0;
          }
          
          .candidate-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .candidate-info {
            flex: 1;
            min-width: 0;
          }
          
          .candidate-name {
            font-weight: 500;
            margin: 0;
            color: var(--foreground);
          }
          
          .candidate-meta {
            font-size: 0.75rem;
            color: var(--muted-foreground);
            margin: 0;
          }
          
          .no-candidates-message {
            text-align: center;
            color: var(--muted-foreground);
            margin-bottom: 1.5rem;
          }
          
          .results-actions {
            display: flex;
            gap: 0.75rem;
            justify-content: center;
          }
          
          .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius);
            font-weight: 500;
            transition: all 0.2s ease;
            cursor: pointer;
            font-size: 0.875rem;
            height: 2.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .button-default {
            background-color: var(--primary);
            color: var(--primary-foreground);
            border: none;
          }
          
          .button-default:hover {
            opacity: 0.9;
          }
          
          .button-outline {
            background-color: transparent;
            border: 1px solid var(--border);
            color: var(--foreground);
          }
          
          .button-outline:hover {
            background-color: var(--muted);
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes scaleIn {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default FindCandidates;
