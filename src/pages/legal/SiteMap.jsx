import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";

const SiteMap = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sitemapConfig = [
        {
            title: "Main Pages",
            links: [
                { label: "Home", path: "/" },
                { label: "All Courses", path: "/courses" },
                { label: "Sign In", path: "/login" },
                { label: "Register", path: "/register" },
            ]
        },
        {
            title: "Student Section",
            links: [
                { label: "My Learning", path: "/learnings" },
                { label: "Cart", path: "/cart" },
                { label: "Profile Settings", path: "/profile" },
            ]
        },
        {
            title: "Instructor & Admin",
            links: [
                { label: "Instructor Dashboard", path: "/instructor" },
                { label: "Admin Dashboard", path: "/admin" },
                { label: "Vendor Dashboard", path: "/vendor" },
            ]
        },
        {
            title: "Support & Legal",
            links: [
                { label: "Help Center & FAQ", path: "/help-center" },
                { label: "Terms of Service", path: "/terms" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Refund Policy", path: "/refund" },
            ]
        }
    ];

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300 flex flex-col">
            <Navbar page="sitemap" />
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 pt-28 pb-20">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Site Map</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                        Navigate through our entire platform easily. Find exactly what you're looking for organized by sections.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sitemapConfig.map((section, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-indigo-500 pb-2 inline-block">
                                {section.title}
                            </h2>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link
                                            to={link.path}
                                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors"
                                        >
                                            <span className="text-indigo-500 text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all">▹</span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default SiteMap;
