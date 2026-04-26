import React, { useState } from 'react';

function MyLearning() {
    const [filter, setFilter] = useState('All');

    const courses = [
        { title: 'The Complete React Native bootcamp', progress: 40, author: 'Maximilian Schwarzmüller', rating: 'Leave a rating' },
        { title: 'Next.js 14 & React - The Complete Guide', progress: 100, author: 'Stephen Grider', rating: 'Your Rating: 5.0' },
        { title: 'Docker and Kubernetes: The Complete Guide', progress: 5, author: 'Academind', rating: 'Leave a rating' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">My Learning</h2>

            {/* Filters */}
            <div className="flex gap-4 border-b border-gray-200 pb-2">
                {['All', 'In Progress', 'Completed', 'Downloaded/Offline'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`font-semibold pb-2 border-b-2 transition ${filter === f ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {courses.map((c, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition">
                        <div className="h-40 bg-gray-200 relative group-hover:opacity-90 transition">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition">
                                <button className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white text-indigo-600 transition">
                                    <i className="bx bx-play text-2xl leading-none"></i>
                                </button>
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-gray-800 line-clamp-2 min-h-[3rem] group-hover:text-indigo-600 transition">{c.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{c.author}</p>

                            <div className="mt-4">
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 relative">
                                    <div className="bg-indigo-600 h-1.5 rounded-full absolute top-0 left-0" style={{ width: `${c.progress}%` }}></div>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-semibold text-gray-700">{c.progress}% Complete</span>
                                    <button className="text-indigo-600 font-medium">{c.rating}</button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyLearning;
