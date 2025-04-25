import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobSeekerFeed.css";
import ProfileLink from "../Profile/ProfileLink";
import pfp from "../../../assets/pfp.png";

const JobSeekerFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortOption, setSortOption] = useState("relevance");
  const [savedJobs, setSavedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    salary: "",
    remote: false,
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: "",
    title: "",
    avatar: "",
    connections: 0,
    views: 0,
    applications: 0,
  });
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [people, setPeople] = useState([]);
  const [topHires, setTopHires] = useState([]);

  const navigate = useNavigate();

  // API URL
  const API_URL = "http://localhost:3004/api/auth/register/job-seeker";

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(`${API_URL}/api/job-seekers/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          // Map backend data to component state format
          const profileData = response.data.data;
          setUserProfile({
            name: profileData.name || "",
            title: profileData.position || "",
            avatar: profileData.avatar || pfp,
            connections: profileData.connections || 0,
            views: profileData.profileViews || 0,
            applications: profileData.applications?.length || 0,
          });
        } else {
          throw new Error("Failed to fetch profile data");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        // Fallback to default data if API call fails
        setUserProfile({
          name: "Alex Morgan",
          title: "Senior Frontend Developer",
          avatar: pfp,
          connections: 842,
          views: 38,
          applications: 12,
        });
      }
    };

    fetchUserProfile();
  }, [API_URL]);

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(`${API_URL}/api/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setJobs(response.data.data);
          setFilteredJobs(response.data.data);
        } else {
          throw new Error("Failed to fetch jobs data");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        // Fallback to default data if API call fails
        const defaultJobs = [
          {
            id: 1,
            title: "Senior Frontend Developer",
            company: "Google",
            location: "San Francisco, CA",
            salary: "₹120k - ₹150k",
            type: "Full-time",
            posted: "2 days ago",
            description:
              "We're looking for an experienced Frontend Developer to join our team and help build the next generation of our product. You'll be working with React, TypeScript, and modern web technologies.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            isRemote: false,
            skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
          },
          {
            id: 2,
            title: "UX/UI Designer",
            company: "Airbnb",
            location: "Remote",
            salary: "₹90k - ₹110k",
            type: "Full-time",
            posted: "1 week ago",
            description:
              "Join our creative team as a UX/UI Designer to create beautiful, intuitive interfaces for our clients. You should have a strong portfolio and experience with Figma and Adobe Creative Suite.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
            isRemote: true,
            skills: [
              "Figma",
              "Adobe XD",
              "UI Design",
              "UX Research",
              "Prototyping",
            ],
          },
          {
            id: 3,
            title: "Backend Developer",
            company: "Spotify",
            location: "New York, NY",
            salary: "₹100k - ₹130k",
            type: "Contract",
            posted: "3 days ago",
            description:
              "We need a skilled Backend Developer with experience in Node.js, Express, and MongoDB. You'll be responsible for building and maintaining our API services and database architecture.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png",
            isRemote: false,
            skills: ["Node.js", "Express", "MongoDB", "API Design", "AWS"],
          },
        ];
        setJobs(defaultJobs);
        setFilteredJobs(defaultJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL]);

  // Fetch saved jobs
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `${API_URL}/api/job-seekers/saved-jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          // Extract job IDs from saved jobs
          const savedJobIds = response.data.data.map(
            (job) => job.id || job._id
          );
          setSavedJobs(savedJobIds);
        }
      } catch (err) {
        console.error("Error fetching saved jobs:", err);
        // No fallback needed as empty array is the default
      }
    };

    fetchSavedJobs();
  }, [API_URL]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/courses`);

        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        // Fallback to default data
        setCourses([
          {
            id: 1,
            title: "Advanced React Patterns",
            instructor: "Jane Doe",
            duration: "8 weeks",
            rating: 4.8,
            students: 1200,
            image:
              "https://img-c.udemycdn.com/course/240x135/2018828_41a9_3.jpg",
            price: "₹89.99",
            enrolled: false,
          },
          {
            id: 2,
            title: "Figma UI UX Design Essentials",
            instructor: "John Smith",
            duration: "6 weeks",
            rating: 4.6,
            students: 850,
            image:
              "https://img-c.udemycdn.com/course/480x270/4359576_b9e1_2.jpg",
            price: "₹69.99",
            enrolled: false,
          },
          {
            id: 3,
            title: "Node.js Backend Mastery",
            instructor: "Alex Johnson",
            duration: "10 weeks",
            rating: 4.9,
            students: 2100,
            image:
              "https://img-c.udemycdn.com/course/240x135/1672410_9ff1_5.jpg",
            price: "₹99.99",
            enrolled: false,
          },
        ]);
      }
    };

    fetchCourses();
  }, [API_URL]);

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/companies`);

        if (response.data.success) {
          setCompanies(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        // Fallback to default data
        setCompanies([
          {
            id: 1,
            name: "Google",
            industry: "Technology",
            openings: 15,
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            following: false,
          },
          {
            id: 2,
            name: "Microsoft",
            industry: "Technology",
            openings: 8,
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
            following: false,
          },
          {
            id: 3,
            name: "Amazon",
            industry: "E-commerce",
            openings: 12,
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
            following: false,
          },
        ]);
      }
    };

    fetchCompanies();
  }, [API_URL]);

  // Fetch network people suggestions
  useEffect(() => {
    const fetchPeopleSuggestions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(`${API_URL}/api/network/suggestions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setPeople(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching people suggestions:", err);
        // Fallback data
        setPeople([
          {
            id: 1,
            name: "John Smith",
            role: "Senior Developer",
            company: "Microsoft",
            avatar: "https://randomuser.me/api/portraits/men/42.jpg",
            connections: 500,
            connected: false,
          },
          {
            id: 2,
            name: "Sarah Johnson",
            role: "Product Manager",
            company: "Google",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            connections: 350,
            connected: false,
          },
          {
            id: 3,
            name: "Michael Brown",
            role: "UX Designer",
            company: "Apple",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            connections: 420,
            connected: false,
          },
        ]);
      }
    };

    fetchPeopleSuggestions();
  }, [API_URL]);

  // Fetch top hires
  useEffect(() => {
    const fetchTopHires = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/top-hires`);

        if (response.data.success) {
          setTopHires(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching top hires:", err);
        // Fallback data
        setTopHires([
          {
            id: 1,
            name: "Alice Johnson",
            role: "Full Stack Developer",
            company: "Amazon",
            salary: "₹140k/year",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
          },
          {
            id: 2,
            name: "Robert Davis",
            role: "Data Scientist",
            company: "Netflix",
            salary: "₹160k/year",
            avatar: "https://randomuser.me/api/portraits/men/91.jpg",
          },
          {
            id: 3,
            name: "Emily Wilson",
            role: "Product Designer",
            company: "Airbnb",
            salary: "₹125k/year",
            avatar: "https://randomuser.me/api/portraits/women/12.jpg",
          },
        ]);
      }
    };

    fetchTopHires();
  }, [API_URL]);

  // Handle search and filtering
  useEffect(() => {
    let results = jobs;

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply location filter
    if (filters.location) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply job type filter
    if (filters.jobType) {
      results = results.filter(
        (job) => job.type.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    // Apply remote filter
    if (filters.remote) {
      results = results.filter((job) => job.isRemote);
    }

    // Apply sorting
    if (sortOption === "date") {
      // Sort by most recent (this is simplified since we don't have actual dates)
      results = [...results].sort((a, b) => {
        if (a.posted.includes("day") && b.posted.includes("week")) return -1;
        if (a.posted.includes("week") && b.posted.includes("day")) return 1;
        return 0;
      });
    } else if (sortOption === "salary") {
      // Sort by highest salary (simplified)
      results = [...results].sort((a, b) => {
        const aValue = parseInt(a.salary.replace(/[^0-9]/g, ""));
        const bValue = parseInt(b.salary.replace(/[^0-9]/g, ""));
        return bValue - aValue;
      });
    }

    setFilteredJobs(results);
  }, [searchTerm, filters, sortOption, jobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      if (savedJobs.includes(jobId)) {
        // Unsave job
        await axios.delete(`${API_URL}/api/job-seekers/saved-jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSavedJobs(savedJobs.filter((id) => id !== jobId));
      } else {
        // Save job
        await axios.post(
          `${API_URL}/api/job-seekers/saved-jobs`,
          { jobId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setSavedJobs([...savedJobs, jobId]);
      }
    } catch (err) {
      console.error("Error saving/unsaving job:", err);
      alert("Failed to save job. Please try again.");

      // Fallback - just toggle locally if API fails
      if (savedJobs.includes(jobId)) {
        setSavedJobs(savedJobs.filter((id) => id !== jobId));
      } else {
        setSavedJobs([...savedJobs, jobId]);
      }
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        `${API_URL}/api/job-seekers/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Application submitted successfully!");
        // In a real app, you might want to update the UI to reflect the application
        // For example, changing the "Apply" button to "Applied"
      } else {
        throw new Error(response.data.message || "Failed to apply for job");
      }
    } catch (err) {
      console.error("Error applying for job:", err);
      alert(`Application failed: ${err.message || "Please try again later."}`);
    }
  };

  const handleEnrollCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        `${API_URL}/api/courses/enroll/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Enrolled in course successfully!");
        // Update course status locally
        const updatedCourses = courses.map((course) =>
          course.id === courseId ? { ...course, enrolled: true } : course
        );
        setCourses(updatedCourses);
      } else {
        throw new Error(response.data.message || "Failed to enroll in course");
      }
    } catch (err) {
      console.error("Error enrolling in course:", err);
      alert(`Enrollment failed: ${err.message || "Please try again later."}`);
    }
  };

  const handleConnectPerson = async (personId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const person = people.find((p) => p.id === personId);

      if (person.connected) {
        // Disconnect
        await axios.delete(`${API_URL}/api/network/connections/${personId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Connect
        await axios.post(
          `${API_URL}/api/network/connections`,
          { personId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Update status locally
      const updatedPeople = people.map((p) =>
        p.id === personId ? { ...p, connected: !p.connected } : p
      );
      setPeople(updatedPeople);

      alert(
        `${
          person.connected ? "Disconnected from" : "Connection request sent to"
        } ${person.name}!`
      );
    } catch (err) {
      console.error("Error connecting with person:", err);
      alert("Connection request failed. Please try again.");
    }
  };

  const handleFollowCompany = async (companyId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const company = companies.find((c) => c.id === companyId);

      if (company.following) {
        // Unfollow
        await axios.delete(`${API_URL}/api/companies/follow/${companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Follow
        await axios.post(
          `${API_URL}/api/companies/follow/${companyId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Update status locally
      const updatedCompanies = companies.map((c) =>
        c.id === companyId ? { ...c, following: !c.following } : c
      );
      setCompanies(updatedCompanies);

      alert(
        `${company.following ? "Unfollowed" : "Now following"} ${company.name}!`
      );
    } catch (err) {
      console.error("Error following company:", err);
      alert("Failed to update following status. Please try again.");
    }
  };

  const handleMobileAction = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  if (loading) {
    return <div className="loading-container">Loading job feed data...</div>;
  }

  return (
    <div>
      <div className="feed-container">
        {/* Left Sidebar */}
        <div className="feed-sidebar">
          <ProfileLink userProfile={userProfile} />
          {/* Recommended Courses Section */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3>Recommended Courses</h3>
              <Link to="/courses" className="view-all">
                View All
              </Link>
            </div>
            <div className="course-list">
              {courses.map((course) => (
                <div key={course.id} className="course-card">
                  <img src={course.image} alt={course.title} />
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p>{course.instructor}</p>
                    <div className="course-meta">
                      <span>⭐ {course.rating}</span>
                      <span>👥 {course.students}</span>
                    </div>
                    <button
                      className={`enroll-button ${
                        course.enrolled ? "enrolled" : ""
                      }`}
                      onClick={() => handleEnrollCourse(course.id)}
                    >
                      {course.enrolled ? "Enrolled" : course.price}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Top Companies Section */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3>Top Companies</h3>
              <Link to="/companies" className="view-all">
                View All
              </Link>
            </div>
            <div className="company-list">
              {companies.map((company) => (
                <div key={company.id} className="company-card">
                  <img src={company.logo} alt={company.name} />
                  <div className="company-info">
                    <h4>{company.name}</h4>
                    <p>{company.industry}</p>
                    <div className="hiring-badge">
                      {company.openings} openings
                    </div>
                    <button
                      className={`follow-button ${
                        company.following ? "following" : ""
                      }`}
                      onClick={() => handleFollowCompany(company.id)}
                    >
                      {company.following ? "Following" : "Follow"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Premium Section */}
          <div className="sidebar-section premium-section">
            <h3>Unlock Premium Features</h3>
            <ul>
              <li>See who viewed your profile</li>
              <li>Access advanced job insights</li>
              <li>Priority application status</li>
              <li>Exclusive learning resources</li>
            </ul>
            <button className="upgrade-button">Upgrade Now</button>
          </div>
        </div>
        {/* Main Content */}
        <div className="feed-main">
          {/* Search Section */}
          <div className="search-section">
            <form className="search-bar" onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search jobs, companies, or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
            <div className="filter-toggle">
              <button onClick={toggleFilters} className="filter-button">
                {showFilters ? "Hide Filters" : "Show Filters"} 🔍
              </button>
            </div>
            {showFilters && (
              <div className="filters-container">
                <div className="filter-group">
                  <label htmlFor="location">Location:</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="City, State, or Remote"
                    value={filters.location}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="filter-group">
                  <label htmlFor="jobType">Job Type:</label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={filters.jobType}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="filter-group checkbox-group">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      name="remote"
                      checked={filters.remote}
                      onChange={handleFilterChange}
                    />
                    <span>Remote Only</span>
                  </label>
                </div>
                <button
                  className="clear-filters-button"
                  onClick={() =>
                    setFilters({
                      location: "",
                      jobType: "",
                      salary: "",
                      remote: false,
                    })
                  }
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          {/* Featured Course */}
          <div className="featured-course">
            <img
              src="https://nxtshiksha.com/wp-content/uploads/2024/11/4.webp"
              alt="Featured course"
            />
            <div className="featured-content">
              <h2>The Complete Full-Stack Web Development Bootcamp</h2>
              <p>
                Learn React, Node.js, and Modern JavaScript from industry
                experts. Start building professional web applications today!
              </p>
              <button
                className="apply-button"
                onClick={() => handleEnrollCourse(0)}
              >
                Enroll Now
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="feed-header">
            <h2>Recommended Jobs</h2>
            <div className="feed-sort">
              <label htmlFor="sort-jobs">Sort by:</label>
              <select
                id="sort-jobs"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date Posted</option>
                <option value="salary">Salary</option>
              </select>
            </div>
          </div>

          <div className="jobs-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-card-header">
                    <img src={job.logo} alt={job.company} />
                    <div>
                      <h3>{job.title}</h3>
                      <p>{job.company}</p>
                    </div>
                  </div>
                  <div className="job-details">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>💰 {job.salary}</span>
                    <span>⏱️ Posted {job.posted}</span>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <div className="job-skills">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="job-actions">
                    <button
                      className="apply-button"
                      onClick={() => handleApplyJob(job.id)}
                    >
                      Apply Now
                    </button>
                    <button
                      className={`save-button ${
                        savedJobs.includes(job.id) ? "saved" : ""
                      }`}
                      onClick={() => handleSaveJob(job.id)}
                    >
                      {savedJobs.includes(job.id) ? "🔖 Saved" : "🔖 Save"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>
                  No jobs match your search criteria. Try adjusting your
                  filters.
                </p>
                <button
                  className="clear-filters-button"
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      location: "",
                      jobType: "",
                      salary: "",
                      remote: false,
                    });
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="activity-sidebar">
          {/* Top Hires Section */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3>Top Hires This Week</h3>
              <Link to="/top-hires" className="view-all">
                View All
              </Link>
            </div>
            <div className="top-hires-list">
              {topHires.map((hire) => (
                <div key={hire.id} className="top-hire-card">
                  <img src={hire.avatar} alt={hire.name} />
                  <div className="hire-info">
                    <h4>{hire.name}</h4>
                    <p>{hire.role}</p>
                    <p>{hire.company}</p>
                    <span className="salary">{hire.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Courses Section */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3>Trending Courses</h3>
              <Link to="/top-courses" className="view-all">
                View All
              </Link>
            </div>
            <div className="trending-courses-list">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="trending-course-card">
                  <img src={course.image} alt={course.title} />
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p>{course.instructor}</p>
                    <div className="course-meta">
                      <span>⭐ {course.rating}</span>
                      <span>• {course.duration}</span>
                    </div>
                    <button
                      className="mini-enroll-button"
                      onClick={() => handleEnrollCourse(course.id)}
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Active Recruiters */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3>Most Active Recruiters</h3>
              <Link to="/recruiters" className="view-all">
                View All
              </Link>
            </div>
            <div className="top-recruiters-list">
              {companies.slice(0, 3).map((company) => (
                <div key={company.id} className="recruiter-card">
                  <img src={company.logo} alt={company.name} />
                  <div className="recruiter-info">
                    <h4>{company.name}</h4>
                    <p>{company.industry}</p>
                    <div className="hiring-badge">
                      {company.openings} positions
                    </div>
                    <button
                      className="mini-follow-button"
                      onClick={() => handleFollowCompany(company.id)}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <div className="mobile-nav-links">
          <Link to="/feed" className="mobile-nav-link active">
            <span className="mobile-nav-icon">🏠</span>
            <span>Feed</span>
          </Link>
          <Link to="/search" className="mobile-nav-link">
            <span className="mobile-nav-icon">🔍</span>
            <span>Search</span>
          </Link>
          <Link to="/messages" className="mobile-nav-link">
            <span className="mobile-nav-icon">💬</span>
            <span>Messages</span>
          </Link>
          <Link to="/notifications" className="mobile-nav-link">
            <span className="mobile-nav-icon">🔔</span>
            <span>Notifications</span>
          </Link>
          <Link to="/profile" className="mobile-nav-link">
            <span className="mobile-nav-icon">👤</span>
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerFeed;
