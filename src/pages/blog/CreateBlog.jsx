import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../../redux/slices/blogSlice';
import Navbar from '../../Components/common/Navbar';
import Footer from '../../Components/common/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector(state => state.blog);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return alert("Title and Content are required");

        const blogData = {
            title,
            content,
            tags,
            featuredImageUrl: imageUrl
        };

        const resultAction = await dispatch(createBlog(blogData));
        if (createBlog.fulfilled.match(resultAction)) {
            navigate('/blog');
        } else {
            alert('Failed to create blog');
        }
    };

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Navbar page="blog" />
            <main className="pt-24 pb-20 max-w-4xl mx-auto px-6">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Create New Blog Post</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Blog Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter an engaging title..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Content (HTML allowed)</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="<p>Start writing your amazing story...</p>"
                                className="w-full h-64 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white resize-none font-mono text-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category / Tags</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="e.g. Programming, Career Guidance"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Featured Image URL (Optional)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                                    />
                                    <FontAwesomeIcon icon={faImage} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end gap-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => navigate('/blog')}
                                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:bg-indigo-400 transition flex items-center gap-2 shadow-md"
                            >
                                {status === 'loading' ? 'Publishing...' : <><FontAwesomeIcon icon={faPaperPlane} /> Publish Blog</>}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreateBlog;
