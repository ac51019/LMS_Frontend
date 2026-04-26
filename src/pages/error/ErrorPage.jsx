import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/common/Navbar';
import Footer from '../../Components/common/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600 leading-none select-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 py-1 rounded-full text-indigo-600 font-bold uppercase tracking-widest text-sm shadow-md transform rotate-12">
              Page Not Found
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          Oops! You've lost your way.
        </h2>

        <p className="text-gray-500 max-w-lg mb-10 text-lg leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:text-indigo-600 transition-all duration-300 shadow-sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faHouse} />
            Back to Home
          </Link>
        </div>

        {/* Quick Links / Help Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-500 flex flex-col sm:flex-row items-center gap-4">
          <span>Looking for something specific?</span>
          <Link to="/courses" className="flex items-center gap-2 text-indigo-600 font-medium hover:underline">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Browse Courses
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ErrorPage;