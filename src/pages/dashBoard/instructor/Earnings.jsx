import React from "react";
import { formatCurrency } from "../../../utils/currency";

function Earnings() {
    const transactions = [
        { id: "TRX-10293", student: "Alice Johnson", course: "React Masterclass", date: "2026-03-01", amount: 2999 },
        { id: "TRX-10294", student: "Bob Smith", course: "Advanced Node.js", date: "2026-03-02", amount: 1999 },
        { id: "TRX-10295", student: "Charlie Brown", course: "React Masterclass", date: "2026-03-03", amount: 2999 },
    ];

    const PLATFORM_FEE_PERCENTAGE = 15;
    const totalGrossRevenue = 250000;
    const platformFee = (totalGrossRevenue * PLATFORM_FEE_PERCENTAGE) / 100;
    const netEarnings = totalGrossRevenue - platformFee;

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Earnings</h2>
                <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all">
                    <i className="bx bx-download"></i> Download Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                    <i className="bx bx-money text-4xl text-indigo-500 mb-2"></i>
                    <h3 className="text-slate-500 font-bold mb-1">Total Revenue</h3>
                    <p className="text-3xl font-extrabold text-slate-800">{formatCurrency(totalGrossRevenue)}</p>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                    <i className="bx bx-trending-down text-4xl text-rose-500 mb-2"></i>
                    <h3 className="text-slate-500 font-bold mb-1">Platform Fee ({PLATFORM_FEE_PERCENTAGE}%)</h3>
                    <p className="text-3xl font-extrabold text-slate-800 text-rose-600">- {formatCurrency(platformFee)}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                    <i className="bx bx-wallet text-4xl text-emerald-500 mb-2"></i>
                    <h3 className="text-slate-500 font-bold mb-1">Net Earnings</h3>
                    <p className="text-3xl font-extrabold text-slate-800 text-emerald-600">{formatCurrency(netEarnings)}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-10">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <i className="bx bx-bar-chart-alt-2 text-blue-600"></i> Monthly Breakdown
                </h3>
                <div className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-medium">
                    [ Monthly Earnings Chart ]
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <i className="bx bx-list-ol text-blue-600"></i> Recent Transactions
                </h3>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm">
                                <th className="p-4 font-semibold border-b border-slate-200">Transaction ID</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Date</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Student Name</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Course</th>
                                <th className="p-4 font-semibold border-b border-slate-200 text-right">Amount (Gross)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((trx) => (
                                <tr key={trx.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition duration-150">
                                    <td className="p-4 font-bold text-slate-800">{trx.id}</td>
                                    <td className="p-4 font-medium text-slate-600">{trx.date}</td>
                                    <td className="p-4 font-medium text-slate-700">{trx.student}</td>
                                    <td className="p-4 font-medium text-slate-600">{trx.course}</td>
                                    <td className="p-4 font-bold text-emerald-600 text-right">{formatCurrency(trx.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Earnings;
