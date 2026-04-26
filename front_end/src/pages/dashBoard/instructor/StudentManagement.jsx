import React, { useState } from "react";

function StudentManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const students = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", course: "React Masterclass", progress: 85, enrolledAt: "2026-01-15" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", course: "Advanced Node.js", progress: 40, enrolledAt: "2026-02-10" },
        { id: 3, name: "Charlie Brown", email: "charlie@example.com", course: "React Masterclass", progress: 100, enrolledAt: "2025-12-05" },
        { id: 4, name: "Diana Prince", email: "diana@example.com", course: "Next.js for Beginners", progress: 10, enrolledAt: "2026-03-01" },
    ];

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Student Management</h2>
                <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all">
                    <i className="bx bx-export"></i> Export CSV
                </button>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="relative w-full max-w-md">
                    <i className="bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></i>
                    <input
                        type="text"
                        placeholder="Search students by name or course..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 font-medium"
                    />
                </div>
                <select className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 font-medium">
                    <option>All Courses</option>
                    <option>React Masterclass</option>
                    <option>Advanced Node.js</option>
                    <option>Next.js for Beginners</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 text-slate-600 text-sm">
                            <th className="p-4 font-semibold border-b border-slate-200">Student</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Enrolled Course</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Progress</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Enrolled Date</th>
                            <th className="p-4 font-semibold border-b border-slate-200 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition duration-150">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{student.name}</p>
                                            <p className="text-xs text-slate-500 font-medium">{student.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-slate-700">{student.course}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                                            <div className={`h-full rounded-full ${student.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${student.progress}%` }}></div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-600">{student.progress}%</span>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600 font-medium">{student.enrolledAt}</td>
                                <td className="p-4 flex gap-2 justify-end">
                                    <button className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" title="Message Student">
                                        <i className="bx bx-message-rounded-dots text-lg"></i>
                                    </button>
                                    <button className="p-2 text-slate-600 bg-slate-50 hover:bg-slate-200 rounded-lg transition-colors" title="View Profile">
                                        <i className="bx bx-user text-lg"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-500 font-medium">No students found matching your criteria.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentManagement;
