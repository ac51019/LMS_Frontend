import React from 'react';

function ProfileSettings() {
    return (
        <div className="space-y-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-800">Profile Settings</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Personal Information</h3>

                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 bg-indigo-100 rounded-full overflow-hidden relative group">
                            <img src="https://via.placeholder.com/150" alt="profile" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                                <i className="bx bx-camera text-2xl text-white"></i>
                            </div>
                        </div>
                        <div>
                            <button className="px-5 py-2.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition shadow-sm mb-2">Change Photo</button>
                            <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 2MB</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition" defaultValue="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition" defaultValue="john@example.com" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Headline / Bio</label>
                            <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition h-28 resize-none" defaultValue="Passionate software developer learning Full Stack Web Development." />
                        </div>
                    </div>
                </div>

                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Password & Security</h3>
                    <div className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm" />
                        </div>
                        <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-md w-full sm:w-auto mt-2">
                            Update Password
                        </button>
                    </div>
                </div>

                <div className="p-8 bg-gray-50/50">
                    <div className="flex justify-end gap-4">
                        <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-sm">Cancel</button>
                        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-md shadow-indigo-200">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;
