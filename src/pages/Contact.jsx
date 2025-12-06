import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  // Load saved user details from chatbot session
  useEffect(() => {
    const savedUser = localStorage.getItem('wahib_portfolio_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setForm(prev => ({
          ...prev,
          name: user.name || prev.name,
          email: user.email || prev.email
        }));
      } catch (e) {
        console.error("Error loading saved user details:", e);
      }
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");
  const handleMouseEnter = () => setCurrentAnimation("walk");
  const handleMouseLeave = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim()) {
      showAlert({
        show: true,
        text: "Please enter your name",
        type: "danger",
      });
      setTimeout(() => hideAlert(false), 3000);
      return;
    }
    
    if (!form.email.trim() || !form.email.includes('@')) {
      showAlert({
        show: true,
        text: "Please enter a valid email address",
        type: "danger",
      });
      setTimeout(() => hideAlert(false), 3000);
      return;
    }
    
    if (!form.message.trim()) {
      showAlert({
        show: true,
        text: "Please enter your message",
        type: "danger",
      });
      setTimeout(() => hideAlert(false), 3000);
      return;
    }
    
    if (form.message.length > 2000) {
      showAlert({
        show: true,
        text: "Message is too long. Please keep it under 2000 characters",
        type: "danger",
      });
      setTimeout(() => hideAlert(false), 3000);
      return;
    }

    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID2,
        {
          from_name: form.name.trim(),
          to_name: "Wahib",
          from_email: form.email.trim(),
          to_email: "wahibb07@gmail.com",
          message: form.message.trim(),
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setCurrentAnimation("idle");
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: form.name, // Keep name and email for convenience
              email: form.email,
              message: "",
            });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          setCurrentAnimation("idle");
          console.error("EmailJS error:", error);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢. Please try again or email directly at wahibb07@gmail.com",
            type: "danger",
          });
          setTimeout(() => hideAlert(false), 5000);
        }
      );
  };

  return (
    <section className='relative max-w-5xl mx-auto sm:p-16 pb-12 !pt-[126px] px-8 min-h-[calc(100vh-80px)]'>
      {alert.show && <Alert {...alert} />}

      <div className='flex flex-col lg:flex-row gap-12 items-start'>
        {/* Left Section - Form */}
        <div className='flex-1 w-full animate-fadeIn'>
          <div className='mb-8'>
            <h1 className='sm:text-5xl text-3xl font-semibold sm:leading-snug font-poppins mb-3 animate-slideInLeft'>
              Let's <span className='bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent'>Connect</span>
            </h1>
            <p className='text-slate-600 leading-relaxed animate-slideInLeft' style={{ animationDelay: '0.1s' }}>
              I'm always open to academic discussions, research collaborations, and meaningful conversations. 
              Whether you're interested in my work, have a collaboration idea, or just want to explore ideas together, 
              I'd love to hear from you.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='w-full space-y-6'
          >
            <div className='space-y-2 animate-fadeInUp' style={{ animationDelay: '0.2s' }}>
              <label htmlFor='name' className='block text-sm font-semibold text-slate-700'>
                Your Name
              </label>
              <input
                id='name'
                type='text'
                name='name'
                className='w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 focus:shadow-md outline-none'
                placeholder='Enter your name'
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div className='space-y-2 animate-fadeInUp' style={{ animationDelay: '0.3s' }}>
              <label htmlFor='email' className='block text-sm font-semibold text-slate-700'>
                Email Address
              </label>
              <input
                id='email'
                type='email'
                name='email'
                className='w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 focus:shadow-md outline-none'
                placeholder='your.email@example.com'
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div className='space-y-2 animate-fadeInUp' style={{ animationDelay: '0.4s' }}>
              <label htmlFor='message' className='block text-sm font-semibold text-slate-700'>
                Your Message
              </label>
              <textarea
                id='message'
                name='message'
                rows='6'
                className='w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 focus:shadow-md resize-none outline-none'
                placeholder='Share your thoughts, questions, or collaboration ideas...'
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <p className='text-xs text-slate-500'>
                {form.message.length}/2000 characters
              </p>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='group relative w-full sm:w-auto px-8 py-3 text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff] font-semibold rounded-xl focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <span className='absolute inset-0 bg-gradient-to-r from-[#0072ff] to-[#00c6ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
              <span className='relative z-10 flex items-center justify-center gap-2'>
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-5 h-5 svg-wrapper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Alternative Contact Info */}
          <div className='mt-8 p-6 bg-blue-50/50 border border-blue-200/50 rounded-xl animate-fadeInUp' style={{ animationDelay: '0.5s' }}>
            <p className='text-sm text-slate-600 mb-2'>
              <strong className='text-slate-800'>Prefer email directly?</strong>
            </p>
            <a 
              href='mailto:wahibb07@gmail.com' 
              className='text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2 transition-colors duration-300 hover:gap-3'
            >
              wahibb07@gmail.com
              <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Section - 3D Model */}
        <div className='lg:w-1/2 w-full lg:h-[600px] md:h-[500px] h-[400px] lg:sticky lg:top-24 animate-fadeInRight'>
          <div className='relative w-full h-full rounded-2xl overflow-hidden border border-slate-200/50 bg-gradient-to-br from-blue-50/50 to-slate-50/50 transition-shadow duration-300'>
            <Canvas
              camera={{
                position: [0, 0, 5],
                fov: 75,
                near: 0.1,
                far: 1000,
              }}
            >
              <directionalLight position={[0, 0, 1]} intensity={2.5} />
              <ambientLight intensity={1} />
              <pointLight position={[5, 10, 0]} intensity={2} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={2}
              />

              <Suspense fallback={<Loader />}>
                <Fox
                  currentAnimation={currentAnimation}
                  position={[0.5, 0.35, 0]}
                  rotation={[12.629, -0.6, 0]}
                  scale={[0.5, 0.5, 0.5]}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
