import React from 'react';

function PurchaseHistory() {
    const history = [
        { title: "Complete Python Bootcamp", date: "Oct 01, 2026", amount: 2499, method: "Credit Card ending in **34", status: "Success", invoiceId: "INV-2026-892" },
        { title: "Advanced CSS and Sass", date: "Sep 15, 2026", amount: 1299, method: "UPI", status: "Success", invoiceId: "INV-2026-641" }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Purchase History</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-200 text-sm text-gray-600 uppercase tracking-wide">
                                <th className="p-5 font-bold">Course / Subscription</th>
                                <th className="p-5 font-bold">Date</th>
                                <th className="p-5 font-bold">Amount</th>
                                <th className="p-5 font-bold">Method</th>
                                <th className="p-5 font-bold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {history.map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition duration-200">
                                    <td className="p-5">
                                        <div className="font-bold text-slate-800 text-base">{item.title}</div>
                                        <div className="text-xs text-gray-400 mt-1 font-mono">Invoice: {item.invoiceId}</div>
                                    </td>
                                    <td className="p-5 text-gray-600 font-medium">
                                        <span className="flex items-center gap-2"><i className="bx bx-calendar text-gray-400 text-lg"></i>{item.date}</span>
                                    </td>
                                    <td className="p-5">
                                        <span className="font-bold text-slate-900 text-lg">₹{item.amount}</span>
                                    </td>
                                    <td className="p-5">
                                        <div className="text-gray-600 text-sm flex items-center gap-2">
                                            {item.method.includes('Credit') ? <i className="bx bxs-credit-card text-indigo-500 text-xl"></i> : <i className="bx bx-mobile text-green-500 text-xl"></i>}
                                            {item.method}
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-100 hover:border-indigo-200 transition font-medium shadow-sm text-sm">
                                            <i className="bx bx-download text-lg"></i> Invoice
                                        </button>
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

export default PurchaseHistory;
