import React from 'react';

function DashboardOverview() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-800">Student Dashboard</h2>
            </div>

            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Total Enrolled", value: "12", icon: "bx bx-book-reader", color: "from-blue-500 to-indigo-600" },
                    { title: "In Progress", value: "4", icon: "bx bx-loader-circle", color: "from-amber-400 to-orange-500" },
                    { title: "Completed", value: "8", icon: "bx bx-check-shield", color: "from-emerald-400 to-green-600" },
                    { title: "Certificates", value: "5", icon: "bx bx-certification", color: "from-purple-500 to-pink-600" },
                    { title: "Learning Hours", value: "145h", icon: "bx bx-time", color: "from-cyan-400 to-blue-500" },
                    { title: "Subscription", value: "Active", icon: "bx bxs-crown", color: "from-yellow-400 to-amber-500" },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center text-2xl shadow-sm`}>
                            <i className={stat.icon}></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Continue Learning */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Continue Learning</h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/3 aspect-video bg-gray-200 rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <button className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/50 transition">
                                <i className="bx bx-play text-2xl"></i>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <p className="text-sm font-medium text-indigo-600 mb-2">Web Development</p>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Advanced React Patterns & Next.js</h4>
                        <div className="flex items-center gap-2 mb-4">
                            <i className="bx bx-time-five text-gray-400"></i>
                            <span className="text-sm text-gray-500">2h 15m remaining</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                            <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-gray-700">65% Completed</span>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition">
                                Resume Lecture
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Analytics Section Preview */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Learning Activity</h3>
                    <div className="h-64 flex items-end justify-between gap-2 pb-4 border-b border-gray-100">
                        {[40, 70, 45, 90, 65, 30, 85].map((h, i) => (
                            <div key={i} className="w-1/7 bg-indigo-100 hover:bg-indigo-500 transition-colors rounded-t-sm w-full mx-1 relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100">{h}m</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[
                            { type: 'announcement', title: 'New Course Material Added', time: '2 hours ago', icon: 'bx-bell', color: 'text-amber-500 bg-amber-50' },
                            { type: 'assignment', title: 'React Hooks Quiz Scored: 95%', time: '1 day ago', icon: 'bx-check-double', color: 'text-emerald-500 bg-emerald-50' },
                            { type: 'live', title: 'Upcoming Live Session in 30 mins', time: 'Just now', icon: 'bx-video', color: 'text-blue-500 bg-blue-50' }
                        ].map((act, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.color}`}>
                                    <i className={`bx ${act.icon}`}></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">{act.title}</h4>
                                    <p className="text-sm text-gray-500">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardOverview;
