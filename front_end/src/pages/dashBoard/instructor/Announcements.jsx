import React, { useState } from "react";

function Announcements() {
    const [recipient, setRecipient] = useState("all");

    const announcements = [
        { id: 1, title: "Course Update Schedule", target: "All Students", date: "2026-03-01", status: "Sent" },
        { id: 2, title: "New Module Available", target: "React Masterclass", date: "2026-02-25", status: "Sent" }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Announcements</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
                        <i className="bx bx-broadcast text-blue-600"></i> Create Announcement
                    </h3>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Announcement Title</label>
                            <input type="text" placeholder="e.g. Welcome to the new course!" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
                            <select
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 font-medium"
                            >
                                <option value="all">All Enrolled Students</option>
                                <option value="course1">React Masterclass Students</option>
                                <option value="course2">Advanced Node.js Students</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                            <textarea rows="5" placeholder="Write your announcement message here..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"></textarea>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                                <span className="text-slate-700 font-medium text-sm">Send Notification via Email</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                                <span className="text-slate-700 font-medium text-sm">Send Push/In-App Notification</span>
                            </label>
                        </div>

                        <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 text-lg">
                            <i className="bx bx-send"></i> Publish Announcement
                        </button>
                    </form>
                </div>

                <div>
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden mb-8">
                        <i className="bx bxs-megaphone absolute -right-6 -bottom-6 text-9xl text-white/10"></i>
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-bold">Best Practices</h3>
                            <ul className="space-y-3 font-medium opacity-90 text-sm">
                                <li className="flex items-start gap-2"><i className="bx bxs-check-circle mt-0.5 text-emerald-300"></i> Be concise and clear with your subject line.</li>
                                <li className="flex items-start gap-2"><i className="bx bxs-check-circle mt-0.5 text-emerald-300"></i> Use formatting (bold, italic) to highlight key information.</li>
                                <li className="flex items-start gap-2"><i className="bx bxs-check-circle mt-0.5 text-emerald-300"></i> Remember that email notifications go out immediately - double check before sending!</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Recent Announcements</h3>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-sm">
                                    <th className="p-4 font-semibold border-b border-slate-200">Title & Target</th>
                                    <th className="p-4 font-semibold border-b border-slate-200">Date</th>
                                    <th className="p-4 font-semibold border-b border-slate-200 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcements.map((ann) => (
                                    <tr key={ann.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition duration-150">
                                        <td className="p-4 flex flex-col">
                                            <span className="font-bold text-slate-800 line-clamp-1" title={ann.title}>{ann.title}</span>
                                            <span className="text-xs text-blue-600 font-medium mt-0.5"><i className="bx bx-target-lock"></i> {ann.target}</span>
                                        </td>
                                        <td className="p-4 font-medium text-slate-600 whitespace-nowrap">{ann.date}</td>
                                        <td className="p-4 text-right">
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                                <i className="bx bx-check"></i> {ann.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Announcements;
