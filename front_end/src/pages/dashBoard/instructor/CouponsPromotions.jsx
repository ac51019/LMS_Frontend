import React, { useState } from "react";
import { formatCurrency } from "../../../utils/currency";

function CouponsPromotions() {
    const [discountType, setDiscountType] = useState("percentage");

    const coupons = [
        { id: 1, code: "SUMMER20", course: "All Courses", value: "20%", expiry: "2026-06-30", limit: "100/500", status: "Active" },
        { id: 2, code: "REACTMASTER", course: "React Masterclass", value: formatCurrency(500), expiry: "2026-03-15", limit: "50/50", status: "Expired" }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Coupons & Promotions</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
                        <i className="bx bxs-discount text-blue-600"></i> Create New Coupon
                    </h3>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Coupon Code</label>
                            <div className="relative">
                                <input type="text" placeholder="e.g. FLASH50" className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase font-mono font-bold tracking-wider text-slate-800" />
                                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-xs bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition whitespace-nowrap">Auto Generate</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Discount Type</label>
                                <select
                                    value={discountType}
                                    onChange={(e) => setDiscountType(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 font-medium"
                                >
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed">Fixed Amount (₹)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Value</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">{discountType === 'fixed' ? '₹' : ''}</span>
                                    <input type="number" placeholder={discountType === 'percentage' ? '20' : '500'} className={`w-full pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium ${discountType === 'fixed' ? 'pl-8' : 'pl-4'}`} />
                                    {discountType === 'percentage' && <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">%</span>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Target Course(s)</label>
                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 font-medium">
                                <option value="all">All My Courses</option>
                                <option value="react">React Masterclass</option>
                                <option value="node">Advanced Node.js</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">Expiry Date <i className="bx bx-info-circle text-slate-400" title="Leave blank for no expiry"></i></label>
                                <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">Usage Limit <i className="bx bx-info-circle text-slate-400" title="Leave blank for unlimited"></i></label>
                                <input type="number" placeholder="100" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 font-medium" />
                            </div>
                        </div>

                        <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 text-lg">
                            <i className="bx bx-plus-circle"></i> Create Coupon
                        </button>
                    </form>
                </div>

                <div>
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-3xl p-8 mb-8 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden">
                        <i className="bx bx-line-chart absolute -right-4 -bottom-4 text-8xl text-indigo-500/10"></i>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Promotional Sales Dashboard</h3>
                        <p className="text-slate-500 font-medium mb-6">Track how your coupons are performing.</p>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                <p className="text-3xl font-extrabold text-emerald-600 mb-1">{formatCurrency(45000)}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Revenue via Coupons</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                <p className="text-3xl font-extrabold text-blue-600 mb-1">150</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Redemptions</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Active & Past Coupons</h3>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-sm">
                                    <th className="p-4 font-semibold border-b border-slate-200">Code / Course</th>
                                    <th className="p-4 font-semibold border-b border-slate-200">Value</th>
                                    <th className="p-4 font-semibold border-b border-slate-200">Usage</th>
                                    <th className="p-4 font-semibold border-b border-slate-200 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon) => (
                                    <tr key={coupon.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition duration-150">
                                        <td className="p-4 flex flex-col">
                                            <span className="font-bold text-slate-800 font-mono tracking-wider">{coupon.code}</span>
                                            <span className="text-xs text-blue-600 font-medium mt-0.5 max-w-[120px] truncate" title={coupon.course}>{coupon.course}</span>
                                        </td>
                                        <td className="p-4 font-bold text-slate-700">{coupon.value}</td>
                                        <td className="p-4 text-slate-500 font-medium">
                                            {coupon.limit.split('/')[0]} / <span className="text-slate-400">{coupon.limit.split('/')[1]}</span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${coupon.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                {coupon.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CouponsPromotions;
