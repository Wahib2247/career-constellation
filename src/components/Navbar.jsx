import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/' className="group">
        <div className="relative bg-white w-14 h-14 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden">
          {/* Blue gradient W letter */}
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent group-hover:opacity-0 group-hover:scale-0 transition-all duration-300 z-10">
            W
          </span>
          {/* Full name on hover */}
          <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 whitespace-nowrap px-2">
            Wahib
          </span>
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/40 group-hover:to-blue-100/30 transition-all duration-300 rounded-xl pointer-events-none"></div>
        </div>
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink 
          to='/about' 
          className={({ isActive }) => 
            `transition-colors duration-200 ${
              isActive 
                ? "text-blue-600 font-semibold" 
                : "text-slate-700 hover:text-blue-500"
            }`
          }
        >
          About
        </NavLink>
        <NavLink 
          to='/projects' 
          className={({ isActive }) => 
            `transition-colors duration-200 ${
              isActive 
                ? "text-blue-600 font-semibold" 
                : "text-slate-700 hover:text-blue-500"
            }`
          }
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
