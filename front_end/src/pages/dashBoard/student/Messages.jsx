import React from 'react';

function Messages() {
    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex-shrink-0">Messages</h2>

            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex overflow-hidden">
                {/* Left Sidebar - Chat List */}
                <div className="w-80 border-r border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <input type="text" placeholder="Search messages..." className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <i className="bx bx-search absolute left-3 top-2.5 text-gray-400 text-lg"></i>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {[1, 2, 3].map((chat, i) => (
                            <div key={i} className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-50 ${i === 0 ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}>
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                                        <i className="bx bxs-user text-gray-400 text-xl"></i>
                                    </div>
                                    {i === 0 && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-slate-800 truncate">Instructor Name</h4>
                                        <span className="text-xs text-gray-400 font-medium">10:42 AM</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">Yes, the new module is uploaded.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Area - Chat Window */}
                <div className="flex-1 flex flex-col bg-slate-50/50">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                                <i className="bx bxs-user text-xl"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Instructor Name</h3>
                                <p className="text-xs text-green-500 font-medium tracking-wide">Online</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-indigo-600 transition bg-gray-50 rounded-full"><i className="bx bx-phone"></i></button>
                            <button className="p-2 text-gray-400 hover:text-indigo-600 transition bg-gray-50 rounded-full"><i className="bx bx-video"></i></button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition bg-gray-50 rounded-full"><i className="bx bx-dots-vertical-rounded"></i></button>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                        <div className="flex gap-3 max-w-[80%]">
                            <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0 flex items-center justify-center"><i className="bx bxs-user text-gray-400 text-sm"></i></div>
                            <div>
                                <div className="bg-white border border-gray-100 text-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm shadow-sm">
                                    Hi, I had a question about the recent assignment.
                                </div>
                                <span className="text-xs text-gray-400 mt-1 ml-1 font-medium">10:30 AM</span>
                            </div>
                        </div>
                        <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
                            <div>
                                <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none shadow-md text-sm">
                                    Sure, let me check and revert. Yes, the new module is uploaded.
                                </div>
                                <div className="text-xs text-gray-400 mt-1 mr-1 text-right font-medium">10:42 AM <i className="bx bx-check-double text-indigo-400"></i></div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 transition bg-gray-50 hover:bg-indigo-50 rounded-full"><i className="bx bx-paperclip text-xl"></i></button>
                        <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-50 border-none rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-slate-700" />
                        <button className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-md shadow-indigo-200 transition-transform active:scale-95">
                            <i className="bx bxs-send text-xl ml-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
