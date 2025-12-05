import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <>
        <h1 className='sm:text-xl sm:leading-snug text-center py-4 px-8 text-white mx-5 bg-[#2b77e7] relative rounded-[10px] border border-[#2b77e7]' style={{ boxShadow: '0.6vmin 0.6vmin #336cc1, 1vmin 1vmin #0092db, 1vmin 1vmin #0092db, 0.65vmin 1vmin #0092db, 1vmin 0.65vmin #0092db' }}>
          Hi, I'm
          <span className='font-semibold mx-2 text-white'>Wahib</span>
          👋
          <br />
          Learning through ideas — discovering how technology and human values can work together for better.
          <p className='text-center text-sm text-gray-200 mt-2'>
            Use <span className='font-semibold'>← → arrow keys</span> or <span className='font-semibold'>drag..</span>
          </p>
        </h1>
      </>

    );

  if (currentStage === 2) {
    return (
      <div className='mx-5 relative flex text-white flex-col gap-3 max-w-2xl bg-[#2b77e7] pt-4 pb-12 px-8 rounded-[10px] border border-[#2b77e7]' style={{ boxShadow: '0.6vmin 0.6vmin #336cc1, 1vmin 1vmin #0092db, 1vmin 1vmin #0092db, 0.65vmin 1vmin #0092db, 1vmin 0.65vmin #0092db' }}>
        <p className='font-medium sm:text-xl text-center'>
          Academic journey and research focus — <br /> sharing the lessons and progress along the way.
        </p>

        <Link to='/about' className='py-3 px-6 rounded-lg text-blue-500 text-center font-semibold sm:w-1/2 w-[90%] -bottom-5 absolute mx-auto right-0 left-0 flex justify-center items-center gap-3 bg-white border border-white' style={{ boxShadow: '0.6vmin 0.6vmin #fff, 1vmin 1vmin #d2e4ff, 1vmin 1vmin #d2e4ff, 0.65vmin 1vmin #d2e4ff, 1vmin 0.65vmin #d2e4ff' }}>
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='mx-5 relative flex text-white flex-col gap-3 max-w-2xl bg-[#2b77e7] pt-4 pb-12 px-8 rounded-[10px] border border-[#2b77e7]' style={{ boxShadow: '0.6vmin 0.6vmin #336cc1, 1vmin 1vmin #0092db, 1vmin 1vmin #0092db, 0.65vmin 1vmin #0092db, 1vmin 0.65vmin #0092db' }}>
        <p className='font-medium text-center sm:text-xl'>
          Explorations in progress — <br /> thoughts on technology, people, and the systems we live in
        </p>
        <Link to='/projects' className='py-3 px-6 rounded-lg text-blue-500 text-center font-semibold sm:w-1/2 w-[90%] -bottom-5 absolute mx-auto right-0 left-0 flex justify-center items-center gap-3 bg-white border border-white' style={{ boxShadow: '0.6vmin 0.6vmin #fff, 1vmin 1vmin #d2e4ff, 1vmin 1vmin #d2e4ff, 0.65vmin 1vmin #d2e4ff, 1vmin 0.65vmin #d2e4ff' }}>
          View projects
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='mx-5 relative flex text-white flex-col gap-3 max-w-2xl bg-[#2b77e7] pt-4 pb-12 px-8 rounded-[10px] border border-[#2b77e7]' style={{ boxShadow: '0.6vmin 0.6vmin #336cc1, 1vmin 1vmin #0092db, 1vmin 1vmin #0092db, 0.65vmin 1vmin #0092db, 1vmin 0.65vmin #0092db' }}>
        <p className='font-medium sm:text-xl text-center'>
          I'm always learning — <br /> your message, even a hi, can make a difference
        </p>

        <Link to='/contact' className='py-3 px-6 rounded-lg text-blue-500 text-center font-semibold sm:w-1/2 w-[90%] -bottom-5 absolute mx-auto right-0 left-0 flex justify-center items-center gap-3 bg-white border border-white' style={{ boxShadow: '0.6vmin 0.6vmin #fff, 1vmin 1vmin #d2e4ff, 1vmin 1vmin #d2e4ff, 0.65vmin 1vmin #d2e4ff, 1vmin 0.65vmin #d2e4ff' }}>
          Get in touch
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
