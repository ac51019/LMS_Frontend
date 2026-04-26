import React, { useState } from "react";

function ReviewsRatings() {
    const [filterRating, setFilterRating] = useState("all");

    const reviews = [
        { id: 1, student: "Alice Johnson", course: "React Masterclass", rating: 5, date: "2026-03-02", comment: "Excellent course! Explained very well. Highly recommended.", replied: true, reported: false },
        { id: 2, student: "Bob Smith", course: "Advanced Node.js", rating: 4, date: "2026-02-28", comment: "Good course, but I wish there were more assignments.", replied: false, reported: false },
        { id: 3, student: "Charlie Brown", course: "React Masterclass", rating: 3, date: "2026-02-20", comment: "It was okay, moving a bit too fast in the hooks section.", replied: false, reported: false },
        { id: 4, student: "Diana Prince", course: "Next.js for Beginners", rating: 1, date: "2026-03-01", comment: "Spam content. Do not buy.", replied: false, reported: true },
    ];

    const filteredReviews = reviews.filter(rev => {
        if (filterRating === "all") return true;
        return rev.rating === parseInt(filterRating);
    });

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Reviews & Ratings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center">
                    <p className="text-6xl font-extrabold text-blue-600 mb-2">4.8</p>
                    <div className="flex gap-1 text-yellow-400 text-xl mb-2">
                        <i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star-half"></i>
                    </div>
                    <p className="text-slate-500 font-bold">Course Rating</p>
                </div>

                <div className="col-span-2 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-slate-700 font-bold text-lg mb-4">Rating Breakdown</h3>
                    <div className="space-y-3 shrink-0">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-4">
                                <div className="flex gap-1 text-yellow-500 text-sm min-w-[50px]">
                                    {star} <i className="bx bxs-star"></i>
                                </div>
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%` }}></div>
                                </div>
                                <span className="text-slate-500 text-xs font-bold min-w-[30px]">{star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Student Reviews</h3>
                <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-slate-700 font-medium"
                >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
            </div>

            <div className="space-y-6">
                {filteredReviews.map((review) => (
                    <div key={review.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                    {review.student}
                                    {review.reported && <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold flex items-center gap-1"><i className="bx bx-error"></i> Reported</span>}
                                </h4>
                                <p className="text-slate-500 text-sm font-medium">{review.course} • <span className="text-slate-400">{review.date}</span></p>
                            </div>
                            <div className="flex gap-1 text-yellow-500 text-lg">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className={i < review.rating ? "bx bxs-star" : "bx bx-star text-slate-300"}></i>
                                ))}
                            </div>
                        </div>

                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl italic font-medium">"{review.comment}"</p>

                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            {!review.reported && (
                                <button className="text-red-500 hover:text-red-700 font-bold text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition flex items-center gap-1">
                                    <i className="bx bx-flag"></i> Report Abuse
                                </button>
                            )}
                            <button className={`font-bold text-sm px-6 py-2 rounded-xl transition shadow-sm flex items-center gap-2 ${review.replied ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                                <i className={`bx ${review.replied ? 'bx-check-double' : 'bx-reply'}`}></i>
                                {review.replied ? 'Replied' : 'Reply to Review'}
                            </button>
                        </div>
                    </div>
                ))}

                {filteredReviews.length === 0 && (
                    <div className="text-center p-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <i className="bx bx-message-square-x text-5xl text-slate-300 mb-3 block"></i>
                        <p className="text-slate-500 font-medium">No reviews found for the selected filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReviewsRatings;
