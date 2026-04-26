import React, { useState } from "react";

function Certificates() {
    const [template, setTemplate] = useState("classic");

    const recentCertificates = [
        { id: "CERT-001", student: "Alice Johnson", course: "React Masterclass", date: "2026-03-01", status: "Generated" },
        { id: "CERT-002", student: "Bob Smith", course: "Advanced Node.js", date: "2026-02-28", status: "Generated" }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-800">Certificate Management</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
                        <i className="bx bx-certification text-blue-600"></i> Certificate Settings
                    </h3>

                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-6 shadow-sm">
                        <h4 className="font-bold text-slate-700 text-sm mb-4 uppercase">Select Template</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setTemplate('classic')}
                                className={`py-3 px-4 rounded-xl font-bold border-2 transition-colors flex flex-col items-center gap-2 ${template === 'classic' ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                            >
                                <i className="bx bx-image-alt text-3xl"></i>
                                Classic Design
                            </button>
                            <button
                                onClick={() => setTemplate('modern')}
                                className={`py-3 px-4 rounded-xl font-bold border-2 transition-colors flex flex-col items-center gap-2 ${template === 'modern' ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                            >
                                <i className="bx bx-layout text-3xl"></i>
                                Modern Design
                            </button>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Instructor Signature Image</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center bg-white/50 hover:bg-slate-50 transition cursor-pointer">
                                <i className="bx bx-cloud-upload text-3xl text-blue-500 mb-2"></i>
                                <p className="text-slate-600 font-medium text-sm">Upload signature (PNG transparent)</p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Auto-generate on completion</h4>
                                <p className="text-xs text-slate-500 font-medium mt-1">Automatically issue when student hits 100%</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 text-lg">
                            <i className="bx bx-save"></i> Save Settings
                        </button>
                    </form>
                </div>

                <div>
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center h-full min-h-[400px]">
                        <div className="w-full max-w-sm aspect-[1.414/1] bg-white shadow-xl border border-slate-200 flex flex-col relative overflow-hidden transform scale-95 hover:scale-100 transition duration-300 group">
                            <div className="absolute inset-0 border-8 border-double border-orange-200 opacity-50 m-2"></div>
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 z-10">
                                <h2 className="text-3xl font-serif text-slate-800 tracking-widest mb-2">CERTIFICATE</h2>
                                <p className="text-xs tracking-widest text-slate-500 uppercase mb-6">OF COMPLETION</p>

                                <p className="text-[10px] text-slate-400 mb-1">THIS IS PRESENTED TO</p>
                                <h3 className="text-xl font-bold font-serif text-slate-800 mb-6 italic">[ Student Name ]</h3>

                                <p className="text-[9px] text-slate-500 max-w-[80%] mx-auto mb-6">For successfully completing the comprehensive course titled</p>
                                <h4 className="text-sm font-bold text-slate-800 border-b border-slate-300 pb-1 px-4 inline-block mb-8">[ Course Title ]</h4>

                                <div className="flex justify-between w-full px-6 mt-auto">
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-px bg-slate-800 mb-1"></div>
                                        <p className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">Date</p>
                                    </div>
                                    <div className="w-10 h-10 border-2 border-orange-300 rounded-full flex items-center justify-center opacity-50">
                                        <i className="bx bxs-check-shield text-xl text-orange-400"></i>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-px bg-slate-800 mb-1"></div>
                                        <p className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">Signature</p>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Overlay */}
                            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition flex items-center justify-center z-20">
                                <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                                    <i className="bx bx-expand"></i> Full Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">Recent Certificates</h3>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm">
                                <th className="p-4 font-semibold border-b border-slate-200">ID / Date</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Student</th>
                                <th className="p-4 font-semibold border-b border-slate-200">Course</th>
                                <th className="p-4 font-semibold border-b border-slate-200 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentCertificates.map((cert) => (
                                <tr key={cert.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition duration-150">
                                    <td className="p-4 flex flex-col">
                                        <span className="font-bold text-slate-800 text-xs font-mono">{cert.id}</span>
                                        <span className="text-sm text-slate-500 font-medium mt-0.5">{cert.date}</span>
                                    </td>
                                    <td className="p-4 font-bold text-slate-700">{cert.student}</td>
                                    <td className="p-4 font-medium text-blue-600">{cert.course}</td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <button className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" title="View">
                                            <i className="bx bx-show text-lg"></i>
                                        </button>
                                        <button className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors" title="Download PDF">
                                            <i className="bx bx-download text-lg"></i>
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

export default Certificates;
