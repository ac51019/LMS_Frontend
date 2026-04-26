import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";

const BlogCategory = () => {
    const { categorySlug } = useParams();

    // Format slug back to display text
    const categoryName = categorySlug
        ? categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "All Categories";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categorySlug]);

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Navbar page="blog" />
            <main className="pt-28 pb-20 max-w-[1200px] mx-auto px-6">

                <div className="mb-10">
                    <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium mb-4 inline-block">
                        &larr; Back to Blog
                    </Link>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white capitalize">
                        {categoryName}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Showing newest articles in this category.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Skeleton/Placeholder layout since API doesn't exist yet */}
                    {[1, 2, 3, 4, 5, 6].map(item => (
                        <div key={item} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            <div className="p-5">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3 animate-pulse"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default BlogCategory;
