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
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
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
    <section className='relative flex lg:flex-row flex-col max-w-5xl mx-auto sm:p-16 pb-12 !pt-[126px] px-8 min-h-[calc(100vh-80px)]'>
      {alert.show && <Alert {...alert} />}

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='sm:text-5xl text-3xl font-semibold sm:leading-snug font-poppins'>Academic & Research Inquiries</h1>
        <p className='text-slate-500 mt-2'>
          For research collaborations, academic discussions, or inquiries about my work,
          please use the form below. I welcome opportunities for interdisciplinary collaboration
          and scholarly exchange.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-7 mt-14'
        >
          <label className='text-black-500 font-semibold group'>
            Name
            <input
              type='text'
              name='name'
              className='bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-sm transition-all duration-300 hover:border-blue-300 focus:shadow-md'
              placeholder='John'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold group'>
            Email
            <input
              type='email'
              name='email'
              className='bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-sm transition-all duration-300 hover:border-blue-300 focus:shadow-md'
              placeholder='John@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold group'>
            Your Message
            <textarea
              name='message'
              rows='4'
              className='block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2.5 font-normal shadow-sm transition-all duration-300 hover:border-blue-300 focus:shadow-md resize-none'
              placeholder='Write your thoughts here...'
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='group relative text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden'
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <span className='absolute inset-0 bg-gradient-to-r from-[#0072ff] to-[#00c6ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
            <span className='relative z-10'>{loading ? "Sending..." : "Submit"}</span>
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
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
    </section>
  );
};

export default Contact;
