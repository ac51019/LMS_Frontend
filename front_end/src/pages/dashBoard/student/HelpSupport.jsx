import React from 'react';

function HelpSupport() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Help & Support</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Links */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-md p-8 text-white flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4 backdrop-blur-sm">
                        <i className="bx bx-support shadow-inner"></i>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">24/7 Chat Support</h3>
                    <p className="text-indigo-100 mb-6 flex-1 text-sm font-medium">Get instant help from our virtual assistant or connect with an agent.</p>
                    <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-indigo-50 transition transform hover:-translate-y-0.5">
                        Start Chat
                    </button>
                </div>

                <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Raise a Support Ticket</h3>
                    <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Issue Type</label>
                                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 appearance-none bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] pr-10">
                                    <option>Course Access Issue</option>
                                    <option>Payment & Refund</option>
                                    <option>Technical Error</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Related Course (Optional)</label>
                                <input type="text" placeholder="e.g. React Bootcamp" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Describe the Issue</label>
                            <textarea placeholder="Please provide details about the problem you are facing..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"></textarea>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <button type="button" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-4 py-2 rounded-lg transition">
                                <i className="bx bx-paperclip text-lg"></i> Attach Screenshot
                            </button>
                            <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-md shadow-indigo-200">
                                Submit Ticket
                            </button>
                        </div>
                    </form>
                </div>

                {/* FAQs */}
                <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        {[
                            { q: "How do I download my certificate?", a: "Once you complete 100% of the course, a download button will appear in the 'My Certificates' tab." },
                            { q: "Can I watch courses offline?", a: "Yes, you can use our mobile app to download course videos for offline viewing." },
                            { q: "What is the refund policy?", a: "We offer a 30-day money-back guarantee for all individual course purchases." }
                        ].map((faq, i) => (
                            <div key={i} className="border border-gray-100 rounded-xl p-5 hover:bg-gray-50 transition cursor-pointer flex justify-between items-center group">
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1 leading-snug">{faq.q}</h4>
                                    <p className="text-gray-500 text-sm hidden group-hover:block transition-all mt-2">{faq.a}</p>
                                </div>
                                <i className="bx bx-chevron-right text-gray-400 text-2xl group-hover:text-indigo-600 group-hover:rotate-90 transition-transform hidden group-hover:block"></i>
                                <i className="bx bx-plus text-gray-400 text-xl group-hover:hidden"></i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelpSupport;
