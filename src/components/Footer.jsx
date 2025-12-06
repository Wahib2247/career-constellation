import { Link } from "react-router-dom";

import { socialLinks } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='max-w-5xl mx-auto sm:px-16 pb-12 pt-8 px-8 font-poppins'>
      <hr className='border-slate-200 mb-8' />

      <div className='flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center justify-between'>
        {/* Left Section - About */}
        <div className='flex-1 space-y-3'>
          <h3 className='text-lg font-semibold text-slate-800 mb-2'>
            Life's Short, Nap's Eternal.
          </h3>
          <p className='text-sm text-slate-600 leading-relaxed max-w-md'>
            Always learning, always building, always thinking about systems that matter.
          </p>
          <p className='text-xs text-slate-500 mt-4'>
            © {currentYear} <strong className='text-slate-700'>Wahib</strong>. Academic Portfolio. 
            Built with curiosity and passion.
          </p>
        </div>

        {/* Right Section - Social Links */}
        <div className='flex flex-col gap-4'>
          <h4 className='text-sm font-semibold text-slate-700 mb-2'>Connect & Explore</h4>
          <div className='flex gap-3 justify-start items-center'>
            {socialLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.link} 
                target='_blank'
                rel='noopener noreferrer'
                className='group relative p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-blue-300/50'
              >
                <img
                  src={link.iconUrl}
                  alt={link.name}
                  className='w-5 h-5 md:w-6 md:h-6 object-contain group-hover:scale-110 transition-transform duration-300'
                />
                <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10 shadow-lg'>
                  {link.name}
                  <span className='absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800'></span>
                </span>
              </Link>
            ))}
          </div>
          <p className='text-xs text-slate-500 mt-2'>
            Open to academic discussions and collaborations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
