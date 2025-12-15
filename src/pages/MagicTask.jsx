import { Link } from "react-router-dom";
import { CTA } from "../components";
import { arrow } from "../assets/icons";

const MagicTask = () => {
  return (
    <section className='max-w-5xl mx-auto sm:p-16 pb-12 !pt-[126px] px-8 min-h-[calc(100vh-80px)]'>
      {/* Back Button */}
      <Link
        to='/about'
        className='inline-flex items-center gap-2 text-slate-100/80 hover:text-white transition-colors duration-300 mb-8 group'
      >
        <img
          src={arrow}
          alt='back'
          className='w-4 h-4 rotate-180 transform group-hover:-translate-x-1 transition-transform duration-300'
        />
        <span className='text-sm font-medium text-slate-500 hover:text-slate-400 transition-colors duration-300'>Back to About</span>
      </Link>

      {/* MCARS Gradient Header */}
        <div className='relative overflow-hidden rounded-3xl mb-10'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#ff6bcb] via-[#8b5cf6] to-[#22c55e] opacity-90' />
        <div className='absolute -inset-32 bg-[radial-gradient(circle_at_top,_#ffffff55,_transparent_60%),radial-gradient(circle_at_bottom,_#fde68a55,_transparent_60%)] mix-blend-screen opacity-80' />

        <div className='relative px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-start gap-8'>
          <div className='flex-1'>
            <p className='text-xs uppercase tracking-[0.2em] text-slate-100/80 mb-2'>Project Deep Dive</p>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-white mb-3'>
              MagicTask <span className='text-slate-100/90'>(MCARS Theme)</span>
            </h1>
            <p className='text-slate-100/90 max-w-xl text-sm md:text-base'>
              MagicTask is a gamified task management platform that transforms tasks into a visually engaging system of focus, rewards, and momentum. It uses a vibrant MCARS theme to create a playful yet productive experience.
            </p>
          </div>

          <div className='flex flex-col gap-3 bg-black/20 border border-white/30 rounded-2xl px-5 py-4 shadow-lg backdrop-blur-md'>
            <span className='text-[11px] font-semibold tracking-[0.18em] text-slate-100/70 uppercase'>
              Live Product
            </span>
            <a
              href='https://magictask.io'
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-amber-200 hover:translate-x-0.5 transition-all duration-300'
            >
              magictask.io
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </a>
            <p className='text-[11px] text-slate-100/80'>
              Internship Contribution / UI Styling / CSS Animations
            </p>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className='bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(15,23,42,0.12)] mb-10'>
        <div className='grid gap-8 md:grid-cols-2'>
          <div>
            <h2 className='text-xl font-semibold text-slate-900 mb-3 font-poppins'>What MagicTask Is</h2>
            <p className='text-sm text-slate-600 leading-relaxed mb-4'>
              MagicTask is a task management platform that applies behavioral design and gamification to help users stay focused and motivated. Its MCARS theme introduces a bold visual identity that makes productivity feel dynamic and immersive.
            </p>
            <p className='text-sm text-slate-600 leading-relaxed'>
              The platform blends color, motion, and layout to signal progress and priority — turning task completion into a rewarding experience.
            </p>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-slate-900 mb-3 font-poppins'>My Role at FastTech Pvt. Ltd.</h3>
            <ul className='space-y-2 text-sm text-slate-600'>
              <li className='flex items-start gap-2'>
                <span className='mt-1 w-1.5 h-1.5 rounded-full bg-amber-400'></span>
                <span>
                  Contributed as a front-end intern at Fast Tech Software House, working collaboratively within a team of designers and developers.
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='mt-1 w-1.5 h-1.5 rounded-full bg-sky-400'></span>
                <span>
                  Focused exclusively on advanced CSS styling and animation layers to enhance the MCARS theme — without altering core HTML or logic to preserve compatibility across themes.
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='mt-1 w-1.5 h-1.5 rounded-full bg-violet-400'></span>
                <span>
                  Applied responsive design principles and visual hierarchy to improve readability and user flow across devices.
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
                <span>
                  Gained hands-on experience working within constraints of a live production codebase, learning to adapt design ideas within real-world limitations.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Context / Fit */}
      <div className='bg-slate-900 text-slate-50 rounded-3xl p-8 md:p-10 mb-10 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#f97316,_transparent_60%),radial-gradient(circle_at_bottom,_#22c55e,_transparent_60%)]' />
        <div className='relative'>
          <h3 className='text-lg font-semibold mb-3 font-poppins'>What I Learned</h3>
          <p className='text-sm text-slate-100/90 leading-relaxed max-w-3xl mb-4'>
            This project helped me understand how thoughtful styling and animation can elevate user experience without altering core functionality. I learned how to collaborate in a professional development environment, respect design systems, and contribute meaningfully within scoped responsibilities.
          </p>
          <p className='text-sm text-slate-100/80 leading-relaxed max-w-3xl'>
            Working on MagicTask also deepened my appreciation for behavior-driven design and the power of visual storytelling in digital products.
          </p>
        </div>
      </div>

      <CTA />
    </section>
  );
};

export default MagicTask;
