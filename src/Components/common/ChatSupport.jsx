import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import OpenAI from 'openai';

// Initialize OpenAI (Make sure to set REACT_APP_OPENAI_API_KEY in your .env file)
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Allowed for client-side demo, though backend is recommended for production
});

const SYSTEM_PROMPT = `You are an intelligent, polite, and professional Customer Support Assistant for my website.

Company Name: ZENLITHIC TECHNOLOGIES PRIVATE LIMITED
Industry: IT Industries
Target Audience: [Students / Customers / Traders / Vendors / General Users]

Your Responsibilities:
1. Provide clear, short, and helpful answers.
2. Be polite, calm, and professional.
3. Never argue with customers.
4. If the customer is angry, respond with empathy and reassurance.
5. If you don't know something, say: "Let me check that for you. Please allow me a moment."
6. If the issue requires human support, say: "I am forwarding your request to our support team. They will contact you shortly."

Support Areas You Handle:
- Account login issues
    - Password reset guidance
        - Payment failures
            - Refund policy explanation
                - Order status tracking
                    - Subscription plans
                        - Technical errors
                            - Feature explanation
                                - Basic troubleshooting steps

Response Rules:
- Keep answers under 6 lines unless detailed explanation is required.
- Use simple language.
- Do not give false promises.
- Do not share confidential information.
- If refund is requested, explain policy before confirming anything.
- If legal or financial advice is asked, politely redirect to support team.

    Tone: Friendly, respectful, helpful, and confident.

If issue relates to payment: Ask for Transaction ID, Date, Registered Email, Screenshot.
If issue relates to login: Ask for Registered email, Error message, Device used.
If issue relates to refund: Explain processing time, Eligibility, Required verification.

    Goal: Solve the customer's issue as fast as possible. Respond in the same language the customer uses (Hindi or English).`;

function ChatSupport() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! Welcome to ZENLITHIC TECHNOLOGIES. How can I help you today? \n\nनमस्ते! ZENLITHIC TECHNOLOGIES में आपका स्वागत है। आज मैं आपकी कैसे मदद कर सकता हूँ?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            if (process.env.REACT_APP_OPENAI_API_KEY) {
                // Send to OpenAI
                const chatCompletion = await openai.chat.completions.create({
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { role: "user", content: userMessage }
                    ],
                    model: "gpt-3.5-turbo",
                });

                const botResponse = chatCompletion.choices[0].message.content;
                setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
            } else {
                // Fallback dummy response if no API key is set
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: "Please configure your REACT_APP_OPENAI_API_KEY in the .env file to enable AI responses. \n\nकृपया अपने .env फ़ाइल में REACT_APP_OPENAI_API_KEY सेट करें।" }]);
                }, 1000);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I am facing a technical issue connecting to the server. Please try again later. \n\nमुझे सर्वर से जुड़ने में तकनीकी समस्या आ रही है। कृपया बाद में प्रयास करें।" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transform transition-all duration-300 z-[9999] ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageCircle size={28} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-[9999] border border-gray-100 flex flex-col transform transition-all duration-300 translate-y-0 opacity-100" style={{ height: '500px', maxHeight: '80vh' }}>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Zenlithic Support</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-600 text-white'}`}>
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-2 max-w-[85%]">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-600 text-white shadow-sm">
                                    <Bot size={16} />
                                </div>
                                <div className="p-3 bg-white rounded-2xl rounded-tl-none border border-gray-100 text-gray-500 shadow-sm flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                    <span className="text-xs font-medium">Typing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 shrink-0">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                disabled={isLoading}
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm disabled:opacity-70 disabled:bg-gray-100"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} className={input.trim() && !isLoading ? 'ml-0.5' : ''} />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[10px] text-gray-400">Powered by OpenAI</span>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default ChatSupport;







// import React, { useState, useRef, useEffect } from "react";
// import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react";

// function ChatSupport() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content:
//         "Hello! Welcome to ZENLITHIC TECHNOLOGIES. How can I help you today?\n\nनमस्ते! ZENLITHIC TECHNOLOGIES में आपका स्वागत है। आज मैं आपकी कैसे मदद कर सकता हूँ?",
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Auto scroll
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // ===============================
//   // SEND MESSAGE TO NODE BACKEND
//   // ===============================
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = input.trim();

//     setInput("");

//     setMessages((prev) => [
//       ...prev,
//       { role: "user", content: userMessage },
//     ]);

//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/chat",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             message: userMessage,
//           }),
//         }
//       );

//       const data = await response.json();

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: data.reply,
//         },
//       ]);
//     } catch (error) {
//       console.error("Chat Error:", error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             "I am facing a technical issue connecting to the server. Please try again later.\n\nमुझे सर्वर से जुड़ने में तकनीकी समस्या आ रही है। कृपया बाद में प्रयास करें।",
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className={`fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transform transition-all duration-300 z-[9999] ${
//           isOpen ? "hidden" : "flex"
//         }`}
//       >
//         <MessageCircle size={28} />
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div
//           className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-[9999] border border-gray-100 flex flex-col"
//           style={{ height: "500px", maxHeight: "80vh" }}
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                 <Bot size={24} />
//               </div>
//               <div>
//                 <h3 className="font-bold text-sm">Zenlithic Support</h3>
//                 <p className="text-xs text-blue-100 flex items-center gap-1">
//                   <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
//                   Online
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-white hover:text-gray-200 bg-white/10 p-2 rounded-full hover:bg-white/20"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex gap-2 max-w-[85%] ${
//                   msg.role === "user"
//                     ? "ml-auto flex-row-reverse"
//                     : ""
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
//                     msg.role === "user"
//                       ? "bg-indigo-100 text-indigo-600"
//                       : "bg-blue-600 text-white"
//                   }`}
//                 >
//                   {msg.role === "user" ? (
//                     <User size={16} />
//                   ) : (
//                     <Bot size={16} />
//                   )}
//                 </div>

//                 <div
//                   className={`p-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm ${
//                     msg.role === "user"
//                       ? "bg-indigo-600 text-white rounded-tr-none"
//                       : "bg-white text-gray-700 rounded-tl-none border border-gray-100"
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))}

//             {/* Typing Loader */}
//             {isLoading && (
//               <div className="flex gap-2 max-w-[85%]">
//                 <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white">
//                   <Bot size={16} />
//                 </div>

//                 <div className="p-3 bg-white rounded-2xl border text-gray-500 flex items-center gap-2">
//                   <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
//                   <span className="text-xs font-medium">
//                     Typing...
//                   </span>
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <form
//             onSubmit={handleSendMessage}
//             className="p-4 bg-white border-t"
//           >
//             <div className="relative flex items-center">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your message..."
//                 disabled={isLoading}
//                 className="w-full pl-4 pr-12 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
//               />

//               <button
//                 type="submit"
//                 disabled={!input.trim() || isLoading}
//                 className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               >
//                 <Send size={18} />
//               </button>
//             </div>

//             <div className="text-center mt-2">
//               <span className="text-[10px] text-gray-400">
//                 Powered by OpenAI
//               </span>
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }

// export default ChatSupport;