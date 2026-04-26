import React, { useState } from "react";

function CreateCourse() {
    const [step, setStep] = useState(1);

    const renderStep1 = () => (
        <div className="space-y-6 animate-fade-in">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Course Title</label>
                <input type="text" placeholder="e.g. Complete React Developer in 2026" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Course Subtitle</label>
                <input type="text" placeholder="e.g. Master React, Redux, Context API, and more." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-600">
                        <option>Web Development</option>
                        <option>Data Science</option>
                        <option>Design</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Language</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-600">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Level</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-600">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Course Thumbnail</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                    <i className="bx bx-cloud-upload text-4xl text-blue-500 mb-3"></i>
                    <p className="text-slate-600 font-medium">Click or drag image to upload</p>
                    <p className="text-slate-400 text-sm mt-1">Recommended size: 1280x720px (JPG, PNG)</p>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Section 1: Introduction</h3>
                <button className="text-slate-500 hover:text-slate-800"><i className="bx bx-edit text-xl"></i></button>
            </div>
            <div className="pl-6 border-l-2 border-blue-500 space-y-4">
                <div className="group bg-white border border-slate-200 p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                        <i className="bx bx-video text-blue-500 text-xl"></i>
                        <span className="font-medium text-slate-700">1. Welcome to the course</span>
                    </div>
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-slate-400 hover:text-blue-600"><i className="bx bx-edit"></i></button>
                        <button className="text-slate-400 hover:text-red-600"><i className="bx bx-trash"></i></button>
                    </div>
                </div>
                <div className="group bg-white border border-slate-200 p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                        <i className="bx bxs-file-pdf text-red-500 text-xl"></i>
                        <span className="font-medium text-slate-700">2. Course Resources (PDF)</span>
                    </div>
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-slate-400 hover:text-blue-600"><i className="bx bx-edit"></i></button>
                        <button className="text-slate-400 hover:text-red-600"><i className="bx bx-trash"></i></button>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
                <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium">
                    <i className="bx bx-plus"></i> Add Lecture
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition font-medium">
                    <i className="bx bx-plus"></i> Add Quiz
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition font-medium">
                    <i className="bx bx-plus"></i> Add Assignment
                </button>
            </div>
            <hr className="border-slate-200 my-6" />
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 border-dashed bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-800 transition font-bold">
                <i className="bx bx-plus-circle text-xl"></i> Add New Section
            </button>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 border border-slate-200 rounded-xl">
                <label className="flex items-center gap-4 cursor-pointer">
                    <input type="radio" name="pricing" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" value="free" />
                    <span className="font-bold text-slate-800 text-lg">Free Course</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer">
                    <input type="radio" name="pricing" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" value="paid" defaultChecked />
                    <span className="font-bold text-slate-800 text-lg">Paid Course</span>
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price (INR ₹)</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                        <input type="number" placeholder="2999" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Discount Option (%)</label>
                    <input type="number" placeholder="e.g. 15" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl mt-6 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><i className="bx bxs-discount text-blue-500"></i> Course Coupons</h4>
                <div className="flex gap-4">
                    <input type="text" placeholder="Coupon Code" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    <button className="bg-slate-800 text-white px-6 rounded-lg font-medium hover:bg-slate-900 transition whitespace-nowrap">Create Coupon</button>
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6 animate-fade-in">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Visibility</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-600 mb-6">
                    <option>Public</option>
                    <option>Private (Draft)</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Course Description</label>
                <textarea rows="4" placeholder="Detailed description of your course..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">What will students learn?</label>
                <textarea rows="3" placeholder="Enter objectives separated by newline" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Requirements</label>
                <textarea rows="2" placeholder="e.g. Basic understanding of HTML/CSS" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">SEO Tags</label>
                <input type="text" placeholder="react, frontend, web development" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/30">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-8 border-b border-slate-200 pb-4">Create New Course</h2>

                {/* Stepper */}
                <div className="flex justify-between mb-10 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full hidden md:block"></div>
                    <div className="absolute top-1/2 left-0 h-1 bg-blue-500 -z-10 -translate-y-1/2 rounded-full hidden md:block transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>

                    {['Basic Info', 'Curriculum', 'Pricing', 'Publish'].map((label, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 bg-white px-2 cursor-pointer" onClick={() => setStep(index + 1)}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-md transition-colors duration-300 ${step >= index + 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 border-2 border-slate-200'}`}>
                                {step > index + 1 ? <i className="bx bx-check"></i> : index + 1}
                            </div>
                            <span className={`text-sm font-bold ${step >= index + 1 ? 'text-blue-600' : 'text-slate-400'}`}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Form Area */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mt-8">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 border-t border-slate-200 pt-6">
                    <button
                        disabled={step === 1}
                        onClick={() => setStep(step - 1)}
                        className={`px-6 py-3 rounded-lg font-bold shadow-sm transition-all ${step === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-50 border border-slate-300 text-slate-700 hover:bg-slate-100'}`}
                    >
                        Back
                    </button>
                    {step < 4 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                            <i className="bx bx-rocket"></i> Publish Course
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

export default CreateCourse;
