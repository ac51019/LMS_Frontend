import React from "react";

function LiveClasses() {
    const upcomingClasses = [
        { id: 1, topic: "React Hooks Deep Dive", course: "React Masterclass", date: "2026-03-05", time: "10:00 AM", platform: "Zoom", students: 45 },
        { id: 2, title: "Node.js Authentication Workshop", course: "Advanced Node.js", date: "2026-03-08", time: "05:00 PM", platform: "Google Meet", students: 30 }
    ];

    const pastClasses = [
        { id: 3, topic: "Introduction to Components", course: "React Masterclass", date: "2026-02-28", time: "02:00 PM", platform: "Zoom", attendance: "85%", recordingAvailable: true }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Live Classes</h2>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transition-all">
                    <i className="bx bx-calendar-plus"></i> Schedule Class
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                        <h3 className="font-bold text-slate-800 text-lg">Quick Actions</h3>
                    </div>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition">
                            <span className="flex items-center gap-2"><i className="bx bxl-zoom text-xl"></i> Link Zoom Account</span>
                            <i className="bx bx-link text-lg"></i>
                        </button>
                        <button className="w-full flex items-center justify-between p-3 rounded-lg border border-green-200 bg-green-50 text-green-700 font-medium hover:bg-green-100 transition">
                            <span className="flex items-center gap-2"><i className="bx bxl-google text-xl"></i> Link Google Meet</span>
                            <i className="bx bx-check-circle text-lg"></i>
                        </button>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                    <i className="bx bx-broadcast absolute -right-6 -bottom-6 text-9xl text-white/10"></i>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Next Live Class</h3>
                        <p className="font-semibold opacity-90 mb-6">Upcoming in 2 days</p>
                        <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                            <div>
                                <p className="font-bold text-lg">React Hooks Deep Dive</p>
                                <p className="text-sm opacity-80 mt-1 flex items-center gap-2">
                                    <i className="bx bx-time-five"></i> March 5, 2026 - 10:00 AM (IST)
                                </p>
                            </div>
                            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-slate-50 transition shadow-sm">
                                Start Class
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Upcoming Classes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {upcomingClasses.map((cls) => (
                        <div key={cls.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                                    {cls.platform}
                                </div>
                                <button className="text-slate-400 hover:text-red-500 transition"><i className="bx bx-trash text-lg"></i></button>
                            </div>
                            <h4 className="font-bold text-slate-800 text-lg line-clamp-1" title={cls.topic || cls.title}>{cls.topic || cls.title}</h4>
                            <p className="text-slate-500 font-medium text-sm mt-1">{cls.course}</p>

                            <div className="flex items-center gap-2 mt-4 text-slate-700 font-medium">
                                <i className="bx bx-calendar text-blue-500 text-lg"></i> {cls.date}
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-slate-700 font-medium">
                                <i className="bx bx-time text-blue-500 text-lg"></i> {cls.time}
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-slate-700 font-medium">
                                <i className="bx bxs-user-detail text-blue-500 text-lg"></i> ~{cls.students} Expected
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg transition-colors text-sm flex justify-center items-center gap-1">
                                    <i className="bx bx-bell"></i> Send Reminder
                                </button>
                                <button className="flex-1 border border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-2 rounded-lg transition-colors text-sm flex justify-center items-center gap-1">
                                    <i className="bx bx-play-circle"></i> Start
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">Past Classes & Recordings</h3>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm">
                                <th className="p-4 font-semibold border-b border-slate-200">Topic</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Date</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Attendance</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Recording</th>
                                <th className="p-4 font-semibold border-b border-slate-200 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastClasses.map((past) => (
                                <tr key={past.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition duration-150">
                                    <td className="p-4 font-bold text-slate-800 flex flex-col">
                                        {past.topic}
                                        <span className="text-xs text-slate-500 font-medium">{past.course}</span>
                                    </td>
                                    <td className="p-4 font-medium text-slate-700">{past.date}</td>
                                    <td className="p-4 font-medium text-slate-700"><i className="bx bxs-user-check text-emerald-500"></i> {past.attendance}</td>
                                    <td className="p-4">
                                        {past.recordingAvailable ? (
                                            <span className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full w-fit">
                                                <i className="bx bx-check-circle"></i> Uploaded
                                            </span>
                                        ) : (
                                            <button className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full w-fit transition">
                                                <i className="bx bx-cloud-upload"></i> Upload
                                            </button>
                                        )}
                                    </td>
                                    <td className="p-4 flex gap-2 justify-end">
                                        <button className="p-2 text-slate-600 bg-slate-50 hover:bg-slate-200 rounded-lg transition-colors" title="View Analytics">
                                            <i className="bx bx-bar-chart-alt-2 text-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LiveClasses;
