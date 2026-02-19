import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Footer, Navbar, Chatbot } from "./components";
import { About, Contact, Home, ProjectDetail } from "./pages";
import InstitutionalProjects from "./pages/InstitutionalProjects";
import GovernanceLab from "./pages/GovernanceLab";
import Research from "./pages/Research";
import PilotReports from "./pages/PilotReports";
import Prototypes from "./pages/Prototypes";
import Reflections from "./pages/Reflections";
import Investments from "./pages/Investments";
import InvestmentDetail from "./pages/InvestmentDetail";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Define navigation links for the Navbar
  const navLinks = [
    { to: "/projects", label: "Projects" },
    { to: "/governance", label: "Governance Lab" },
    { to: "/investments", label: "Capital Allocation" },
    { to: "/research", label: "Research" },
    { to: "/pilots", label: "Pilots" },
    { to: "/reflections", label: "Reflections" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const pageTitles = {
      "/": "Wahib | Research Lab",
      "/projects": "Wahib | Institutional Projects",
      "/governance": "Wahib | Governance Lab",
      "/research": "Wahib | Research & Whitepapers",
      "/pilots": "Wahib | Pilot Reports",
      "/prototypes": "Wahib | Prototypes",
      "/reflections": "Wahib | Reflections",
      "/about": "Wahib | About",
      "/contact": "Wahib | Contact",
      "/investments": "Wahib | Capital Allocation Lab",
    };

    if (location.pathname.startsWith("/projects/")) {
      // Title will be handled inside ProjectDetail if possible, 
      // but as a fallback:
      document.title = "Wahib | Project Detail";
    } else {
      document.title = pageTitles[location.pathname] || "Wahib | Research Lab";
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<InstitutionalProjects />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
        <Route path="/governance" element={<GovernanceLab />} />
        <Route path="/research" element={<Research />} />
        <Route path="/pilots" element={<PilotReports />} />
        <Route path="/prototypes" element={<Prototypes />} />
        <Route path="/reflections" element={<Reflections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/investments/:investmentId" element={<InvestmentDetail />} />
      </Routes>
      <Footer />
      <Chatbot />
    </>
  );
};

const App = () => {
  return (
    <main className="bg-paper-cool">
      <Router>
        <AppContent />
      </Router>
    </main>
  );
};

export default App;
