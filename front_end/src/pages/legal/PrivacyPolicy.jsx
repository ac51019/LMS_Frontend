import React, { useEffect } from "react";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Navbar page="privacy" />
            <main className="pt-28 pb-20 max-w-[900px] mx-auto px-6">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
                    <p className="text-gray-500 dark:text-gray-400">Last Updated: March 2026</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 prose prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-0">Data Collection Explanation</h2>
                    <p className="mb-6 leading-relaxed">
                        At ZENLITHIC TECHNOLOGIES PRIVATE LIMITED, we deeply respect your privacy and are committed to protecting your personal data.
                        This Privacy Policy explains how we collect, use, and safeguard your information when you access our Learning Management System Platform (ZeLMS).
                        By using our services, you consent to the data practices described in this policy.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">What Information We Collect</h2>
                    <p className="mb-4 leading-relaxed">We collect several different types of information for various purposes to provide and improve our Service to you:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Personal Data:</strong> Email address, First name and last name, Phone number, and Billing address.</li>
                        <li><strong>Usage Data:</strong> Information on how the Service is accessed and used, including your IP address, browser type, pages visited, time and date of visit, and course progress.</li>
                        <li><strong>Cookies & Tracking Data:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">How We Use Data</h2>
                    <p className="mb-4 leading-relaxed">We utilize the collected data for various indispensable purposes:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>To provide, maintain, and improve our platform functionality and user experience.</li>
                        <li>To notify you about changes to our Service, upcoming courses, or system updates.</li>
                        <li>To provide customer support and respond to your inquiries.</li>
                        <li>To gather analysis or valuable information so that we can improve our Service.</li>
                        <li>To monitor the usage and track progress of your enrolled courses for certificate generation.</li>
                        <li>To detect, prevent and address technical issues or fraudulent activities.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Cookies Usage</h2>
                    <p className="mb-6 leading-relaxed">
                        Cookies are files with a small amount of data which may include an anonymous unique identifier.
                        We use cookies to maintain your login session, remember your preferences, and understand how you interact with our website.
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies,
                        you may not be able to use some portions of our Service seamlessly.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Third-Party Services</h2>
                    <p className="mb-6 leading-relaxed">
                        We may employ third-party companies and individuals to facilitate our Service ("Service Providers"),
                        to provide the Service on our behalf, to perform Service-related services (such as payment processing securely via platforms like Stripe or Razorpay),
                        or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf
                        and are obligated not to disclose or use it for any other purpose.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Data Security</h2>
                    <p className="mb-6 leading-relaxed">
                        The security of your data is of paramount importance to us. We implement a variety of security measures, including
                        SSL encryption, secure firewall-enabled servers, and regular security audits to maintain the safety of your personal information.
                        However, remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
                        While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">User Rights</h2>
                    <p className="mb-6 leading-relaxed">
                        You have the right to access, update, or to delete the personal information we have on you.
                        Whenever made possible, you can access, update or request deletion of your Personal Data directly within your account settings section.
                        If you are unable to perform these actions yourself, please contact us to assist you. You also have the right to data portability and the right to withdraw consent.
                    </p>

                    <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Contact Us for Privacy Requests</h3>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:</p>
                        <p className="mb-1"><strong>ZENLITHIC TECHNOLOGIES PRIVATE LIMITED</strong></p>
                        <p className="mb-1">NRI Circle, Pratap Nagar, Jaipur</p>
                        <p className="mb-1">Phone: +91 7791999124</p>
                        <p>Email: <a href="mailto:zenlithictechnologies@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">zenlithictechnologies@gmail.com</a></p>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
