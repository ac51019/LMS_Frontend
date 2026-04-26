import React from "react";
import { formatCurrency } from "../../../utils/currency";

function DashboardOverview() {
    // Placeholder data
    const stats = {
        totalCourses: 12,
        totalStudents: 1450,
        totalRevenue: 250000,
        thisMonthEarnings: 45000,
        pendingPayout: 12000,
        averageRating: 4.8,
    };

    return (
        <>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
                <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
                    Instructor Dashboard
                </h1>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6 mb-10">
                {/* Total Courses */}
                <li className="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl border border-white/30 transition-transform duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                        <i className="bx bx-book" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{stats.totalCourses}</h3>
                        <p className="text-slate-600 text-sm font-medium">Courses</p>
                    </div>
                </li>

                {/* Total Students */}
                <li className="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl border border-white/30 transition-transform duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                        <i className="bx bxs-user-detail" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{stats.totalStudents}</h3>
                        <p className="text-slate-600 text-sm font-medium">Students</p>
                    </div>
                </li>

                {/* Total Revenue */}
                <li className="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl border border-white/30 transition-transform duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                        <i className="bx bx-money" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}</h3>
                        <p className="text-slate-600 text-sm font-medium">Revenue</p>
                    </div>
                </li>

                {/* This Month */}
                <li className="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl border border-white/30 transition-transform duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                        <i className="bx bx-trending-up" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(stats.thisMonthEarnings)}</h3>
                        <p className="text-slate-600 text-sm font-medium">This Month</p>
                    </div>
                </li>

                {/* Pending Payout */}
                <li className="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl border border-white/30 transition-transform duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-400 to-rose-600 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                        <i className="bx bx-time" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(stats.pendingPayout)}</h3>
                        <p className="text-slate-600 text-sm font-medium">Pending Payout</p>
                    </div>
                </li>

                {/* Average Rating */}
                <li className="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl border border-white/30 transition-transform duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                        <i className="bx bx-star" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{stats.averageRating}</h3>
                        <p className="text-slate-600 text-sm font-medium">Avg Rating</p>
                    </div>
                </li>
            </ul>

            {/* Charts & Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2 space-y-8">
                    {/* Revenue Chart */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Revenue Analytics</h2>
                        <div className="h-64 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                            <span className="text-slate-400 font-medium">[ Monthly Revenue Graph ]</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
                            <h2 className="text-lg font-bold text-slate-800 mb-6">Enrollment Growth</h2>
                            <div className="h-48 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                                <span className="text-slate-400 font-medium">[ Enrollment Chart ]</span>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
                            <h2 className="text-lg font-bold text-slate-800 mb-6">Course Performance</h2>
                            <div className="h-48 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                                <span className="text-slate-400 font-medium">[ Performance Chart ]</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Recent Activity */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h2>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <i className="bx bxs-check-circle" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800">New Student Enrolled</h4>
                                        <p className="text-xs text-slate-500 mt-1">John Doe enrolled in React Masterclass</p>
                                        <span className="text-xs text-slate-400 mt-1 block">2 hours ago</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardOverview;
