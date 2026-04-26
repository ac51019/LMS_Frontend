import React, { useState } from "react";

function AssignmentsQuizzes() {
    const [activeTab, setActiveTab] = useState("quizzes");

    const quizzes = [
        { id: 1, title: "React Fundamentals MCQ", course: "React Masterclass", questions: 15, submissions: 120, avgScore: "85%" },
        { id: 2, title: "Node.js Routing Quiz", course: "Advanced Node.js", questions: 10, submissions: 45, avgScore: "72%" }
    ];

    const assignments = [
        { id: 1, title: "Build a To-Do App", course: "React Masterclass", pendingGrading: 12, totalSubmissions: 105 },
        { id: 2, title: "Create API Endpoints", course: "Advanced Node.js", pendingGrading: 5, totalSubmissions: 40 }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Assignments & Quizzes</h2>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transition-all">
                    <i className="bx bx-plus"></i> Create New
                </button>
            </div>

            <div className="flex gap-4 mb-6 border-b border-slate-200 pb-2">
                <button
                    onClick={() => setActiveTab("quizzes")}
                    className={`px-4 py-2 font-bold text-lg border-b-2 transition-colors ${activeTab === 'quizzes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Quizzes (MCQ)
                </button>
                <button
                    onClick={() => setActiveTab("assignments")}
                    className={`px-4 py-2 font-bold text-lg border-b-2 transition-colors ${activeTab === 'assignments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Assignments
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                {activeTab === "quizzes" && (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm">
                                <th className="p-4 font-semibold border-b border-slate-200">Quiz Title</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Course Name</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Questions</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Submissions</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Avg Score</th>
                                <th className="p-4 font-semibold border-b border-slate-200 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map((quiz) => (
                                <tr key={quiz.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition duration-150">
                                    <td className="p-4 font-bold text-slate-800">{quiz.title}</td>
                                    <td className="p-4 font-medium text-slate-700">{quiz.course}</td>
                                    <td className="p-4 text-slate-600 font-medium">{quiz.questions}</td>
                                    <td className="p-4 text-slate-600 font-medium">{quiz.submissions}</td>
                                    <td className="p-4 font-bold text-emerald-600">{quiz.avgScore}</td>
                                    <td className="p-4 flex gap-2 justify-end">
                                        <button className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Result Analytics">
                                            <i className="bx bx-bar-chart-alt-2 text-lg"></i>
                                        </button>
                                        <button className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" title="Edit Quiz">
                                            <i className="bx bx-edit text-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === "assignments" && (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm">
                                <th className="p-4 font-semibold border-b border-slate-200">Assignment Title</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Course Name</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Total Submissions</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Pending Grading</th>
                                <th className="p-4 font-semibold border-b border-slate-200 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment) => (
                                <tr key={assignment.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition duration-150">
                                    <td className="p-4 font-bold text-slate-800">{assignment.title}</td>
                                    <td className="p-4 font-medium text-slate-700">{assignment.course}</td>
                                    <td className="p-4 text-slate-600 font-medium">{assignment.totalSubmissions}</td>
                                    <td className="p-4 font-bold text-amber-500">{assignment.pendingGrading} <span className="text-xs font-medium text-slate-400">Needs Review</span></td>
                                    <td className="p-4 flex gap-2 justify-end">
                                        <button className="px-4 py-2 font-bold text-sm bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors">
                                            Grade Now
                                        </button>
                                        <button className="p-2 text-slate-600 bg-slate-50 hover:bg-slate-200 rounded-lg transition-colors" title="Edit Assignment">
                                            <i className="bx bx-edit text-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AssignmentsQuizzes;
