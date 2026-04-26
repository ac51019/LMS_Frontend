import React from 'react';

function MyCertificates() {
    const certificates = [
        { title: "React Frontend Developer", date: "Oct 12, 2026", duration: "42 Hours", id: "UC-48T7J9H", img: "https://via.placeholder.com/150" },
        { title: "Advanced Node.js Architecture", date: "Sep 05, 2026", duration: "18 Hours", id: "UC-X2B9Y1P", img: "https://via.placeholder.com/150" }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">My Certificates</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {certificates.map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-gray-50 flex gap-6 items-center">
                            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                                <i className="bx bx-certification text-5xl text-indigo-600"></i>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-800">{cert.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">Issued on: {cert.date}</p>
                                <div className="flex gap-2 text-xs font-mono text-gray-400 mb-4 bg-gray-100 p-2 rounded">
                                    ID: {cert.id}
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors shadow-sm text-sm">
                                        Download PDF
                                    </button>
                                    <button className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                                        <i className="bx bxl-linkedin-square text-lg"></i> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyCertificates;
