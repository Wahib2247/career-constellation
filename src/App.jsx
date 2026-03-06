import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
import MagicTask from "./pages/MagicTask";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><InstitutionalProjects /></PageTransition>} />
          <Route path="/projects/magictask" element={<PageTransition><MagicTask /></PageTransition>} />
          <Route path="/projects/:projectSlug" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/governance" element={<PageTransition><GovernanceLab /></PageTransition>} />
          <Route path="/research" element={<PageTransition><Research /></PageTransition>} />
          <Route path="/pilots" element={<PageTransition><PilotReports /></PageTransition>} />
          <Route path="/prototypes" element={<PageTransition><Prototypes /></PageTransition>} />
          <Route path="/reflections" element={<PageTransition><Reflections /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/investments" element={<PageTransition><Investments /></PageTransition>} />
          <Route path="/investments/:investmentId" element={<PageTransition><InvestmentDetail /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Chatbot />
    </>
  );
};

const App = () => {
  return (
    <main className="bg-paper min-h-screen bg-institutional-grid font-sans selection:bg-ink selection:text-paper">
      <Router>
        <AppContent />
      </Router>
    </main>
  );
};

export default App;
