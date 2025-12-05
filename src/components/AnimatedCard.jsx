import { forwardRef } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const AnimatedCard = forwardRef(({ children, index, className = "", ...props }, ref) => {
  const [cardRef, cardVisible] = useScrollAnimation({ threshold: 0.1 });
  const finalRef = ref || cardRef;

  return (
    <div
      ref={finalRef}
      className={`${className} ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;

