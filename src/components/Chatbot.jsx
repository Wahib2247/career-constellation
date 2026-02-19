import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { wahibKnowledge } from "../utils/wahibKnowledge";
import { generateIntelligentResponse } from "../utils/responseGenerator";
import { generateMLIntelligentResponse, recordUserFeedback, getLearningStats } from "../utils/mlResponseGenerator";
import { extractIntent } from "../utils/spellingHelper";

const TypewriterMessage = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 10);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <p className='text-[14px] leading-relaxed whitespace-pre-line font-medium'>{displayedText}</p>;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    organization: ""
  });
  const [showUserForm, setShowUserForm] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [sessionTimedOut, setSessionTimedOut] = useState(false);
  const [conversationLog, setConversationLog] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to the Lab's digital interface. 👋 I'm Wahib's AI counterpart—a research assistant design to help you navigate his work and explorations. Think of this as a shared inquiry: ask me about his projects, institutional architecture, or research philosophy.\n\nNote: To better understand who is engaging with the Lab, I'll collect your name and email. This stays with Wahib and helps him track interest in specific research threads. Privacy is a laboratory standard here.",
      sender: "bot",
      timestamp: new Date(),
      actionLink: null,
      actionText: null,
    },
  ]);
  const [initialMessageShown, setInitialMessageShown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours of inactivity

  const quickReplies = [
    "Tell me about Wahib",
    "What is FlowFund?",
    "Academic achievements",
    "Research interests",
    "Future goals"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open chatbot on first load and check for saved user details
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);

        // Check for saved user details
        const savedUser = localStorage.getItem('wahib_portfolio_user');
        if (savedUser) {
          try {
            const user = JSON.parse(savedUser);
            setUserDetails(user);
            setShowUserForm(false);
            setSessionStarted(true);
            setInitialMessageShown(true);

            // Replace initial message with clean welcome (no privacy notice)
            const cleanWelcome = {
              id: 1,
              text: `Welcome! 👋 I'm Wahib's Personal AI counterpart. Think of this as a new way of interviewing — ask me anything about Wahib, his work, research interests, or why he deserves opportunities. I'm here to help you explore his journey.`,
              sender: "bot",
              timestamp: new Date(),
              actionLink: null,
              actionText: null,
            };

            setMessages(prev => {
              const updated = prev.map((msg, idx) =>
                idx === 0 ? cleanWelcome : msg
              );
              return updated;
            });

            addToLog("bot", cleanWelcome.text);

            addToLog("system", `Session resumed. User: ${user.name} (${user.email})${user.organization ? `, Organization: ${user.organization}` : ""}`);
            addToLog("bot", cleanWelcome.text);

            const personalizedWelcome = {
              id: messages.length + 1,
              text: `Welcome back, ${user.name.split(' ')[0]}! I remember you. What would you like to explore today?`,
              sender: "bot",
              timestamp: new Date(),
              actionLink: null,
              actionText: null,
            };
            setMessages(prev => [...prev, personalizedWelcome]);
            addToLog("bot", personalizedWelcome.text);
          } catch (e) {
            console.error("Error loading saved user:", e);
          }
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  // Session timeout detection - reset on each message
  useEffect(() => {
    if (sessionStarted && !sessionEnded) {
      // Clear existing timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      // Set new timer
      inactivityTimerRef.current = setTimeout(() => {
        if (sessionStarted && !sessionEnded) {
          endSession(true); // Pass true to indicate timeout
        }
      }, SESSION_TIMEOUT);

      return () => {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
      };
    }
  }, [messages.length, sessionStarted, sessionEnded]);

  // Generate response using ML-powered generator with fallback
  const generateResponse = async (query) => {
    try {
      const conversationHistory = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      // Try ML-powered response first (if API key is configured)
      const useML = import.meta.env.VITE_APP_OPENAI_API_KEY ? true : false;

      if (useML) {
        try {
          const mlResponse = await generateMLIntelligentResponse(
            query,
            userDetails.name,
            conversationHistory,
            true
          );
          if (mlResponse && mlResponse.text) {
            return mlResponse;
          }
        } catch (mlError) {
          console.error('ML response generation failed, using fallback:', mlError);
        }
      }

      // Fallback to rule-based generator (reliable and fast)
      const response = generateIntelligentResponse(query, userDetails.name, conversationHistory);

      // Ensure response has required structure
      if (!response || !response.text) {
        console.error('Invalid response from generator:', response);
        return {
          text: "I'm having trouble processing that. Could you rephrase your question?",
          actionLink: null,
          actionText: null,
          deferral: false
        };
      }

      return response;
    } catch (error) {
      console.error('Error in generateResponse:', error);
      // Ultimate fallback
      return {
        text: "I encountered an error. Please try asking again, or check out the About page for more information.",
        actionLink: "/about",
        actionText: "Go to About",
        deferral: false
      };
    }
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    if (userDetails.name && userDetails.email) {
      setShowUserForm(false);
      setSessionStarted(true);
      setInitialMessageShown(true);

      // Add initial welcome message to log (before replacing)
      addToLog("system", `Session started. User: ${userDetails.name} (${userDetails.email})${userDetails.organization ? `, Organization: ${userDetails.organization}` : ""}`);

      // Replace the initial message with a cleaner welcome (without privacy notice)
      const cleanWelcome = {
        id: 1,
        text: `Welcome! 👋 I'm Wahib's Personal AI counterpart. Think of this as a new way of interviewing — ask me anything about Wahib, his work, research interests, or why he deserves opportunities. I'm here to help you explore his journey.`,
        sender: "bot",
        timestamp: new Date(),
        actionLink: null,
        actionText: null,
      };

      // Update the first message immediately
      setMessages(prev => {
        const updated = prev.map((msg, idx) =>
          idx === 0 ? cleanWelcome : msg
        );
        return updated;
      });

      // Also update in log
      addToLog("bot", cleanWelcome.text);

      // Add personalized welcome after login
      const personalizedWelcome = {
        id: messages.length + 1,
        text: `Great! Thanks for sharing that, ${userDetails.name.split(' ')[0]}. Now I can help you explore Wahib's work more personally. What would you like to know?`,
        sender: "bot",
        timestamp: new Date(),
        actionLink: null,
        actionText: null,
      };
      setMessages(prev => [...prev, personalizedWelcome]);
      addToLog("bot", personalizedWelcome.text);

      // Store user details in localStorage for reuse
      localStorage.setItem('wahib_portfolio_user', JSON.stringify({
        name: userDetails.name,
        email: userDetails.email,
        organization: userDetails.organization
      }));
    }
  };

  const addToLog = (sender, text) => {
    const logEntry = {
      sender,
      text,
      timestamp: new Date().toISOString()
    };
    setConversationLog(prev => [...prev, logEntry]);
  };

  const endSession = (isTimeout = false) => {
    if (sessionEnded) return;

    // Check if user has actually interacted before ending session
    const userMessages = messages.filter(msg => msg.sender === 'user');
    const hasUserInteraction = userMessages.length > 0;

    setSessionEnded(true);
    setSessionTimedOut(isTimeout);

    const closureMessage = isTimeout
      ? "Session timed out due to inactivity. Your conversation transcript has been saved. Would you like to continue?"
      : wahibKnowledge.tone.closure;

    const botMessage = {
      id: messages.length + 1,
      text: closureMessage,
      sender: "bot",
      timestamp: new Date(),
      actionLink: null,
      actionText: null,
    };
    setMessages(prev => [...prev, botMessage]);
    addToLog("bot", closureMessage);

    // Only send email if user has actually interacted
    if (hasUserInteraction) {
      sendSessionEmail();
    } else {
      console.log('Session ended without user interaction. Skipping email.');
    }
  };

  const resumeSession = () => {
    setSessionEnded(false);
    setSessionTimedOut(false);

    // Clear the timeout message and add continuation message
    const continuationMessage = {
      id: messages.length + 1,
      text: `Great! Let's continue our conversation. What would you like to explore?`,
      sender: "bot",
      timestamp: new Date(),
      actionLink: null,
      actionText: null,
    };
    setMessages(prev => [...prev, continuationMessage]);
    addToLog("bot", continuationMessage.text);

    // Reset inactivity timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      if (sessionStarted && !sessionEnded) {
        endSession(true);
      }
    }, SESSION_TIMEOUT);
  };

  const sendSessionEmail = async () => {
    try {
      // Check if user has sent any messages (not just bot/system messages)
      // Check both conversationLog and messages array to be thorough
      const userMessagesInLog = conversationLog.filter(entry => entry.sender === 'user');
      const userMessagesInChat = messages.filter(msg => msg.sender === 'user');

      // Don't send email if user hasn't sent any messages
      if (userMessagesInLog.length === 0 && userMessagesInChat.length === 0) {
        console.log('Skipping email: No user messages in session. Log entries:', conversationLog.length, 'Chat messages:', messages.length);
        return;
      }

      // Additional safety check: if only welcome/bot messages exist, don't send
      const hasRealUserInteraction = userMessagesInLog.length > 0 || userMessagesInChat.length > 0;
      if (!hasRealUserInteraction) {
        console.log('Skipping email: No real user interaction detected');
        return;
      }

      const transcript = conversationLog.map(entry =>
        `[${entry.sender.toUpperCase()}] ${entry.timestamp}: ${entry.text}`
      ).join('\n\n');

      const topics = extractTopics();
      const duration = conversationLog.length > 0
        ? Math.round((Date.now() - new Date(conversationLog[0]?.timestamp || Date.now()).getTime()) / 1000 / 60)
        : 0;

      const emailContent = `New Portfolio Chat Session — ${userDetails.name || 'Anonymous'}

User Details:
- Name: ${userDetails.name || 'Not provided'}
- Email: ${userDetails.email || 'Not provided'}
- Organization: ${userDetails.organization || 'Not provided'}

Session Summary:
- Duration: ${duration} minutes
- Messages Exchanged: ${conversationLog.length}
- Topics Discussed: ${topics.length > 0 ? topics.join(', ') : 'General inquiry'}

Full Conversation Transcript:
${'='.repeat(50)}
${transcript}
${'='.repeat(50)}`;

      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: userDetails.name || "Portfolio Visitor",
          to_name: "Wahib",
          from_email: userDetails.email || "noreply@portfolio",
          to_email: "wahibb07@gmail.com",
          message: emailContent,
          organization: userDetails.organization || "Not provided",
          duration: `${duration} minutes`,
          message_count: conversationLog.length.toString(),
          topics: topics.length > 0 ? topics.join(', ') : 'General inquiry',
          session_date: new Date().toLocaleString(),
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error("Failed to send session email:", error);
      // Don't show error to user, just log it
    }
  };

  const extractTopics = () => {
    const topics = new Set();
    conversationLog.forEach(entry => {
      const text = entry.text.toLowerCase();
      if (text.includes("academic") || text.includes("scholarship")) topics.add("Academic Journey");
      if (text.includes("project") || text.includes("FlowFund") || text.includes("fund my life")) topics.add("Projects");
      if (text.includes("research") || text.includes("interest")) topics.add("Research");
      if (text.includes("mission") || text.includes("philosophy")) topics.add("Mission & Philosophy");
      if (text.includes("contact") || text.includes("email")) topics.add("Contact");
      if (text.includes("goal") || text.includes("future")) topics.add("Future Goals");
    });
    return Array.from(topics);
  };

  const handleSend = (e) => {
    e.preventDefault();

    // Validation
    if (!inputValue.trim()) {
      return; // Don't send empty messages
    }

    if (sessionEnded) {
      return; // Session has ended
    }

    if (!sessionStarted) {
      if (!userDetails.name || !userDetails.email) {
        // Show error in a user-friendly way
        const errorMsg = {
          id: messages.length + 1,
          text: "Please provide your name and email in the form above to continue the conversation.",
          sender: "bot",
          timestamp: new Date(),
          actionLink: null,
          actionText: null,
        };
        setMessages(prev => [...prev, errorMsg]);
        return;
      }
    }

    // Validate input length
    if (inputValue.length > 500) {
      const errorMsg = {
        id: messages.length + 1,
        text: "Your message is too long. Please keep it under 500 characters.",
        sender: "bot",
        timestamp: new Date(),
        actionLink: null,
        actionText: null,
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    try {
      const userMessage = {
        id: Date.now(), // More reliable ID
        text: inputValue.trim(),
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      addToLog("user", inputValue.trim());
      const currentInput = inputValue.trim();
      setInputValue("");
      setIsTyping(true);

      // Generate response (async for ML)
      setTimeout(async () => {
        try {
          const response = await generateResponse(currentInput);

          if (!response || !response.text) {
            throw new Error("Invalid response from generator");
          }

          // Reset typing state before adding the message
          setIsTyping(false);

          const botMessage = {
            id: Date.now() + 1, // Unique ID
            text: response.text,
            sender: "bot",
            timestamp: new Date(),
            actionLink: response.actionLink || null,
            actionText: response.actionText || null,
            isTypingEffect: true
          };

          setMessages((prev) => [...prev, botMessage]);
          addToLog("bot", response.text);
        } catch (error) {
          console.error("Error generating response:", error);
          setIsTyping(false);

          // Fallback response using rule-based generator
          try {
            const conversationHistory = messages.map(m => ({
              sender: m.sender,
              text: m.text
            }));

            const fallbackResponse = generateIntelligentResponse(
              currentInput,
              userDetails.name,
              conversationHistory
            );

            const errorMsg = {
              id: Date.now() + 2,
              text: fallbackResponse.text || "I encountered an error processing your message. Could you try rephrasing it?",
              sender: "bot",
              timestamp: new Date(),
              actionLink: fallbackResponse.actionLink || null,
              actionText: fallbackResponse.actionText || null,
            };
            setMessages((prev) => [...prev, errorMsg]);
            addToLog("bot", errorMsg.text);
          } catch (fallbackError) {
            console.error("Fallback also failed:", fallbackError);
            const errorMsg = {
              id: Date.now() + 3,
              text: "I encountered an error. Please try asking again.",
              sender: "bot",
              timestamp: new Date(),
              actionLink: null,
              actionText: null,
            };
            setMessages((prev) => [...prev, errorMsg]);
            addToLog("bot", errorMsg.text);
          }
        }
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg = {
        id: messages.length + 1,
        text: "Something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date(),
        actionLink: null,
        actionText: null,
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => {
      const form = inputRef.current?.form;
      if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
      }
    }, 100);
  };

  const handleClose = () => {
    // Session remains active when window is simply toggled/closed
    setIsOpen(false);
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-white border border-slate-200 text-slate-900 shadow- institutional hover:shadow-2xl transition-all duration-500 hover:scale-110 flex items-center justify-center group pointer-events-auto'
        aria-label='Open Lab Assistant'
      >
        <div className="relative">
          <svg
            className='w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
            />
          </svg>
          {!isOpen && (
            <span className='absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse' />
          )}
        </div>
      </button>

      {/* Chatbot Window */}
      <div
        className={`fixed bottom-28 right-8 z-50 w-80 md:w-[440px] h-[680px] flex flex-col bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden transition-all duration-500 shadow-institutional ${isOpen
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
          }`}
      >
        {/* Header - Clinical Lab Look */}
        <div className='px-8 py-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/50 backdrop-blur-sm relative z-10'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg transform rotate-3'>
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.387a2 2 0 01-1.595 0l-.691-.387a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-.34.34a2 2 0 000 2.828l1.245 1.245a2 2 0 002.828 0L10.5 17.5l4.5 4.5 1.245-1.245a2 2 0 000-2.828l-.34-.34z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className='text-slate-900 font-black text-base uppercase tracking-tight' style={{ fontFamily: "'Playfair Display', serif" }}>Neural Core v4</h3>
                <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded shadow-sm">Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <p className='text-slate-400 text-[9px] uppercase tracking-[0.2em] font-black leading-none'>System: Stable // Integrity 100%</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className='text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full p-2 transition-all group'
          >
            <svg className='w-5 h-5 group-hover:rotate-90 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* User Details Form - Clean & Minimal */}
        {showUserForm && (
          <div className='p-10 flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700'>
            <div className='text-center mb-8'>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">Access protocol</span>
              <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Identify Observer</h2>
              <p className="text-slate-500 text-sm leading-relaxed px-4 font-medium">
                Authentication required to map query vectors within the laboratory data-space.
              </p>
            </div>

            <form onSubmit={handleUserFormSubmit} className='space-y-4'>
              <input
                type='text'
                placeholder='Identify yourself'
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                className='w-full px-7 py-5 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all placeholder:text-slate-400 font-medium'
                required
              />
              <input
                type='email'
                placeholder='Digital coordinates (Email)'
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                className='w-full px-7 py-5 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all placeholder:text-slate-400 font-medium'
                required
              />
              <button
                type='submit'
                className='w-full px-4 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-widest rounded-[1.5rem] hover:bg-blue-600 active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 group mt-4'
              >
                Establish Link
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Messages - Elegant Bubbles */}
        {!showUserForm && (
          <div className='flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent selection:bg-blue-500/20'>
            <AnimatePresence initial={false}>
              {messages.map((message) => {
                const isBot = message.sender === "bot";
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className='space-y-3 group'
                  >
                    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
                      <div className={`relative max-w-[88%]`}>
                        {isBot && (
                          <div className="flex items-center gap-2 mb-2 px-1">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">Core Engine</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          </div>
                        )}
                        <div
                          className={`px-5 py-3.5 rounded-[1.5rem] transition-all duration-500 ${isBot
                            ? "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-sm shadow-sm"
                            : "bg-slate-900 text-white rounded-tr-sm shadow-xl shadow-slate-900/10"
                            }`}
                        >
                          {isBot && message.isTypingEffect ? (
                            <TypewriterMessage
                              text={message.text}
                              onComplete={() => {
                                setMessages(prev => prev.map(m =>
                                  m.id === message.id ? { ...m, isTypingEffect: false } : m
                                ));
                              }}
                            />
                          ) : (
                            <p className='text-[14px] leading-relaxed whitespace-pre-line font-medium'>{message.text}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Link inside message context */}
                    {message.actionLink && isBot && (
                      <div className='flex justify-start px-1'>
                        <Link
                          to={message.actionLink}
                          onClick={() => setIsOpen(false)}
                          className='group/btn px-7 py-3.5 bg-white border border-slate-200 text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm flex items-center gap-3'
                        >
                          {message.actionText}
                          <svg className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {isTyping && (
                <motion.div
                  key="typing-indicator"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  className='flex justify-start px-1'
                >
                  <div className='bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 flex gap-2 shadow-sm'>
                    <span className='w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce' style={{ animationDelay: '0ms' }} />
                    <span className='w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce' style={{ animationDelay: '200ms' }} />
                    <span className='w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce' style={{ animationDelay: '400ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>
        )}

        {/* Interaction Layer */}
        {!showUserForm && !sessionEnded && (
          <div className='p-8 pt-4 border-t border-slate-50 space-y-6 bg-white shrink-0 relative z-20'>
            {/* Quick Replies - Styled as Tabs */}
            {(messages[messages.length - 1]?.sender === "bot" && !isTyping) && (
              <div className='space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500'>
                <div className="flex items-center justify-between px-1">
                  <p className='text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]'>Deep Thread Inquiry</p>
                  <button
                    onClick={() => setShowQuickReplies(!showQuickReplies)}
                    className="text-[9px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    {showQuickReplies ? '[ Hide Panel ]' : '[ Open Panel ]'}
                  </button>
                </div>
                {showQuickReplies && (
                  <div className='flex flex-wrap gap-2.5 animate-in slide-in-from-top-2 duration-300'>
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className='text-[11px] px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all font-bold tracking-tight shadow-sm active:scale-95'
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Input - Minimal & Centered */}
            <form onSubmit={handleSend} className='relative group'>
              <div className='flex gap-2 bg-slate-50 p-1.5 rounded-[2rem] border border-slate-200 focus-within:border-blue-500/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 transition-all shadow-inner'>
                <input
                  ref={inputRef}
                  type='text'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder='Inquiry input...'
                  className='flex-1 px-5 py-3 bg-transparent text-slate-900 focus:outline-none text-sm placeholder:text-slate-400 font-semibold selection:bg-blue-100'
                  autoFocus
                />
                <button
                  type='submit'
                  className='w-11 h-11 flex items-center justify-center bg-slate-900 text-white rounded-full hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 active:scale-95 group/send'
                >
                  <svg className='w-5 h-5 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* End of session state */}
        {sessionEnded && (
          <div className='p-12 flex-1 flex flex-col justify-center text-center animate-in fade-in duration-700 bg-slate-50/30'>
            <div className='mb-10'>
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-institutional transform -rotate-3 group hover:rotate-0 transition-transform duration-500">
                <span className="text-4xl text-blue-500">⚛</span>
              </div>
              <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-6">Inquiry terminated</p>
              <p className='text-slate-700 text-[15px] leading-relaxed px-4 font-medium mb-8'>
                {sessionTimedOut
                  ? "Transmission pulse lost. Local cache remains accessible."
                  : "Thank you for exploring ideas with Wahib's AI counterpart — your curiosity helps these explorations grow."}
              </p>
              <p className='text-slate-900 text-sm font-bold italic mb-2'>
                "Session synchronized. The Lab remains open for future inquiry."
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-10">Protocol Terminal</p>
            </div>
            {sessionTimedOut && (
              <button
                onClick={resumeSession}
                className='px-10 py-5 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/20'
              >
                Re-Access Interface
              </button>
            )}
            <p className="text-[10px] text-slate-400 mt-12 font-bold italic opacity-70 underline decoration-blue-500/30 underline-offset-4">Life is short, sleep is eternal</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
