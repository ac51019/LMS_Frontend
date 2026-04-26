import React, { useState } from "react";

function MyCourses() {
    const [filter, setFilter] = useState("All");

    const mockCourses = [
        { id: 1, title: "React Masterclass", status: "Published", price: 2999, students: 120, rating: 4.8, bestSelling: true },
        { id: 2, title: "Advanced Node.js", status: "Draft", price: 1999, students: 0, rating: 0, bestSelling: false },
        { id: 3, title: "Next.js for Beginners", status: "Pending Review", price: 3499, students: 85, rating: 4.5, bestSelling: false },
    ];

    const filteredCourses = mockCourses.filter((course) => {
        if (filter === "All") return true;
        if (filter === "Published") return course.status === "Published";
        if (filter === "Draft") return course.status === "Draft";
        if (filter === "Best Selling") return course.bestSelling;
        if (filter === "Top Rated") return course.rating >= 4.5;
        return true;
    });

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">My Courses</h2>
                <div className="flex gap-4">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700"
                    >
                        <option value="All">All Courses</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Best Selling">Best Selling</option>
                        <option value="Top Rated">Top Rated</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-colors">
                        Create Course
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-100/50 text-slate-600 text-sm">
                            <th className="p-4 font-semibold rounded-tl-xl border-b border-slate-200">Course</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Status</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Price (INR ₹)</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Students</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Rating</th>
                            <th className="p-4 font-semibold rounded-tr-xl border-b border-slate-200 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.map((course) => (
                            <tr key={course.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition duration-200">
                                <td className="p-4 flex items-center gap-4">
                                    <div className="w-16 h-12 bg-slate-200 rounded-lg shrink-0 overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-300">
                                            <i className="bx bx-image text-2xl"></i>
                                        </div>
                                    </div>
                                    <span className="font-bold text-slate-800">{course.title}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${course.status === "Published" ? "bg-green-100 text-green-700" :
                                            course.status === "Draft" ? "bg-slate-100 text-slate-700" :
                                                "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {course.status}
                                    </span>
                                </td>
                                <td className="p-4 font-medium text-slate-700">₹{course.price}</td>
                                <td className="p-4 text-slate-600">{course.students}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <i className="bx bxs-star"></i>
                                        <span className="text-slate-700 font-medium">{course.rating > 0 ? course.rating : "-"}</span>
                                    </div>
                                </td>
                                <td className="p-4 flex gap-2 justify-end">
                                    <button className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" title="Edit">
                                        <i className="bx bx-edit"></i>
                                    </button>
                                    <button className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Analytics">
                                        <i className="bx bx-line-chart"></i>
                                    </button>
                                    <button className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                                        <i className="bx bx-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredCourses.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">
                                    No courses found for the selected filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyCourses;
