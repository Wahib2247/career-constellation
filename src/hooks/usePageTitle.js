import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/': 'Wahib | Portfolio',
  '/about': 'About Wahib | The Story Behind the Screen',
  '/projects': 'Projects | Where Magic Happens (Literally)',
  '/contact': 'Contact Wahib | Let\'s Make Something Awesome Together!',
  '/magictask': 'MagicTask | MCARS Theme Deep Dive',
};

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if it's a project detail page
    if (location.pathname.startsWith('/projects/')) {
      const projectSlug = location.pathname.split('/projects/')[1];
      const projectName = projectSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      document.title = `${projectName} | Project Deep Dive`;
    } else {
      // Use the predefined title or a default
      document.title = pageTitles[location.pathname] || 'Wahib | Portfolio';
    }
  }, [location.pathname]);
};

export default usePageTitle;
