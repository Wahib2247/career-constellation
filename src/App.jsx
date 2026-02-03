import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Footer, Navbar, Chatbot } from "./components";
import { About, Contact, Home, Projects, ProjectDetail, MagicTask } from "./pages";
import usePageTitle from "./hooks/usePageTitle";

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Use 'instant' for immediate scroll, 'smooth' for animated
    });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  usePageTitle();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/*'
          element={
            <>
              <Routes>
                <Route path='/about' element={<About />} />
                <Route path='/magictask' element={<MagicTask />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/projects/:projectSlug' element={<ProjectDetail />} />
                <Route path='/contact' element={<Contact />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
      <Chatbot />
    </>
  );
};

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <AppContent />
      </Router>
    </main>
  );
};

export default App;
