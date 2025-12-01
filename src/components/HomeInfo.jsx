import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <>
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
          Hi, I'm
          <span className='font-semibold mx-2 text-white'>Wahib</span>
          👋
          <br />
          Researcher, systems thinker, and interdisciplinary scholar — exploring the intersection of technology and human behavior
          <p className='text-center text-sm text-gray-200 mt-2'>
            Use <span className='font-semibold'>← → arrow keys</span> or <span className='font-semibold'>drag..</span>
          </p>
        </h1>
      </>

    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Academic journey and research focus — <br /> explore my scholarly work and achievements
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Research-driven projects and applications — <br /> explore interdisciplinary work at the intersection of technology and social science.
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          View projects
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Interested in collaboration or research discussion? <br /> Let's connect and explore opportunities.
        </p>

        <Link to='/contact' className='neo-brutalism-white neo-btn'>
          Get in touch
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
