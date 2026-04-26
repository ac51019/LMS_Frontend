import React from 'react';

function Wishlist() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Wishlist</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col gap-6">
                    {[
                        { title: "Machine Learning A-Z", instructor: "Kirill Eremenko", price: 499, original: 3499, rating: 4.6 },
                        { title: "Complete Node.js Developer Course", instructor: "Andrew Mead", price: 389, original: 3899, rating: 4.7 }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0 items-start md:items-center">
                            <div className="w-full md:w-48 h-28 bg-gray-200 rounded-lg shrink-0"></div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 hover:text-indigo-600 transition cursor-pointer">{item.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{item.instructor}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-amber-500 font-bold text-sm">{item.rating}</span>
                                            <i className="bx bxs-star text-amber-500 text-sm"></i>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-2xl text-slate-900">₹{item.price}</div>
                                        <div className="text-sm text-gray-400 line-through">₹{item.original}</div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-6 items-center">
                                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm flex items-center gap-2">
                                        <i className="bx bx-cart text-lg"></i> Add to Cart
                                    </button>
                                    <button className="text-red-500 hover:text-red-600 flex items-center gap-1 font-medium transition">
                                        <i className="bx bx-trash"></i> Remove
                                    </button>
                                    <div className="ml-auto">
                                        <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-100 uppercase tracking-widest">Sale ends in 5h</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
