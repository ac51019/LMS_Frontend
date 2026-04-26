import React from 'react';

function LiveClasses() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Live Classes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "System Design Interview Prep", instructor: "John Doe", time: "Today, 4:00 PM", status: "Upcoming", color: "bg-blue-500" },
                    { title: "Microservices Architecture", instructor: "Jane Smith", time: "Tomorrow, 6:00 PM", status: "Scheduled", color: "bg-purple-500" },
                    { title: "React State Management", instructor: "Alice Lee", time: "Oct 15, 10:00 AM", status: "Scheduled", color: "bg-emerald-500" }
                ].map((cls, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:-translate-y-1 transition duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center text-2xl shadow-sm ${cls.color}`}>
                                <i className="bx bx-video"></i>
                            </div>
                            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">{cls.status}</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-1">{cls.title}</h3>
                        <p className="text-gray-500 mb-4 font-medium flex-1">By {cls.instructor}</p>

                        <div className="flex items-center gap-2 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <i className="bx bx-time-five text-indigo-500 text-xl"></i>
                            <span className="text-gray-700 font-semibold">{cls.time}</span>
                        </div>

                        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md">
                            Join Class <i className="bx bx-right-arrow-alt"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LiveClasses;
