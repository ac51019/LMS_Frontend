import React, { useState, useEffect } from "react";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faShoppingCart, faCreditCard, faChalkboardTeacher, faCertificate, faChevronDown, faChevronUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const HelpCenter = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { icon: faUser, title: "Account & Login", desc: "Issues with login, password reset, profile management." },
        { icon: faShoppingCart, title: "Course Purchase", desc: "Questions about buying and accessing courses." },
        { icon: faCreditCard, title: "Payments", desc: "Payment methods, failures, invoices, and billing." },
        { icon: faChalkboardTeacher, title: "Instructor Support", desc: "Help for course creators, tutors, and partners." },
        { icon: faCertificate, title: "Certificates", desc: "How to claim, download, and verify certificates." },
    ];

    const faqs = [
        { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot Password'. A reset link will be sent to your registered email address." },
        { q: "Can I download courses for offline viewing?", a: "Currently, our courses are only available via online streaming through our platform to protect the intellectual property of our instructors." },
        { q: "How do I request a refund?", a: "You can request a refund within 7 days of purchase. Please review our Refund Policy and contact support to initiate the process." },
        { q: "When will I get my certificate?", a: "Certificates are automatically generated upon 100% completion of the course videos and any required assignments." },
        { q: "Can I change my registered email address?", a: "To change your email address, please contact our support team directly at zenlithictechnologies@gmail.com for security verification." }
    ];

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Navbar page="help-center" />
            <main className="pt-20 pb-16">
                {/* Hero Section */}
                <div className="bg-indigo-600 dark:bg-indigo-900 text-white py-16 md:py-24 px-6 text-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 max-w-[1000px] mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-sm">How can we help you today?</h1>
                        <p className="text-indigo-100 mb-8 text-lg max-w-2xl mx-auto">Search our knowledge base or browse categories below to find answers to your questions.</p>
                        <div className="max-w-2xl mx-auto relative text-gray-800">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="text"
                                placeholder="Search for articles, questions, or topics..."
                                className="w-full pl-14 pr-4 py-4 rounded-full shadow-lg outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 text-lg transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="max-w-[1200px] mx-auto px-6 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-sm mb-2">Browse By Topic</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Help Categories</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800 hover:-translate-y-1 transition-all cursor-pointer text-center group">
                                <div className="w-16 h-16 mx-auto bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                                    <FontAwesomeIcon icon={cat.icon} className="text-2xl" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{cat.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-[800px] mx-auto px-6 py-12">
                    <div className="text-center mb-10">
                        <h2 className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-sm mb-2">Quick Answers</h2>
                        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none"
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                >
                                    <span className={`font-bold text-lg pr-4 ${activeFaq === idx ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                        {faq.q}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === idx ? 'bg-indigo-100 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                                        <FontAwesomeIcon icon={activeFaq === idx ? faChevronUp : faChevronDown} className="text-sm" />
                                    </div>
                                </button>
                                <div className={`px-8 overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="w-full h-px bg-gray-100 dark:bg-gray-700 mb-4"></div>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Support */}
                <div className="max-w-[1000px] mx-auto px-6 py-16 text-center">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 border border-indigo-100 dark:border-gray-700 rounded-3xl p-12 shadow-sm relative overflow-hidden text-center">

                        <div className="relative z-10 w-20 h-20 mx-auto bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 shadow-md shadow-indigo-100/50 dark:shadow-none">
                            <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-indigo-600 dark:text-indigo-400" />
                        </div>

                        <h2 className="relative z-10 text-3xl font-bold mb-4 text-gray-900 dark:text-white">Still need help?</h2>
                        <p className="relative z-10 text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto text-lg">
                            Can't find the answer you're looking for? Our dedicated support team is ready to assist you.
                        </p>
                        <a href="mailto:zenlithictechnologies@gmail.com" className="relative z-10 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300">
                            <FontAwesomeIcon icon={faEnvelope} /> Contact Support
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HelpCenter;
