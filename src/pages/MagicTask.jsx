import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CTA } from "../components";
import { arrow } from "../assets/icons";

const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const MeshBackground = () => (
    <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
);

const MagicTask = () => {
  return (
    <main className="bg-paper min-h-screen relative selection:bg-ink selection:text-paper overflow-hidden font-sans">
      <MeshBackground />

      <section className="relative pt-40 pb-32 max-w-7xl mx-auto px-6 lg:px-12 z-10">
        {/* Back Button */}
        <FadeIn className="mb-16">
            <Link
                to='/projects'
                className='flex items-center gap-4 text-ink/40 hover:text-ink transition-all font-black text-[10px] uppercase tracking-[0.4em] group'
            >
                <svg className="w-4 h-4 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                RETURN_TO_ARCHIVE
            </Link>
        </FadeIn>

        {/* MCARS Gradient Header */}
        <FadeIn className='relative overflow-hidden rounded-[3rem] mb-20 shadow-2xl border border-ink/[0.08]'>
            <div className='absolute inset-0 bg-gradient-to-r from-[#ff6bcb] via-[#8b5cf6] to-[#22c55e] opacity-90' />
            <div className='absolute -inset-32 bg-[radial-gradient(circle_at_top,_#ffffff55,_transparent_60%),radial-gradient(circle_at_bottom,_#fde68a55,_transparent_60%)] mix-blend-screen opacity-80' />

            <div className='relative px-12 py-16 md:px-20 md:py-24 flex flex-col lg:flex-row items-center gap-16'>
                <div className='flex-1'>
                    <div className='text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-8 italic font-mono'>// Project_Deep_Dive</div>
                    <h1 className='text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]' style={{ fontFamily: "'Playfair Display', serif" }}>
                    MagicTask <br />
                    <span className='italic opacity-40 text-4xl md:text-6xl'>(MCARS_PROTOCOL)</span>.
                    </h1>
                    <p className='text-white/80 max-w-xl text-xl font-medium leading-tight italic'>
                    MagicTask is a gamified task management platform that transforms tasks into a visually engaging system of focus, rewards, and momentum.
                    </p>
                </div>

                <div className='flex flex-col gap-6 bg-black/20 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-3xl min-w-[320px]'>
                    <div className='flex items-center gap-3'>
                        <span className='w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.5)]' />
                        <span className='text-[10px] font-black tracking-[0.4em] text-white/60 uppercase italic'>
                        Live_Production_v2.0
                        </span>
                    </div>
                    <a
                    href='https://magictask.io'
                    target='_blank'
                    rel='noreferrer'
                    className='text-2xl font-black text-white hover:text-white/80 transition-all flex items-center justify-between group'
                    >
                    magictask.io
                    <svg className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    </a>
                    <div className='h-px bg-white/10 w-full' />
                    <p className='text-[10px] font-black uppercase tracking-[0.3em] text-white/40 leading-relaxed italic'>
                    Internship Contribution / UI Styling / CSS Animations / Behavioral Design
                    </p>
                </div>
            </div>
        </FadeIn>

        {/* Content Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20'>
            <FadeIn>
                <div className='bento-item bg-white border-ink/[0.08] p-16 h-full hover:shadow-2xl transition-all duration-700'>
                    <div className='text-[10px] font-black text-ink/50 mb-10 tracking-[0.4em] italic font-mono'>// Platform_Mission</div>
                    <h2 className='text-4xl font-black text-ink mb-8 tracking-tighter' style={{ fontFamily: "'Playfair Display', serif" }}>Product_Overview</h2>
                    <p className='text-xl text-ink/60 leading-relaxed italic font-medium'>
                        MagicTask is a task management platform that applies behavioral design and gamification to help users stay focused and motivated. Its MCARS theme introduces a bold visual identity that makes productivity feel dynamic and immersive. 
                        <br /><br />
                        The platform blends color, motion, and layout to signal progress and priority — turning task completion into a rewarding experience.
                    </p>
                </div>
            </FadeIn>

            <FadeIn delay={0.1}>
                <div className='bento-item bg-ink text-paper p-16 h-full hover:shadow-2xl transition-all duration-700 relative overflow-hidden group'>
                    <div className='absolute top-0 right-0 w-64 h-64 bg-white/[0.05] blur-3xl' />
                    <div className='text-[10px] font-black text-paper/60 mb-10 tracking-[0.4em] italic font-mono'>// Institutional_Role</div>
                    <h3 className='text-4xl font-black text-paper mb-8 tracking-tighter italic' style={{ fontFamily: "'Playfair Display', serif" }}>FastTech Residency</h3>
                    <ul className='space-y-8'>
                        {[
                            { color: "bg-amber-400", text: "Contributed as a front-end intern at Fast Tech Software House, working collaboratively within a team of strategic designers." },
                            { color: "bg-sky-400", text: "Focused exclusively on advanced CSS styling and animation layers to enhance the MCARS theme without altering core logic." },
                            { color: "bg-violet-400", text: "Applied responsive design principles and visual hierarchy to improve readability and user flow across high-density nodes." },
                            { color: "bg-emerald-400", text: "Gained hands-on experience working within constraints of a live production codebase and enterprise-scale systems." }
                        ].map((item, i) => (
                            <li key={i} className='flex items-start gap-6 group/item'>
                                <span className={`mt-2 w-2 h-2 rounded-full ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover/item:scale-150 transition-transform`} />
                                <span className="text-paper/60 text-lg leading-snug italic font-medium">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeIn>
        </div>

        {/* Outcome Card */}
        <FadeIn>
            <div className='bento-item bg-paper border-ink/[0.08] p-16 relative overflow-hidden group hover:shadow-2xl transition-all duration-700'>
                <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_#f97316,_transparent_60%),radial-gradient(circle_at_bottom,_#22c55e,_transparent_60%)] group-hover:opacity-20 transition-opacity duration-1000' />
                <div className='relative z-10'>
                    <div className='text-[10px] font-black text-ink/50 mb-8 tracking-[0.4em] italic font-mono'>// Analysis_Output</div>
                    <h3 className='text-5xl font-black text-ink mb-12 tracking-tighter' style={{ fontFamily: "'Playfair Display', serif" }}>Research Outcomes</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                        <p className='text-xl text-ink/40 leading-snug italic font-medium border-l border-ink/[0.08] pl-8'>
                            This project helped me understand how thoughtful styling and animation can elevate user experience without altering core functionality. I learned how to collaborate in a professional development environment.
                        </p>
                        <p className='text-xl text-ink/40 leading-snug italic font-medium border-l border-ink/[0.08] pl-8'>
                            Working on MagicTask also deepened my appreciation for behavior-driven design and the power of visual storytelling in high-stakes digital products.
                        </p>
                    </div>
                </div>
            </div>
        </FadeIn>

        <div className="mt-32">
            <CTA />
        </div>
      </section>
    </main>
  );
};

export default MagicTask;
