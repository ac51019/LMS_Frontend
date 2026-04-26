import React, { useState } from "react";
import { formatCurrency } from "../../../utils/currency";

function Payouts() {
    const [payoutMethod, setPayoutMethod] = useState("bank");

    const availableBalance = 45000;
    const MINIMUM_PAYOUT = 5000;

    const payoutHistory = [
        { id: "PAY-2039", date: "2026-02-01", amount: 35000, method: "Bank Transfer", status: "Approved" },
        { id: "PAY-1082", date: "2026-01-01", amount: 25000, method: "UPI", status: "Approved" },
        { id: "PAY-0563", date: "2025-12-01", amount: 5000, method: "Bank Transfer", status: "Rejected", note: "Invalid Account Number" },
    ];

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Payouts</h2>
                <div className="bg-indigo-50 border border-indigo-200 px-6 py-2 rounded-xl">
                    <p className="text-indigo-600 text-sm font-bold uppercase tracking-wide">Available Balance</p>
                    <p className="text-2xl font-extrabold text-indigo-900">{formatCurrency(availableBalance)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <i className="bx bx-wallet text-blue-600"></i> Request Payout
                    </h3>

                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-6 shadow-sm">
                        <p className="font-bold text-slate-700 text-sm mb-4 uppercase">Select Payout Method</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setPayoutMethod('bank')}
                                className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-colors ${payoutMethod === 'bank' ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                            >
                                <i className="bx bxs-bank mr-2"></i> Bank Transfer
                            </button>
                            <button
                                onClick={() => setPayoutMethod('upi')}
                                className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-colors ${payoutMethod === 'upi' ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                            >
                                <i className="bx bx-mobile-alt mr-2"></i> UPI Options
                            </button>
                        </div>
                    </div>

                    <form className="space-y-6">
                        {payoutMethod === "bank" ? (
                            <div className="space-y-4 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Account Holder Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Account Number</label>
                                    <input type="text" placeholder="XXXX XXXX XXXX 1234" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">IFSC Code</label>
                                    <input type="text" placeholder="HDFC0001234" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase" />
                                </div>
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">UPI ID</label>
                                <input type="text" placeholder="user@upi" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            </div>
                        )}

                        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                            <p className="text-sm text-slate-500 font-medium">Minimum payout: <span className="text-slate-700 font-bold">{formatCurrency(MINIMUM_PAYOUT)}</span></p>
                            <button
                                type="button"
                                disabled={availableBalance < MINIMUM_PAYOUT}
                                className={`px-8 py-3 rounded-xl font-bold shadow-md transition-all ${availableBalance >= MINIMUM_PAYOUT ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>

                <div>
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                        <i className="bx bxs-pie-chart-alt-2 absolute -right-6 -bottom-6 text-9xl text-white/10"></i>
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-bold">Payout Rules & Information</h3>
                            <ul className="space-y-3 font-medium opacity-90">
                                <li className="flex items-center gap-2"><i className="bx bx-check text-emerald-300 text-xl"></i> Withdrawals process in 3-5 business days.</li>
                                <li className="flex items-center gap-2"><i className="bx bx-check text-emerald-300 text-xl"></i> A 30-day refund grace period applies to newly generated revenue.</li>
                                <li className="flex items-center gap-2"><i className="bx bx-check text-emerald-300 text-xl"></i> Payments are processed by our secure partnered gateway.</li>
                                <li className="flex flex-start gap-2 items-center"><i className="bx bx-info-circle text-xl text-blue-200"></i> Platform fee structure is strictly 15% out of total gross revenue unless negotiated.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">Payout History</h3>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm">
                                <th className="p-4 font-semibold border-b border-slate-200">Payout ID</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Date</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Amount (INR ₹)</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Method</th>
                                <th className="p-4 font-semibold border-b border-slate-200 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payoutHistory.map((payout) => (
                                <tr key={payout.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition duration-150">
                                    <td className="p-4 font-bold text-slate-800">{payout.id}</td>
                                    <td className="p-4 font-medium text-slate-600">{payout.date}</td>
                                    <td className="p-4 font-bold text-slate-800">{formatCurrency(payout.amount)}</td>
                                    <td className="p-4 text-slate-600 font-medium">
                                        <span className="flex items-center gap-1">
                                            {payout.method === "UPI" ? <i className="bx bx-mobile-alt"></i> : <i className="bx bxs-bank"></i>} {payout.method}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${payout.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                            payout.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                            }`} title={payout.note}>
                                            {payout.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Payouts;
