import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { wahibKnowledge } from "../utils/wahibKnowledge";
import { generateIntelligentResponse } from "../utils/responseGenerator";
import { generateMLIntelligentResponse, recordUserFeedback, getLearningStats } from "../utils/mlResponseGenerator";
import { extractIntent } from "../utils/spellingHelper";

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
      text: "Welcome! 👋 I'm Wahib's Personal AI counterpart. Think of this as a new way of interviewing — ask me anything about Wahib, his work, research interests, or why he deserves opportunities. I'm here to help you explore his journey.\n\nBefore we start, I'd like to let you know that your name and email will be collected to help Wahib identify visitors and understand who's interested in his work. This information will only be used for identification purposes and to send you a conversation summary if needed. Your privacy is important!",
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
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity

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
        id: messages.length + 1,
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
          
          setIsTyping(false);
          
          const botMessage = {
            id: messages.length + 2,
            text: response.text,
            sender: "bot",
            timestamp: new Date(),
            actionLink: response.actionLink || null,
            actionText: response.actionText || null,
          };

          setMessages((prev) => [...prev, botMessage]);
          addToLog("bot", response.text);
          
          // Record successful response for learning
          const intent = extractIntent(currentInput);
          if (response.mlGenerated || response.learned) {
            // ML-generated or learned response - will be tracked automatically
          }
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
              id: messages.length + 2,
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
              id: messages.length + 2,
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
      }, 1500);
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
    if (sessionStarted && !sessionEnded) {
      endSession(false); // User manually closed, not timeout
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group'
        aria-label='Open chatbot'
      >
        <svg
          className='w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
          />
        </svg>
        {!isOpen && (
          <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse'></span>
        )}
      </button>

      {/* Chatbot Window */}
      <div 
        className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[600px] md:h-[650px] flex flex-col bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden claymorphism transition-all duration-300 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className='bg-gradient-to-r from-[#00c6ff] to-[#0072ff] p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
              </svg>
            </div>
            <div>
              <h3 className='text-white font-semibold'>Wahib's AI Counterpart</h3>
              <p className='text-white/80 text-xs'>Interim representative</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className='text-white hover:bg-white/20 rounded-full p-1 transition-colors duration-200'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* User Details Form */}
        {showUserForm && (
          <div className='p-4 border-b border-gray-200 bg-blue-50/50'>
            <p className='text-xs text-gray-600 mb-3 font-medium'>To continue, please share your details:</p>
            <form onSubmit={handleUserFormSubmit} className='space-y-2'>
              <input
                type='text'
                placeholder='Your name *'
                value={userDetails.name}
                onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                className='w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
              <input
                type='email'
                placeholder='Your email *'
                value={userDetails.email}
                onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                className='w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
              <input
                type='text'
                placeholder='Organization (optional)'
                value={userDetails.organization}
                onChange={(e) => setUserDetails({...userDetails, organization: e.target.value})}
                className='w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button
                type='submit'
                className='w-full px-4 py-2 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-200'
              >
                Start Conversation
              </button>
            </form>
          </div>
        )}

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {messages.map((message) => {
            // Hide privacy notice if user is logged in
            let displayText = message.text;
            if (sessionStarted && message.id === 1 && message.text.includes('Before we start')) {
              displayText = message.text.split('\n\nBefore we start')[0];
            }
            
            return (
              <div key={message.id} className='space-y-2'>
                <div
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className='text-sm leading-relaxed whitespace-pre-line'>{displayText}</p>
                  </div>
                </div>
                {/* Action Button */}
                {message.actionLink && message.actionText && message.sender === "bot" && (
                  <div className='flex justify-start animate-fadeIn' style={{ animationDelay: '0.2s' }}>
                    <Link
                      to={message.actionLink}
                      onClick={() => setIsOpen(false)}
                      className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105'
                    >
                      {message.actionText}
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
          {isTyping && (
            <div className='flex justify-start'>
              <div className='bg-gray-100 rounded-2xl px-4 py-2'>
                <div className='flex gap-1'>
                  <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></span>
                  <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></span>
                  <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies - Show initially and after bot responses */}
        {((messages.length === 1 && messages[0].sender === "bot") || 
          (messages.length > 1 && messages[messages.length - 1].sender === "bot")) && 
          !isTyping && !sessionEnded && sessionStarted && (
          <div className='px-4 pb-2 border-t border-gray-200 pt-2'>
            <div className='flex items-center justify-between mb-2'>
              <p className='text-xs text-gray-500 font-medium'>Quick replies:</p>
              <button
                onClick={() => setShowQuickReplies(!showQuickReplies)}
                className='text-xs text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center gap-1'
                title={showQuickReplies ? "Hide suggestions" : "Show suggestions"}
              >
                {showQuickReplies ? (
                  <>
                    <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                    </svg>
                    Hide
                  </>
                ) : (
                  <>
                    <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                    Show
                  </>
                )}
              </button>
            </div>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showQuickReplies ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className='flex flex-wrap gap-2 pt-2'>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className='text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors duration-200'
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        {!sessionEnded && sessionStarted && (
          <form onSubmit={handleSend} className='p-4 border-t border-gray-200'>
            <div className='flex gap-2'>
              <input
                ref={inputRef}
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Type your message...'
                className='flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
                disabled={sessionEnded}
              />
              <button
                type='submit'
                disabled={sessionEnded}
                className='px-4 py-2 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                </svg>
              </button>
            </div>
          </form>
        )}

        {sessionEnded && (
          <div className='p-4 border-t border-gray-200 bg-blue-50/50'>
            <p className='text-xs text-gray-600 text-center mb-3'>
              {sessionTimedOut 
                ? "Session timed out. Transcript has been saved." 
                : "Session ended. Transcript has been sent to Wahib."}
            </p>
            {sessionTimedOut && (
              <button
                onClick={resumeSession}
                className='w-full px-4 py-2 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 hover:shadow-md'
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.196 15.857l-1.5 1.5M4 4l1.5 1.5m13.5 13.5l-1.5-1.5M4 4H2m18 0h2m-2 0v2m0-2v-2" />
                </svg>
                Continue Conversation
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
