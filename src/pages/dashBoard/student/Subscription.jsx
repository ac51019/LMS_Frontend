import React from 'react';

function Subscription() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">My Subscription</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Plan */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Pro Learner Plan</h3>
                            <p className="text-gray-500">Unlimited access to 10,000+ top courses</p>
                        </div>
                        <span className="bg-green-100 text-green-700 font-bold px-4 py-1.5 rounded-full text-sm shadow-sm ring-1 ring-green-200">Active</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Plan Expiry</p>
                            <p className="text-xl font-bold text-slate-800">Dec 31, 2026</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Auto Renewal</p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner shadow-indigo-800/20">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all shadow-md"></div>
                                </div>
                                <span className="font-bold text-slate-800">ON</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-md shadow-slate-200 w-full sm:w-auto">
                            Upgrade Plan
                        </button>
                        <button className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition w-full sm:w-auto">
                            Cancel Subscription
                        </button>
                    </div>
                </div>

                {/* Billing Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col justify-between h-full bg-gradient-to-b from-white to-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><i className="bx bx-credit-card text-indigo-500"></i> Payment Details</h3>
                        <div className="bg-slate-800 text-white rounded-xl p-5 mb-4 relative overflow-hidden shadow-lg shadow-slate-200">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-4 right-8 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
                            <p className="text-sm text-slate-300 mb-4 uppercase tracking-widest font-mono">Visa •••• 4242</p>
                            <div className="flex justify-between items-end">
                                <p className="font-bold text-lg">John Doe</p>
                                <p className="text-sm font-mono tracking-widest text-slate-300">12/28</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-3 mt-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
                        Update Payment Method
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Subscription;
