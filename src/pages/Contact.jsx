import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

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

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", type: "collaboration" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // EmailJS simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", type: "collaboration" });
    } catch {
      setStatus("error");
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Institutional_Email",
      value: "wahib@career-constellation.edu",
      href: "mailto:wahib@career-constellation.edu",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: "Professional_Network",
      value: "linkedin.com/in/wahib-researcher",
      href: "https://linkedin.com",
    },
  ];

  const inquiryTypes = [
    { value: "collaboration", label: "Research_Collaboration" },
    { value: "pilot", label: "Institutional_Pilot" },
    { value: "governance", label: "Governance_Consultation" },
    { value: "partnership", label: "Strategic_Partnership" },
    { value: "general", label: "General_Inquiry" },
  ];

  return (
    <main className="bg-paper min-h-screen relative selection:bg-ink selection:text-paper overflow-hidden font-sans">
      <MeshBackground />

      {/* Header */}
      <section className="relative pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <FadeIn>
            <span className="section-label group cursor-default">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" />
                Connection_Nodes // External_Communication
            </span>
            <h1
              className="text-6xl sm:text-9xl font-black text-ink mt-8 mb-12 tracking-tighter leading-[0.85]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Contact <br />
              <span className="italic text-ink/20">Establish_Link</span>.
            </h1>
            <p className="text-2xl text-ink/60 leading-relaxed mb-12 italic border-l border-ink/[0.08] pl-8 font-medium max-w-3xl">
              Research partnerships, institutional pilots, governance consultations, and co-design opportunities. If you're working on education equity or governance innovation, let's connect.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact methods */}
            <div className="space-y-8">
              <FadeIn>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/30 mb-8 italic font-mono">// Primary_Channels</div>
                <div className="space-y-6">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="bento-item bg-white border-ink/[0.08] p-8 flex items-center gap-6 group hover:translate-x-2 transition-all duration-700 block"
                    >
                      <div className="w-14 h-14 bg-paper rounded-2xl flex items-center justify-center text-ink/50 group-hover:bg-ink group-hover:text-paper transition-all duration-700 shadow-sm group-hover:shadow-2xl">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-[9px] uppercase tracking-[0.3em] text-ink/50 font-black mb-2 italic">{method.label}</div>
                        <div className="text-sm font-bold text-ink tracking-tight">{method.value}</div>
                      </div>
                      <div className="text-ink/40 group-hover:text-ink transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="bento-item bg-ink text-paper p-10 hover:shadow-2xl transition-all duration-700 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.05] blur-3xl" />
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-paper/40 italic">Lab_Status: Receptive</span>
                  </div>
                  <p className="text-paper/60 text-lg leading-snug italic font-medium mb-12">
                    Currently seeking research partners for longitudinal governance studies and institutional pilots for ClassFusion.
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {["Research Partnerships", "Institutional Pilots", "Governance Consulting", "Co-design Projects"].map(item => (
                      <div key={item} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-paper/60 group-hover:text-paper/40 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-paper/10" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <div className="bento-item bg-white border-ink/[0.08] p-12 group hover:shadow-2xl transition-all duration-700">
                  <div className="flex items-center justify-between mb-16 underline decoration-ink/5 underline-offset-[16px]">
                    <h2
                        className="text-4xl font-black text-ink tracking-tighter"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Communication_Interface
                    </h2>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/55 italic font-mono">v1.2 // PROTOCOL_STABLE</div>
                  </div>

                  {status === "success" ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24"
                    >
                      <div className="w-24 h-24 bg-emerald-100/50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner group-hover:scale-110 transition-transform duration-700">
                        <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-4xl font-black text-ink mb-6 tracking-tighter italic font-serif">Transmission Succesful.</h3>
                      <p className="text-ink/40 text-lg italic font-medium mb-12 max-w-md mx-auto leading-tight">Thank you for reaching out. Your inquiry has been logged in our central archive. Response expected within 48 cycles.</p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="px-10 py-5 bg-ink text-paper rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-xl"
                      >
                        RE_INITIALIZE_CHANNEL
                      </button>
                    </motion.div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                      {/* Inquiry type */}
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-6 italic">
                          // Select_Inquiry_Vector
                        </label>
                        <div className="flex flex-wrap gap-4">
                          {inquiryTypes.map(type => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setForm(prev => ({ ...prev, type: type.value }))}
                              className={`text-[10px] px-6 py-3 rounded-xl border font-black tracking-widest transition-all duration-500 uppercase ${form.type === type.value
                                ? "bg-ink text-paper border-ink shadow-2xl"
                                : "bg-white text-ink/30 border-ink/[0.08] hover:border-ink/20"
                                }`}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="space-y-2">
                          <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 italic">
                            Personnel_Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe // Org_Name"
                            className="w-full bg-paper/50 px-6 py-5 rounded-2xl border border-ink/[0.08] text-sm font-bold text-ink placeholder:text-ink/35 focus:outline-none focus:bg-white focus:border-ink/20 focus:shadow-2xl transition-all duration-500 italic"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 italic">
                            Comm_Endpoint
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="agency@institutional.network"
                            className="w-full bg-paper/50 px-6 py-5 rounded-2xl border border-ink/[0.08] text-sm font-bold text-ink placeholder:text-ink/35 focus:outline-none focus:bg-white focus:border-ink/20 focus:shadow-2xl transition-all duration-500 italic"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 italic">
                          Subject_Identifier
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          placeholder="CORE_INITIATIVE // Pilot_Proposal"
                          className="w-full bg-paper/50 px-6 py-5 rounded-2xl border border-ink/[0.08] text-sm font-bold text-ink placeholder:text-ink/35 focus:outline-none focus:bg-white focus:border-ink/20 focus:shadow-2xl transition-all duration-500 italic"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 italic">
                          Payload_Description
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder="Describe your project, research question, or collaboration idea with technical precision..."
                          className="w-full bg-paper/50 px-6 py-5 rounded-2xl border border-ink/[0.08] text-sm font-bold text-ink placeholder:text-ink/35 focus:outline-none focus:bg-white focus:border-ink/20 focus:shadow-2xl transition-all duration-500 italic resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full py-6 bg-ink text-paper rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-60 flex items-center justify-center gap-6 shadow-2xl relative overflow-hidden group/btn"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                        {status === "sending" ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            ULPOADING_PAYLOAD...
                          </>
                        ) : (
                          <>
                            ESTABLISH_LINK
                            <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </>
                        )}
                      </button>

                      {status === "error" && (
                        <p className="text-[10px] font-black tracking-widest text-red-600 text-center uppercase">
                          Transmission_Signal_Interrupted. Route directly to: wahib@career-constellation.edu
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
