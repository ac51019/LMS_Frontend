import React, { useEffect } from "react";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faClock, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const RefundPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Navbar page="refund" />
            <main className="pt-28 pb-20 max-w-[900px] mx-auto px-6">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Refund Policy</h1>
                    <p className="text-gray-500 dark:text-gray-400">Your satisfaction is our priority. Read our hassle-free refund guidelines.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 text-gray-600 dark:text-gray-300">

                    <div className="flex items-start gap-4 mb-10 pb-10 border-b border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center shrink-0 mt-1">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Refund Eligibility & Timeline</h2>
                            <p className="leading-relaxed">
                                We offer a comprehensive <strong>7-Day Money-Back Guarantee</strong> for all our standard courses.
                                If you are unsatisfied with your course purchase for any reason, you can request a full refund within
                                7 days of your original purchase date. The request must be submitted via our official support channels.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 mb-10 pb-10 border-b border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center shrink-0 mt-1">
                            <FontAwesomeIcon icon={faTimesCircle} className="text-xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Conditions Where Refund is Not Applicable</h2>
                            <p className="mb-4 leading-relaxed">To protect our instructors' intellectual property, refunds will not be granted in the following scenarios:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>You have consumed or viewed a significant portion (more than 30%) of the course content.</li>
                                <li>You have downloaded the course resources or course materials.</li>
                                <li>You have requested multiple refunds for the same course.</li>
                                <li>The 7-day refund window has passed since the date of purchase.</li>
                                <li>The account making the purchase has been reported for abusive behavior or terms violation.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 mb-10">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center shrink-0 mt-1">
                            <FontAwesomeIcon icon={faClock} className="text-xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Refund Processing Time</h2>
                            <p className="leading-relaxed">
                                Once your refund request is approved, it will be processed immediately on our end. However, depending on your
                                payment method and banking institution, it may take <strong>5 to 10 business days</strong> for the funds to
                                reflect in your account. Refunds are always issued to the original payment method used during purchase.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-indigo-50 dark:bg-gray-700/30 rounded-2xl border border-indigo-100 dark:border-gray-600 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Request a Refund?</h3>
                        <p className="mb-6 max-w-lg mx-auto">
                            Ready to initiate a refund? Simply reach out to our support team with your Invoice ID or Registered Email Address.
                        </p>
                        <a href="mailto:zenlithictechnologies@gmail.com" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">
                            <FontAwesomeIcon icon={faEnvelope} /> Contact Support
                        </a>

                        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-left border-t border-indigo-100/50 dark:border-gray-600 pt-6">
                            <p><strong>Company Details:</strong></p>
                            <p>ZENLITHIC TECHNOLOGIES PRIVATE LIMITED</p>
                            <p>NRI Circle, Pratap Nagar, Jaipur</p>
                            <p>Phone: +91 7791999124</p>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundPolicy;
