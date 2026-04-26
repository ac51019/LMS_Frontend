import React, { useEffect } from "react";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Navbar page="terms" />
            <main className="pt-28 pb-20 max-w-[900px] mx-auto px-6">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
                    <p className="text-gray-500 dark:text-gray-400">Last Updated: March 2026</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 prose prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-0">1. Introduction</h2>
                    <p className="mb-6 leading-relaxed">
                        Welcome to ZeLMS, operated by <strong>ZENLITHIC TECHNOLOGIES PRIVATE LIMITED</strong> ("Company", "we", "our", "us").
                        By accessing or using our website, services, and platform, you agree to be bound by these Terms of Service.
                        If you do not agree with any part of these terms, you must abstain from using our services.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">2. User Accounts</h2>
                    <p className="mb-6 leading-relaxed">
                        When you create an account with us, you guarantee that you are above the age of 18 or have parental consent,
                        and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete,
                        or obsolete information may result in the immediate termination of your account. You are responsible for
                        maintaining the confidentiality of your account and password.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">3. Course Purchases</h2>
                    <p className="mb-6 leading-relaxed">
                        When you purchase a course, you are granted a limited, non-exclusive, non-transferable license to access
                        and view the course content for which you have paid all required fees, solely for your personal, non-commercial,
                        educational purposes. You may not reproduce, redistribute, transmit, assign, sell, broadcast, rent, share, lend,
                        modify, adapt, edit, create derivative works of, sub-license, or otherwise transfer or use any course.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">4. Instructor Responsibilities</h2>
                    <p className="mb-6 leading-relaxed">
                        Instructors utilizing our platform must ensure they possess the necessary rights and licenses for the content
                        they upload. Instructors agree not to submit any content that infringes upon the intellectual property of a third party,
                        promotes illegal activities, or violates any applicable laws or community guidelines.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">5. Payments & Pricing</h2>
                    <p className="mb-6 leading-relaxed">
                        All prices are subject to change without notice. We reserve the right to modify or discontinue any service or course
                        without prior notice. We shall not be liable to you or any third part for any modification, price change, suspension,
                        or discontinuance of the Service. Payments are processed securely via encrypted payment gateways.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">6. Intellectual Property</h2>
                    <p className="mb-6 leading-relaxed">
                        The Service and its original content (excluding Content provided by instructors or users), features, and functionality
                        are and will remain the exclusive property of ZENLITHIC TECHNOLOGIES PRIVATE LIMITED and its licensors.
                        The Service is protected by copyright, trademark, and other laws of India and foreign countries.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">7. Prohibited Activities</h2>
                    <p className="mb-4 leading-relaxed">You agree not to engage in any of the following prohibited activities:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Copying, distributing, or disclosing any part of the Service in any medium.</li>
                        <li>Using any automated system, including "robots," "spiders," "offline readers," etc., to access the Service.</li>
                        <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers.</li>
                        <li>Taking any action that imposes an unreasonable or disproportionately large load on our infrastructure.</li>
                        <li>Uploading invalid data, viruses, worms, or other software agents.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">8. Limitation of Liability</h2>
                    <p className="mb-6 leading-relaxed">
                        In no event shall ZENLITHIC TECHNOLOGIES PRIVATE LIMITED, nor its directors, employees, partners, agents, suppliers,
                        or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without
                        limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of
                        or inability to access or use the Service.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">9. Termination</h2>
                    <p className="mb-6 leading-relaxed">
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever,
                        including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">10. Governing Law</h2>
                    <p className="mb-6 leading-relaxed">
                        These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                        Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Jaipur, Rajasthan.
                    </p>

                    <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Contact Us</h3>
                        <p className="mb-1"><strong>ZENLITHIC TECHNOLOGIES PRIVATE LIMITED</strong></p>
                        <p className="mb-1">NRI Circle, Pratap Nagar, Jaipur</p>
                        <p className="mb-1">Phone: +91 7791999124</p>
                        <p>Email: <a href="mailto:zenlithictechnologies@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">zenlithictechnologies@gmail.com</a></p>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
