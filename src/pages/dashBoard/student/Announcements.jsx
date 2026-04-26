import React from 'react';

function Announcements() {
    const announcements = [
        { title: "Course Update: React 18 Features", course: "Advanced React", date: "Oct 12, 2026", unread: true },
        { title: "Live Session Rescheduled", course: "Node.js Masterclass", date: "Oct 10, 2026", unread: false }
    ];

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-3xl font-bold text-slate-800">Announcements</h2>
                <button className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition">Mark all as read</button>
            </div>

            <div className="space-y-4">
                {announcements.map((item, index) => (
                    <div key={index} className={`bg-white rounded-2xl p-6 shadow-sm border ${item.unread ? 'border-indigo-200 border-l-4 border-l-indigo-600' : 'border-gray-100'} hover:shadow-md transition-shadow relative overflow-hidden group`}>
                        {item.unread && <div className="absolute top-4 border border-indigo-200 right-4 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>}
                        <div className="flex gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.unread ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                                <i className="bx bx-broadcast text-2xl"></i>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">{item.course}</span>
                                    <span className="text-xs text-gray-400">• {item.date}</span>
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${item.unread ? 'text-slate-900' : 'text-slate-700'}`}>{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed max-w-3xl">
                                    Hi everyone, we have updated the course content to include the latest features from React 18. Please review the new section added at the end of module 4. Happy learning!
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Announcements;
