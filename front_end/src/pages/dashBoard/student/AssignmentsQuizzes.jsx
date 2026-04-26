import React from 'react';

function AssignmentsQuizzes() {
    const items = [
        { title: "React Context API Challenge", type: "Assignment", course: "Complete React D...", status: "Pending", due: "Tomorrow, 11:59 PM", score: "-" },
        { title: "JavaScript ES6 Mastery Quiz", type: "Quiz", course: "Modern JS", status: "Completed", due: "Oct 10, 2026", score: "95/100" }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Assignments & Quizzes</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex gap-4 border-b border-gray-200 pb-2 mb-6">
                    <button className="font-semibold pb-2 border-b-2 border-indigo-600 text-indigo-600">Pending</button>
                    <button className="font-semibold pb-2 border-transparent text-gray-500 hover:text-gray-800 transition">Completed</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase">
                                <th className="p-4 font-semibold">Title</th>
                                <th className="p-4 font-semibold">Course</th>
                                <th className="p-4 font-semibold">Due Date</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${item.type === 'Quiz' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                                                <i className={item.type === 'Quiz' ? 'bx bx-question-mark' : 'bx bx-file'}></i>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{item.title}</div>
                                                <div className="text-xs text-gray-500">{item.type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600 font-medium">{item.course}</td>
                                    <td className="p-4 text-gray-500 text-sm whitespace-nowrap">
                                        <i className="bx bx-calendar-alt mr-2 text-indigo-400"></i>{item.due}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        {item.status === 'Pending' ? (
                                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition">
                                                {item.type === 'Quiz' ? 'Attempt' : 'Upload'}
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-end gap-3 text-sm font-bold text-slate-700">
                                                {item.score}
                                                <button className="text-indigo-600 underline text-xs font-semibold">Review</button>
                                            </div>
                                        )}
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

export default AssignmentsQuizzes;
