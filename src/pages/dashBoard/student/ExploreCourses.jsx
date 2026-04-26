import React from 'react';

function ExploreCourses() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-3xl font-bold text-slate-800">Explore Courses</h2>

                <div className="flex gap-2 relative">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                    />
                    <i className="bx bx-search text-gray-400 absolute left-3 top-3 text-lg"></i>

                    <button className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm flex items-center gap-2 hover:bg-gray-50 text-gray-700 bg-white">
                        <i className="bx bx-filter font-bold"></i> Filters
                    </button>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {['All Categories', 'Programming', 'Design', 'Business', 'Marketing', 'Data Science'].map((cat, i) => (
                    <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full font-medium ${i === 0 ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
                {[
                    { title: "MERN Stack Bootcamp 2026", price: 3499, original: 8999, rating: 4.8 },
                    { title: "UI/UX Design Masterclass", price: 1999, original: 4500, rating: 4.9 },
                    { title: "Python for Data Science", price: 2499, original: 6000, rating: 4.7 },
                    { title: "Digital Marketing Complete", price: 999, original: 3000, rating: 4.5 },
                ].map((c, i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group cursor-pointer hover:shadow-lg transition">
                        <div className="h-36 bg-gray-200 relative group-hover:scale-105 transition duration-500 origin-center" />
                        <div className="p-4 flex-1 flex flex-col bg-white z-10">
                            <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight flex-1 group-hover:text-indigo-600 transition">{c.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">By Top Instructor</p>

                            <div className="flex items-center gap-1 mt-2 mb-1">
                                <span className="text-amber-500 font-bold text-sm">{c.rating}</span>
                                <div className="flex text-amber-500 text-xs">
                                    <i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star-half"></i>
                                </div>
                                <span className="text-gray-400 text-xs">(12,431)</span>
                            </div>

                            <div className="flex items-end gap-2 mt-auto pt-2">
                                <span className="font-bold text-lg text-slate-900">₹{c.price}</span>
                                <span className="text-sm text-gray-400 line-through">₹{c.original}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExploreCourses;
