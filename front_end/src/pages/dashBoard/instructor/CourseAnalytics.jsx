import React from "react";
import { formatCurrency } from "../../../utils/currency";

function CourseAnalytics() {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-8 border-b border-slate-200 pb-4">Course Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 items-center justify-between">
                    <h3 className="text-slate-500 font-medium mb-1">Total Completion Rate</h3>
                    <p className="text-3xl font-bold text-blue-600">68%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 items-center justify-between">
                    <h3 className="text-slate-500 font-medium mb-1">Total Drop-offs</h3>
                    <p className="text-3xl font-bold text-red-500">12%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 items-center justify-between">
                    <h3 className="text-slate-500 font-medium mb-1">Total Watch Time</h3>
                    <p className="text-3xl font-bold text-purple-600">1,402 hrs</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 items-center justify-between">
                    <h3 className="text-slate-500 font-medium mb-1">Average Rating</h3>
                    <p className="text-3xl font-bold text-yellow-500">4.8 / 5</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center h-64">
                    <i className="bx bx-pie-chart-alt text-4xl text-slate-400 mb-2"></i>
                    <p className="text-slate-500 font-medium">Completion Rate Breakdown Chart</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center h-64">
                    <i className="bx bx-line-chart text-4xl text-slate-400 mb-2"></i>
                    <p className="text-slate-500 font-medium">Monthly Watch Time Trends</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-100/50 text-slate-600 text-sm">
                            <th className="p-4 font-semibold border-b border-slate-200">Course Name</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Completion %</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Active Students</th>
                            <th className="p-4 font-semibold border-b border-slate-200">Revenue (INR ₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                            <td className="p-4 font-bold text-slate-800">React Masterclass</td>
                            <td className="p-4 font-medium text-emerald-600"><i className="bx bx-up-arrow-alt"></i> 72%</td>
                            <td className="p-4 font-medium text-slate-700">120</td>
                            <td className="p-4 font-medium text-slate-700">{formatCurrency(359880)}</td>
                        </tr>
                        <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                            <td className="p-4 font-bold text-slate-800">Advanced Node.js</td>
                            <td className="p-4 font-medium text-red-500"><i className="bx bx-down-arrow-alt"></i> 45%</td>
                            <td className="p-4 font-medium text-slate-700">56</td>
                            <td className="p-4 font-medium text-slate-700">{formatCurrency(111944)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CourseAnalytics;
