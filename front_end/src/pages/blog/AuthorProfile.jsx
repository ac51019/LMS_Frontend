import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faGlobe, faCertificate } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

const AuthorProfile = () => {
    const { authorId } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [authorId]);

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Navbar page="blog" />
            <main className="pt-24 pb-20 max-w-[1000px] mx-auto px-6">

                {/* Author Header */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 mb-12 flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                        <FontAwesomeIcon icon={faUserCircle} className="text-7xl" />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Alex Morgan</h1>
                            <span className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold px-3 py-1 rounded-full text-xs flex items-center justify-center md:justify-start gap-1 w-max mx-auto md:mx-0">
                                <FontAwesomeIcon icon={faCertificate} /> Verified Instructor
                            </span>
                        </div>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">Senior Technical Author & Developer</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            10+ years shaping the future of web dev. Love writing about React, Node, and System Architecture. Educator at heart, empowering students to reach their full potential.
                        </p>
                        <div className="flex justify-center md:justify-start items-center gap-4">
                            <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-400 hover:bg-blue-400 hover:text-white flex items-center justify-center transition-colors">
                                <FontAwesomeIcon icon={faTwitter} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white flex items-center justify-center transition-colors">
                                <FontAwesomeIcon icon={faGlobe} />
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-indigo-500 pb-2 inline-block">Articles by Alex</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Mocked list */}
                        {[1, 2, 3].map(item => (
                            <div key={item} className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                                <div className="p-6">
                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 block uppercase">Web Development</span>
                                    <Link to="/blog/mock-slug">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                            The Ultimate Guide to Full Stack Development in 2026
                                        </h3>
                                    </Link>
                                    <p className="text-xs text-gray-500">Mar 01, 2026 • 8 min read</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AuthorProfile;
