import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import {
    Users,
    BookOpen,
    DollarSign,
    TrendingUp,
    Activity,
    UserPlus,
    FileText,
    PieChart
} from "lucide-react";
import { message } from "antd";

const VendorDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalInstructors: 12,
        totalCourses: 45,
        totalRevenue: 12500,
        activeStudents: 1200,
    });

    const [instructors, setInstructors] = useState([
        { id: 1, name: "John Doe", courses: 5, students: 300, Revenue: 2500 },
        { id: 2, name: "Jane Smith", courses: 8, students: 450, Revenue: 4200 },
        { id: 3, name: "Alice Johnson", courses: 3, students: 150, Revenue: 1100 },
    ]);

    useEffect(() => {
        // Fetch vendor dashboard data from backend here
        // mock for now
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">LMS VENDOR</h1>
                        <p className="text-gray-600 mt-2">Manage your instructors, courses, and view revenue analytics.</p>
                    </div>
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Invite Instructor
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Users className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Instructors</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalInstructors}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <BookOpen className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Courses</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <DollarSign className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <Activity className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Students</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.activeStudents.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Instructors Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">Your Instructors</h2>
                                <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                                            <th className="p-4 font-medium">Instructor Name</th>
                                            <th className="p-4 font-medium">Courses</th>
                                            <th className="p-4 font-medium">Students</th>
                                            <th className="p-4 font-medium">Revenue Generated</th>
                                            <th className="p-4 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {instructors.map((inst, idx) => (
                                            <tr key={inst.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                                <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                                                        {inst.name.charAt(0)}
                                                    </div>
                                                    {inst.name}
                                                </td>
                                                <td className="p-4 text-gray-600">{inst.courses}</td>
                                                <td className="p-4 text-gray-600">{inst.students}</td>
                                                <td className="p-4 font-semibold text-green-600">₹{inst.Revenue.toLocaleString()}</td>
                                                <td className="p-4">
                                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={() => message.info("Course approval feature coming soon!")}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="text-left py-1">
                                        <p className="font-semibold text-gray-900 text-sm">Review Courses</p>
                                        <p className="text-xs text-gray-500">2 pending approvals</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => message.info("Revenue split configuration coming soon!")}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                                        <PieChart className="w-5 h-5" />
                                    </div>
                                    <div className="text-left py-1">
                                        <p className="font-semibold text-gray-900 text-sm">Revenue Splits</p>
                                        <p className="text-xs text-gray-500">Manage instructor payouts</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                            <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
                                <div className="relative">
                                    <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white"></span>
                                    <div className="pl-6">
                                        <p className="text-sm font-semibold text-gray-900">Jane Smith published a new course</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white"></span>
                                    <div className="pl-6">
                                        <p className="text-sm font-semibold text-gray-900">Revenue payout processed</p>
                                        <p className="text-xs text-gray-500">Yesterday at 4:30 PM</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-white"></span>
                                    <div className="pl-6">
                                        <p className="text-sm font-semibold text-gray-900">John Doe joined as Instructor</p>
                                        <p className="text-xs text-gray-500">Oct 24, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
