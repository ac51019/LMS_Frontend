import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, createBlog, deleteBlogItem } from "../../../redux/slices/blogSlice";

const BlogManagement = () => {
    const dispatch = useDispatch();
    const { blogs, status } = useSelector(state => state.blog);

    const [activeTab, setActiveTab] = useState("list");
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBlogs());
        }
    }, [dispatch, status]);

    const [categories] = useState([
        { id: 1, name: "Programming", count: 42 },
        { id: 2, name: "Web Dev", count: 18 },
        { id: 3, name: "Career", count: 12 }
    ]);

    const [tags] = useState(["React", "NodeJS", "Interview", "JavaScript", "Python"]);

    // Editor State
    const [editorTitle, setEditorTitle] = useState("");
    const [editorCategory, setEditorCategory] = useState("Programming");
    const [featuredImage, setFeaturedImage] = useState(null);

    const handleEdit = (id) => {
        // Edit functionality logic here if needed
        setActiveTab("edit");
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            dispatch(deleteBlogItem(id));
        }
    };

    // Since our backend doesn't store 'Published' / 'Draft' string directly right now, 
    // let's just default to showing all blogs for this view
    const filteredBlogs = blogs || [];

    const handlePublish = async (status) => {
        if (!editorTitle.trim()) {
            alert("Please enter an Article Title before saving.");
            return;
        }

        const blogData = {
            title: editorTitle,
            tags: editorCategory, // using tags field for category
            content: "<h2>" + editorTitle + "</h2><p>Article generated via Admin Editor.</p>", // basic placeholder, as we normally need a rich text editor state
            featuredImageUrl: featuredImage || ""
        };

        const result = await dispatch(createBlog(blogData));
        if (createBlog.fulfilled.match(result)) {
            setActiveTab("list");
            setEditorTitle("");
            setFeaturedImage(null);
        } else {
            alert("Failed to create blog");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Advanced Blog Module</h2>
                    <p className="text-sm text-gray-500">Full control over your LMS blog articles and SEO properties.</p>
                </div>
                <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                    <button onClick={() => setActiveTab("list")} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'list' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>All Posts</button>
                    <button onClick={() => setActiveTab("edit")} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'edit' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>Blog Editor</button>
                    <button onClick={() => setActiveTab("categories")} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'categories' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>Categories</button>
                    <button onClick={() => setActiveTab("tags")} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'tags' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>Tags</button>
                    <button onClick={() => setActiveTab("analytics")} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>Analytics</button>
                </div>
            </div>

            {/* TAB: BLOG LIST */}
            {activeTab === "list" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex gap-4">
                            {['All', 'Published', 'Draft'].map(stat => (
                                <button key={stat} onClick={() => setFilterStatus(stat)} className={`font-semibold pb-1 border-b-2 transition-colors ${filterStatus === stat ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>{stat}</button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <input type="text" placeholder="Search blogs..." className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-indigo-500 outline-none w-full" />
                            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-indigo-500 outline-none">
                                <option>All Categories</option>
                                {categories.map(c => <option key={c.id}>{c.name}</option>)}
                            </select>
                            <button onClick={() => setActiveTab('edit')} className="bg-indigo-600 text-white rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-indigo-700 shrink-0">
                                + New Post
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600 relative">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Views</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map(blog => (
                                    <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-800">{blog.title}</td>
                                        <td className="px-6 py-4">{blog.tags || 'General'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700`}>
                                                Published
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{blog.likeCount || 0}</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-red-700"><i className="bx bx-trash text-lg"></i></button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredBlogs.length === 0 && (
                                    <tr><td colSpan="6" className="text-center py-8 text-gray-500">No blog posts found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB: BLOG EDITOR */}
            {activeTab === "edit" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Main Content */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Article Title</label>
                            <input type="text" value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)} placeholder="Enter an engaging title..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold text-gray-800" />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-bold text-gray-700">Rich Text Content</label>
                                <div className="text-gray-400 text-lg flex gap-2">
                                    <button className="hover:text-indigo-600"><i className="bx bx-bold"></i></button>
                                    <button className="hover:text-indigo-600"><i className="bx bx-italic"></i></button>
                                    <button className="hover:text-indigo-600"><i className="bx bx-link"></i></button>
                                    <button className="hover:text-indigo-600"><i className="bx bx-image-add"></i></button>
                                    <button className="hover:text-indigo-600"><i className="bx bx-code-block"></i></button>
                                </div>
                            </div>
                            <textarea rows="15" placeholder="Write your awesome content here... (Supports Markdown / HTML / Code Blocks)" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-mono text-sm leading-relaxed custom-scrollbar"></textarea>
                        </div>
                    </div>

                    {/* Right Column - Publishing & SEO Meta */}
                    <div className="w-full lg:w-80 shrink-0 space-y-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                            <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Publish Settings</h3>
                            <button onClick={() => handlePublish("Published")} className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 mb-2 transition">Publish Now</button>
                            <button onClick={() => handlePublish("Draft")} className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 mb-4 transition">Save as Draft</button>

                            <label className="block text-xs font-bold text-gray-600 mb-1">Schedule Publish Date</label>
                            <input type="datetime-local" className="w-full border border-gray-300 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-indigo-500" />
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                            <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2">Organization</h3>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
                                <select value={editorCategory} onChange={(e) => setEditorCategory(e.target.value)} className="w-full border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500 bg-white">
                                    {categories.map(c => <option key={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Tags</label>
                                <input type="text" placeholder="e.g. React, Docker (comma separated)" className="w-full border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Featured Image</label>
                                <label className="block border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-lg h-32 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-50 transition group overflow-hidden relative">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    {featuredImage ? (
                                        <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <i className="bx bx-cloud-upload text-3xl text-indigo-400 group-hover:text-indigo-600 mb-1"></i>
                                            <span className="text-xs text-indigo-500 font-medium">Click to upload image</span>
                                        </>
                                    )}
                                </label>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Recommended LMS Course</label>
                                <select className="w-full border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500 bg-white">
                                    <option>None</option>
                                    <option>Next.js Full Course 2026</option>
                                    <option>Python Data Science</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                            <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-1">SEO Data <i className="bx bx-search-alt text-indigo-600"></i></h3>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Meta Title</label>
                                <input type="text" className="w-full border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500" placeholder="60 max chars" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Meta Description</label>
                                <textarea rows="3" className="w-full border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500" placeholder="150 max chars"></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">URL Slug</label>
                                <input type="text" className="w-full border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500" placeholder="e.g. your-title-here" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: CATEGORIES */}
            {activeTab === "categories" && (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Create Category</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Data Science" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Slug</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. data-science" />
                            </div>
                            <button className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-indigo-700">Add Category</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-x-auto">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Existing Categories</h3>
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 uppercase">
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Posts count</th>
                                    <th className="px-4 py-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(c => (
                                    <tr key={c.id} className="border-b">
                                        <td className="px-4 py-3 font-semibold text-gray-800">{c.name}</td>
                                        <td className="px-4 py-3"><span className="bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded text-xs">{c.count}</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-red-500 hover:text-red-700"><i className="bx bx-trash text-lg"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB: TAGS */}
            {activeTab === "tags" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Manage Blog Tags</h3>
                    <div className="flex gap-4 mb-8">
                        <input type="text" className="border border-gray-300 rounded-lg flex-1 max-w-sm px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Add a new tag... (e.g. Kubernetes)" />
                        <button className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-indigo-700">Add Tag</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {tags.map((t, idx) => (
                            <span key={idx} className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full font-medium flex items-center gap-2 group cursor-default shadow-sm">
                                {t} <i className="bx bx-x text-lg cursor-pointer hover:bg-indigo-200 rounded-full text-indigo-400 group-hover:text-indigo-800 transition"></i>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: ANALYTICS */}
            {activeTab === "analytics" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
                            <i className="bx bx-show text-4xl text-indigo-500 mb-2"></i>
                            <h3 className="text-3xl font-black text-gray-800">45,230</h3>
                            <p className="text-sm font-semibold text-gray-500">Total Blog Views</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
                            <i className="bx bx-file text-4xl text-green-500 mb-2"></i>
                            <h3 className="text-3xl font-black text-gray-800">12</h3>
                            <p className="text-sm font-semibold text-gray-500">Published Posts</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
                            <i className="bx bx-heart text-4xl text-red-500 mb-2"></i>
                            <h3 className="text-3xl font-black text-gray-800">2,109</h3>
                            <p className="text-sm font-semibold text-gray-500">Total Engagements</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Most Popular Posts</h3>
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 uppercase">
                                <tr>
                                    <th className="px-4 py-2">Rank</th>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2 text-right">Views</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3].map(i => (
                                    <tr key={i} className="border-b">
                                        <td className="px-4 py-3 font-bold text-slate-800">#{i}</td>
                                        <td className="px-4 py-3 font-medium">The Ultimate Guide to Full Stack Development in 2026</td>
                                        <td className="px-4 py-3 text-right font-bold text-indigo-600">1,240 <i className="bx bx-up-arrow-alt text-green-500"></i></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogManagement;
