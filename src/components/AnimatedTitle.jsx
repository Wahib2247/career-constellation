import { forwardRef } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const AnimatedTitle = forwardRef(({ children, className = "", ...props }, ref) => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const finalRef = ref || titleRef;

  return (
    <h3
      ref={finalRef}
      className={`${className} inline-block`}
      {...props}
    >
      <span className='relative inline-block bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent'>
        {children}
        <span 
          className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] transition-all duration-700 ${titleVisible ? 'w-full' : 'w-0'}`}
        ></span>
      </span>
    </h3>
  );
});

AnimatedTitle.displayName = 'AnimatedTitle';

export default AnimatedTitle;

