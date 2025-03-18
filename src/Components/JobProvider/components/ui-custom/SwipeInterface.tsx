import React, { useState, useEffect } from "react";
import { ProfileCard } from "./ProfileCard";

// Sample data for candidates
const candidates = [
  {
    id: "1",
    name: "Emma Wilson",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "San Francisco, CA",
    title: "Frontend Developer",
    experience: "5 years",
    skills: ["React", "TypeScript", "CSS", "GraphQL"],
    bio: "I'm a passionate frontend developer with 5 years of experience building responsive, accessible, and performant web applications. I love working with React and TypeScript, and I'm always looking to learn new technologies and improve my skills.",
  },
  {
    id: "2",
    name: "James Chen",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "New York, NY",
    title: "Backend Developer",
    experience: "7 years",
    skills: ["Node.js", "Express", "MongoDB", "AWS"],
    bio: "Backend developer with expertise in building scalable microservices and RESTful APIs. Proficient in Node.js, Express, and database technologies. AWS certified with experience in cloud infrastructure and serverless architectures.",
  },
  {
    id: "3",
    name: "Olivia Martinez",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Austin, TX",
    title: "Full Stack Developer",
    experience: "4 years",
    skills: ["JavaScript", "React", "Node.js", "PostgreSQL"],
    bio: "Full stack developer experienced in building modern web applications from start to finish. Skilled in frontend frameworks like React, backend technologies like Node.js, and database systems. Strong problem-solver with attention to detail.",
  },
  {
    id: "4",
    name: "Daniel Kim",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Seattle, WA",
    title: "DevOps Engineer",
    experience: "6 years",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    bio: "DevOps engineer specializing in containerization, automation, and cloud infrastructure. Experienced in implementing CI/CD pipelines and managing Kubernetes clusters. Dedicated to improving development workflows and system reliability.",
  },
  {
    id: "5",
    name: "Sophia Patel",
    photo:
      "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Chicago, IL",
    title: "UI/UX Designer",
    experience: "5 years",
    skills: ["Figma", "Sketch", "User Research", "Prototyping"],
    bio: "UI/UX designer passionate about creating intuitive, accessible, and delightful user experiences. Skilled in design thinking, user research, and visual design. Experienced in collaborating with cross-functional teams to deliver user-centered products.",
  },
];

interface SwipeInterfaceProps {
  onFinish: (selectedCandidates: any[]) => void;
}

export function SwipeInterface({ onFinish }: SwipeInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCandidates, setLikedCandidates] = useState<any[]>([]);
  const [showBadge, setShowBadge] = useState<"like" | "pass" | null>(null);

  const currentCandidate = candidates[currentIndex];
  const isFinished = currentIndex >= candidates.length;

  useEffect(() => {
    if (isFinished) {
      onFinish(likedCandidates);
    }
  }, [isFinished, likedCandidates, onFinish]);

  const handleLike = () => {
    setShowBadge("like");
    setLikedCandidates([...likedCandidates, currentCandidate]);

    // Add delay to show badge before changing card
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setShowBadge(null);
    }, 500);
  };

  const handlePass = () => {
    setShowBadge("pass");

    // Add delay to show badge before changing card
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setShowBadge(null);
    }, 500);
  };

  return (
    <div className="swipe-container touch-manipulation">
      {!isFinished ? (
        <ProfileCard
          profile={currentCandidate}
          onLike={handleLike}
          onPass={handlePass}
          showBadge={showBadge}
        />
      ) : (
        <div className="swipe-finished">
          <h3>No more candidates to review</h3>
          <p>
            You've liked {likedCandidates.length} candidates out of{" "}
            {candidates.length}
          </p>
        </div>
      )}

      <style>
        {`
          .swipe-container {
            max-width: 500px;
            height: 500px;
            margin: 0 auto;
            position: relative;
            border-radius: var(--radius);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          
          .swipe-finished {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            background-color: var(--card);
            border-radius: var(--radius);
            text-align: center;
          }
          
          .swipe-finished h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          
          .swipe-finished p {
            color: var(--muted-foreground);
          }

          .touch-manipulation {
            touch-action: pan-y;
            -webkit-user-select: none;
            user-select: none;
          }
        `}
      </style>
    </div>
  );
}
