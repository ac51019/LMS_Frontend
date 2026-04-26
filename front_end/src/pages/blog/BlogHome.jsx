import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClock, faUserCircle, faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/slices/blogSlice";
import { useBlogWebSocket } from "../../hooks/useBlogWebSocket";

const BlogHome = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blogs, status } = useSelector(state => state.blog);
    const { user, isAuthenticated } = useSelector(state => state.auth || { isAuthenticated: false });
    useBlogWebSocket();

    const [searchQuery, setSearchQuery] = useState("");

    const categories = [
        "Programming", "Web Development", "AI & Machine Learning",
        "Data Science", "Career Guidance", "Cyber Security"
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        if (status === 'idle') {
            dispatch(fetchBlogs());
        }
    }, [dispatch, status]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/blog/category/search?q=${searchQuery}`);
        }
    };

    let featuredBlog = null;
    let recentBlogs = [];
    let trendingBlogs = [];

    if (blogs && blogs.length > 0) {
        featuredBlog = blogs[0];
        recentBlogs = blogs.slice(1, 5);
        trendingBlogs = [...blogs].sort((a, b) => b.likeCount - a.likeCount).slice(0, 5);
    }

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Navbar page="blog" />
            <main className="pt-24 pb-20">

                {/* Header Section */}
                <div className="max-w-[1200px] mx-auto px-6 mb-12">
                    <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">ZeLMS Blog</h1>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">Insights, tutorials, and career advice from experts.</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <form onSubmit={handleSearch} className="relative w-full md:w-80">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm dark:text-gray-100"
                                />
                                <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </form>
                            {isAuthenticated && (
                                <button
                                    onClick={() => navigate('/blog/create')}
                                    className="px-6 py-3 ml-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow transition-all whitespace-nowrap"
                                >
                                    <FontAwesomeIcon icon={faPen} className="mr-2" /> Write
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                        {categories.map((cat, idx) => (
                            <Link
                                key={idx}
                                to={`/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-10">

                    {/* Left Column (Featured & Latest) */}
                    <div className="lg:col-span-2 space-y-12">
                        {blogs && blogs.length === 0 && (
                            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Blogs Yet!</h2>
                                <p className="text-gray-500 max-w-md mx-auto mb-8">It is quiet here... Be the first to publish a blog and share your knowledge with the community.</p>
                                {isAuthenticated ? (
                                    <button onClick={() => navigate('/blog/create')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow transition-all">
                                        <FontAwesomeIcon icon={faPen} className="mr-2" /> Write the First Blog
                                    </button>
                                ) : (
                                    <button onClick={() => navigate('/login')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow transition-all">
                                        Log in to Write
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Featured Post */}
                        {featuredBlog && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block"></span> Featured Article
                                </h2>
                                <div
                                    onClick={() => navigate(`/blog/${featuredBlog.id}`)}
                                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
                                >
                                    <div className="h-64 sm:h-80 overflow-hidden relative">
                                        <img src={featuredBlog.featuredImageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            {featuredBlog.tags || 'General'}
                                        </span>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {featuredBlog.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg line-clamp-2" dangerouslySetInnerHTML={{ __html: featuredBlog.content.substring(0, 150) + "..." }}></p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
                                                    {featuredBlog.authorProfileImage ? <img src={`data:image/jpeg;base64,${featuredBlog.authorProfileImage}`} alt="profile" className="object-cover w-full h-full" /> : <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{featuredBlog.authorName} <span className="text-xs text-indigo-500">({featuredBlog.authorRole})</span></p>
                                                    <p className="text-xs text-gray-500 flex items-center gap-1"><FontAwesomeIcon icon={faClock} className="w-3" /> {new Date(featuredBlog.createdAt).toLocaleDateString()} • {featuredBlog.likeCount} Likes</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Latest Articles */}
                        {recentBlogs.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span> Latest Articles
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {recentBlogs.map(blog => (
                                        <div
                                            key={blog.id}
                                            onClick={() => navigate(`/blog/${blog.id}`)}
                                            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all flex flex-col h-full"
                                        >
                                            <div className="h-48 overflow-hidden relative">
                                                <img src={blog.featuredImageUrl || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800"} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-gray-800 dark:text-gray-200 text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                                                    {blog.tags || 'General'}
                                                </span>
                                            </div>
                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) }}></p>
                                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                                    <span>{blog.authorName}</span>
                                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-10">

                        {/* Trending Articles */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
                                Trending 🔥
                            </h3>
                            <div className="space-y-6">
                                {trendingBlogs.length > 0 ? trendingBlogs.map((post, idx) => (
                                    <div key={post.id} onClick={() => navigate(`/blog/${post.id}`)} className="flex gap-4 group cursor-pointer">
                                        <span className="text-3xl font-black text-gray-200 dark:text-gray-700">0{idx + 1}</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-1">
                                                {post.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{post.authorName} • {new Date(post.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                )) : <p className="text-gray-500">No trending blogs yet.</p>}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogHome;
