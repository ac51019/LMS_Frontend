import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedinIn, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faClock, faUserCircle, faHeart, faStar, faLightbulb, faComments, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, fetchComments, reactToBlog, deleteBlogItem } from "../../redux/slices/blogSlice";
import CommentSection from "../../Components/blog/CommentSection";
import { useBlogWebSocket } from "../../hooks/useBlogWebSocket";
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
    const { slug } = useParams(); // Using slug to represent ID for simplicity in our setup
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useBlogWebSocket();

    const { currentBlog, comments, status } = useSelector(state => state.blog);
    const { user, isAuthenticated } = useSelector(state => state.auth || { isAuthenticated: false });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (slug) {
            dispatch(fetchBlogById(slug));
            dispatch(fetchComments(slug));
        }
    }, [slug, dispatch]);

    const handleReaction = (reactionType) => {
        if (!isAuthenticated) return alert("Please log in to react.");
        dispatch(reactToBlog({ blogId: currentBlog.id, reactionType }));
    };

    const handleDeleteBlog = async () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            await dispatch(deleteBlogItem(currentBlog.id));
            navigate('/blog');
        }
    };

    const isAuthorOrAdmin = user && currentBlog && (user.id === currentBlog.authorId || user.role === 'ROLE_ADMIN' || user.role === 'ROLE_SUPER_ADMIN');

    if (status === 'loading' || !currentBlog) {
        return (
            <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen">
                <Navbar page="blog" />
                <main className="pt-24 pb-20 max-w-[1000px] mx-auto text-center dark:text-gray-200">
                    <p>Loading blog content...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Navbar page="blog" />
            <main className="pt-24 pb-20">

                {/* Cover Image */}
                <div className="max-w-[1000px] mx-auto px-6 mb-8">
                    <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium mb-6 inline-block">
                        &larr; Back to Blog
                    </Link>
                    <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-lg mb-8 relative">
                        <img src={currentBlog.featuredImageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"} alt={currentBlog.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-10">
                            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md mb-2">
                                {currentBlog.tags || 'General'}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                        {currentBlog.title}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 dark:border-gray-700 pb-6 mb-10">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 overflow-hidden shadow-sm">
                                {currentBlog.authorProfileImage ? <img src={`data:image/jpeg;base64,${currentBlog.authorProfileImage}`} alt="profile" /> : <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white transition-colors">
                                    {currentBlog.authorName} <span className="text-xs text-indigo-500">({currentBlog.authorRole})</span>
                                </p>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <span>{new Date(currentBlog.createdAt).toLocaleDateString()}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500 mr-2">Share:</span>
                            <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-400 hover:bg-blue-400 hover:text-white flex items-center justify-center transition-colors">
                                <FontAwesomeIcon icon={faTwitter} />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white flex items-center justify-center transition-colors">
                                <FontAwesomeIcon icon={faWhatsapp} />
                            </button>
                            {isAuthorOrAdmin && (
                                <button onClick={handleDeleteBlog} className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-[800px] mx-auto px-6">
                    <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: currentBlog.content }}
                    ></div>

                    {/* Engagement */}
                    <div className="mt-12 py-6 border-y border-gray-200 dark:border-gray-700 flex justify-center items-center gap-4">
                        <button onClick={() => handleReaction('LIKE')} className="flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-colors font-medium text-gray-600 dark:text-gray-400">
                            <FontAwesomeIcon icon={faHeart} className={currentBlog.likeCount > 0 ? "text-red-500" : ""} />
                            <span className="text-xs">{currentBlog.likeCount || 0} Likes</span>
                        </button>
                        <button onClick={() => handleReaction('LOVE')} className="flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-pink-50 hover:text-pink-500 hover:border-pink-500 transition-colors font-medium text-gray-600 dark:text-gray-400">
                            <span role="img" aria-label="love">💖</span>
                            <span className="text-xs">{currentBlog.loveCount || 0} Loves</span>
                        </button>
                        <button onClick={() => handleReaction('HELPFUL')} className="flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500 transition-colors font-medium text-gray-600 dark:text-gray-400">
                            <FontAwesomeIcon icon={faStar} className={currentBlog.helpfulCount > 0 ? "text-blue-500" : ""} />
                            <span className="text-xs">{currentBlog.helpfulCount || 0} Helpful</span>
                        </button>
                        <button onClick={() => handleReaction('INSIGHTFUL')} className="flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-yellow-50 hover:text-yellow-500 hover:border-yellow-500 transition-colors font-medium text-gray-600 dark:text-gray-400">
                            <FontAwesomeIcon icon={faLightbulb} className={currentBlog.insightfulCount > 0 ? "text-yellow-500" : ""} />
                            <span className="text-xs">{currentBlog.insightfulCount || 0} Insightful</span>
                        </button>
                    </div>

                    {/* Author Box */}
                    <div className="mt-10 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start border border-gray-100 dark:border-gray-700">
                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 shrink-0 overflow-hidden shadow border border-gray-300 dark:border-gray-600">
                            {currentBlog.authorProfileImage ? <img src={`data:image/jpeg;base64,${currentBlog.authorProfileImage}`} alt="profile" /> : <FontAwesomeIcon icon={faUserCircle} className="text-5xl" />}
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{currentBlog.authorName}</h3>
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-3">{currentBlog.authorRole}</p>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">Dedicated educator and tech enthusiast. Always excited to share profound knowledge from vast experience.</p>
                        </div>
                    </div>

                    <CommentSection blogId={currentBlog.id} comments={comments} />

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPost;
