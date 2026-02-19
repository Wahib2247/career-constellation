import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
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
      // EmailJS integration (configure with your service/template IDs)
      // await emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formRef.current, "YOUR_PUBLIC_KEY");
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1200));
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", type: "collaboration" });
    } catch {
      setStatus("error");
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "wahib@career-constellation.edu", // Update with your actual email
      href: "mailto:wahib@career-constellation.edu",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: "LinkedIn",
      value: "linkedin.com/in/wahib-researcher", // Update with your actual profile
      href: "https://linkedin.com",
    },
  ];

  const inquiryTypes = [
    { value: "collaboration", label: "Research Collaboration" },
    { value: "pilot", label: "Institutional Pilot" },
    { value: "governance", label: "Governance Consultation" },
    { value: "partnership", label: "Research Partnership" },
    { value: "general", label: "General Inquiry" },
  ];

  return (
    <main className="bg-paper-cool min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-100 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <FadeIn>
            <span className="section-label">Contact</span>
            <h1
              className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-6 max-w-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Open a Channel
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
              Research partnerships, institutional pilots, governance consultations, and co-design opportunities. If you're working on education equity or governance innovation, let's connect.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact methods */}
            <div className="space-y-10">
              <FadeIn>
                <h2
                  className="text-xl font-bold text-slate-900 mb-8"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Direct Contact
                </h2>
                <div className="space-y-8">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-institutional hover:shadow-institutional-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                        {method.icon}
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-1">{method.label}</div>
                        <div className="text-sm font-bold text-slate-800">{method.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="bg-slate-900 text-white rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">Open for Collaboration</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Currently seeking research partners for longitudinal governance studies and institutional pilots for ClassFusion.
                  </p>
                  <div className="space-y-2">
                    {["Research Partnerships", "Institutional Pilots", "Governance Consulting", "Co-design Projects"].map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
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
                <div className="bg-white rounded-2xl border border-slate-100 shadow-institutional p-8">
                  <h2
                    className="text-xl font-bold text-slate-900 mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Send a Message
                  </h2>

                  {status === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent</h3>
                      <p className="text-slate-600">Thank you for reaching out. I'll respond within 48 hours.</p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 btn-secondary"
                      >
                        Send Another
                      </button>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                      {/* Inquiry type */}
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
                          Inquiry Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {inquiryTypes.map(type => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setForm(prev => ({ ...prev, type: type.value }))}
                              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${form.type === type.value
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                                }`}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          placeholder="What's this about?"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder="Describe your project, research question, or collaboration idea..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {status === "sending" ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </>
                        )}
                      </button>

                      {status === "error" && (
                        <p className="text-sm text-red-600 text-center">
                          Something went wrong. Please email directly at wahib@career-constellation.edu
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
