import { Link } from "react-router-dom";

import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className='max-w-5xl mx-auto sm:px-16 pb-6 px-8 flex flex-col gap-7 font-poppins'>
      <hr className='border-slate-200' />

      <div className='flex flex-wrap gap-7 items-center justify-between'>
        <p>
          © 2025 <strong>Wahib </strong>. Academic Portfolio. All rights reserved.
        </p>

        <div className='flex gap-3 justify-center items-center'>
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
      </div>
    </footer>
  );
};

export default Footer;
