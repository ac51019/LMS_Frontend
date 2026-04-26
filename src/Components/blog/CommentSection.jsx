import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentItem, deleteCommentItem } from '../../redux/slices/blogSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faUserCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ comment, depth = 0 }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.auth || { isAuthenticated: false });
    const [replying, setReplying] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    const isAuthorOrAdmin = user && (user.id === comment.userId || user.role === 'ROLE_ADMIN' || user.role === 'ROLE_SUPER_ADMIN');

    const handleReply = (e) => {
        e.preventDefault();
        if (!replyContent.trim()) return;
        dispatch(addCommentItem({
            blogId: comment.blogId,
            parentCommentId: comment.id,
            content: replyContent
        }));
        setReplyContent('');
        setReplying(false);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            dispatch(deleteCommentItem(comment.id));
        }
    };

    return (
        <div className={`mt-4 ${depth > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
            <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 overflow-hidden shrink-0">
                    {comment.userProfileImage ? <img src={`data:image/jpeg;base64,${comment.userProfileImage}`} alt="profile" /> : <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />}
                </div>
                <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{comment.userName} <span className="text-xs font-normal text-indigo-500">({comment.userRole})</span></h4>
                                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.content}</p>
                    </div>

                    <div className="flex gap-4 mt-2 text-xs font-semibold text-gray-500">
                        <button onClick={() => setReplying(!replying)} className="hover:text-indigo-600 flex items-center gap-1">
                            <FontAwesomeIcon icon={faReply} /> Reply
                        </button>
                        {isAuthorOrAdmin && (
                            <button onClick={handleDelete} className="hover:text-red-600 flex items-center gap-1">
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                        )}
                    </div>

                    {replying && (
                        <form onSubmit={handleReply} className="mt-3 flex gap-2">
                            <input
                                type="text"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder={isAuthenticated ? "Write a reply..." : "Please log in to reply..."}
                                disabled={!isAuthenticated}
                                className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:ring-1 focus:ring-indigo-500 outline-none"
                            />
                            <button disabled={!isAuthenticated} type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 hover:bg-indigo-700 transition-colors">
                                Post
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-2">
                    {comment.replies.map(reply => (
                        <Comment key={reply.id} comment={reply} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const CommentSection = ({ blogId, comments }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth || { isAuthenticated: false });
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        dispatch(addCommentItem({
            blogId,
            parentCommentId: null,
            content: newComment
        }));
        setNewComment('');
    };

    return (
        <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Comments ({comments ? comments.length : 0})</h3>

            <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 overflow-hidden shrink-0">
                    <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
                </div>
                <div className="flex-1">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={isAuthenticated ? "Add a comment..." : "Please log in to comment..."}
                        disabled={!isAuthenticated}
                        rows="3"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button disabled={!isAuthenticated} type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow">
                            Post Comment
                        </button>
                    </div>
                </div>
            </form>

            <div className="space-y-6">
                {comments && comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
