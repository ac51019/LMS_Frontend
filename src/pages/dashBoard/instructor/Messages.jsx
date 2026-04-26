import React, { useState } from "react";

function Messages() {
    const [activeChat, setActiveChat] = useState(1);

    const chats = [
        { id: 1, name: "Alice Johnson", course: "React Masterclass", lastMessage: "Thanks for explaining hooks!", time: "10:30 AM", unread: 2 },
        { id: 2, name: "Bob Smith", course: "Advanced Node.js", lastMessage: "Can you review my assignment?", time: "Yesterday", unread: 0 },
        { id: 3, name: "Diana Prince", course: "Next.js for Beginners", lastMessage: "I'm having trouble with routing.", time: "Monday", unread: 1 },
    ];

    const messages = {
        1: [
            { id: 1, sender: "Alice Johnson", text: "Hi! I'm struggling with the useEffect dependency array.", time: "10:00 AM", isStudent: true },
            { id: 2, sender: "You", text: "No problem, Alice! Remember, whatever variables you use inside the effect that come from the component scope should be in the array.", time: "10:15 AM", isStudent: false },
            { id: 3, sender: "Alice Johnson", text: "Oh, that makes sense. Thanks for explaining hooks!", time: "10:30 AM", isStudent: true },
        ],
        2: [
            { id: 1, sender: "Bob Smith", text: "I submitted the API project.", time: "2:00 PM", isStudent: true },
        ],
        3: [
            { id: 1, sender: "Diana Prince", text: "I keep getting a 404 on the dynamic routes.", time: "11:00 AM", isStudent: true },
        ]
    };

    const activeUser = chats.find(c => c.id === activeChat);

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-slate-800">Messages</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-all flex items-center gap-2">
                    <i className="bx bx-edit"></i> New Message
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">

                {/* Sidebar / Chat List */}
                <div className="w-1/3 border-r border-slate-100 flex flex-col h-full bg-slate-50/50">
                    <div className="p-4 border-b border-slate-100">
                        <div className="relative">
                            <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" placeholder="Search students..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-medium" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {chats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChat(chat.id)}
                                className={`p-4 border-b border-slate-100 cursor-pointer transition flex items-start gap-3 hover:bg-white
                  ${activeChat === chat.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}
                `}
                            >
                                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0 relative">
                                    {chat.name.charAt(0)}
                                    {chat.unread > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-slate-800 truncate pr-2">{chat.name}</h4>
                                        <span className="text-xs text-slate-400 whitespace-nowrap">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-blue-600 font-bold mb-1 truncate">{chat.course}</p>
                                    <p className={`text-sm truncate ${chat.unread > 0 ? 'font-bold text-slate-800' : 'text-slate-500 font-medium'}`}>{chat.lastMessage}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white h-full relative">
                    {activeUser ? (
                        <>
                            {/* Header */}
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white shadow-sm z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                        {activeUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 leading-tight">{activeUser.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium">{activeUser.course}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="text-slate-400 hover:text-blue-600 transition"><i className="bx bx-phone text-xl"></i></button>
                                    <button className="text-slate-400 hover:text-blue-600 transition"><i className="bx bx-video text-xl"></i></button>
                                    <button className="text-slate-400 hover:text-slate-800 transition"><i className="bx bx-dots-vertical-rounded text-xl"></i></button>
                                </div>
                            </div>

                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                                <div className="text-center">
                                    <span className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full font-bold">Today</span>
                                </div>

                                {messages[activeChat]?.map(msg => (
                                    <div key={msg.id} className={`flex flex-col ${msg.isStudent ? 'items-start' : 'items-end'}`}>
                                        <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${msg.isStudent
                                                ? 'bg-white border border-slate-200 rounded-tl-sm text-slate-800'
                                                : 'bg-blue-600 text-white rounded-tr-sm'
                                            }`}>
                                            <p className="font-medium text-sm md:text-base leading-relaxed">{msg.text}</p>
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium mt-1 mx-1">{msg.time}</span>
                                    </div>
                                ))}
                                <div className="h-4"></div>
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white border-t border-slate-100">
                                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 transition"><i className="bx bx-paperclip text-xl"></i></button>
                                    <input type="text" placeholder="Type your message here..." className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 font-medium px-2 py-1 placeholder-slate-400" />
                                    <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center shadow-sm transition">
                                        <i className="bx bxs-send"></i>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                            <i className="bx bx-message-square-dots text-6xl mb-4 opacity-50"></i>
                            <p className="font-bold text-lg">Select a conversation to start messaging</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Messages;
