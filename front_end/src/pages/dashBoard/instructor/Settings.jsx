import React, { useState } from "react";

function Settings() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Settings</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">

                {/* Settings Navigation */}
                <div className="lg:w-1/4">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-2 sticky top-8">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition flex items-center gap-3 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <i className="bx bx-user-circle text-xl"></i> Profile Update
                        </button>
                        <button
                            onClick={() => setActiveTab("social")}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition flex items-center gap-3 ${activeTab === 'social' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <i className="bx bx-link text-xl"></i> Social Links
                        </button>
                        <button
                            onClick={() => setActiveTab("password")}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition flex items-center gap-3 ${activeTab === 'password' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <i className="bx bx-lock-alt text-xl"></i> Change Password
                        </button>
                        <button
                            onClick={() => setActiveTab("notifications")}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition flex items-center gap-3 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <i className="bx bx-bell text-xl"></i> Notifications
                        </button>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="lg:w-3/4">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

                        {activeTab === "profile" && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Public Profile Information</h3>

                                <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 pb-8 border-b border-slate-100">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-lg flex items-center justify-center font-bold text-slate-400 text-3xl overflow-hidden cursor-pointer">
                                            <i className="bx bx-user"></i>
                                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                                                <i className="bx bx-camera text-xl"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">Profile Picture</h4>
                                        <p className="text-slate-500 font-medium text-sm mb-3">Upload a professional headshot for your instructor profile.</p>
                                        <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2 rounded-lg transition text-sm">
                                            Change Picture
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                        <input type="text" placeholder="John" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                                        <input type="text" placeholder="Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Headline</label>
                                    <input type="text" placeholder="e.g. Senior Full Stack Developer & Instructor" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Instructor Bio</label>
                                    <textarea rows="6" placeholder="Tell your students about your experience and teaching style..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all">
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "social" && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Social & Portfolio Links</h3>
                                <p className="text-slate-500 font-medium text-sm mb-6">These links will be displayed on your instructor profile page.</p>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Personal Website</label>
                                    <div className="relative">
                                        <i className="bx bx-globe absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                                        <input type="url" placeholder="https://yourwebsite.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub Profile</label>
                                    <div className="relative">
                                        <i className="bx bxl-github absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                                        <input type="url" placeholder="https://github.com/username" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn Profile</label>
                                    <div className="relative">
                                        <i className="bx bxl-linkedin-square absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                                        <input type="url" placeholder="https://linkedin.com/in/username" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">YouTube Channel</label>
                                    <div className="relative">
                                        <i className="bx bxl-youtube absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                                        <input type="url" placeholder="https://youtube.com/c/yourchannel" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all">
                                        Save Links
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "password" && (
                            <div className="space-y-6 animate-fade-in max-w-lg mx-auto w-full">
                                <div className="text-center mb-8">
                                    <i className="bx bx-shield-quarter text-5xl text-blue-500 mb-4 inline-block bg-blue-50 p-4 rounded-full"></i>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">Account Security</h3>
                                    <p className="text-slate-500 font-medium text-sm">Ensure your account is using a long, random password to stay secure.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" />
                                </div>

                                <div className="pt-4 flex justify-center">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-md transition-all text-lg">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Notification Preferences</h3>

                                <div className="space-y-4 max-w-2xl">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                        <div>
                                            <h4 className="font-bold text-slate-800">New Course Enrollments</h4>
                                            <p className="text-xs text-slate-500 font-medium mt-1">Get an email when a student buys your course</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                        <div>
                                            <h4 className="font-bold text-slate-800">Student Messages</h4>
                                            <p className="text-xs text-slate-500 font-medium mt-1">Receive alerts for new direct messages</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                        <div>
                                            <h4 className="font-bold text-slate-800">New Reviews</h4>
                                            <p className="text-xs text-slate-500 font-medium mt-1">Get notified when a student rates your course</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                        <div>
                                            <h4 className="font-bold text-slate-800">Promotional Emails</h4>
                                            <p className="text-xs text-slate-500 font-medium mt-1">Receive updates from the platform team</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all">
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
