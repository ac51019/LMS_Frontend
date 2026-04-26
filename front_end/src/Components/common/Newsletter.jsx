import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Newsletter() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Subscribed successfully!");
      setEmail("");
    } else {
      setMessage("Please enter a valid email.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    // <div className="min-h-screen"></div>
    <newsletter className=" bg-[#f8fafc] dark:bg-gray-900  text-gray-800 dark:text-gray-200 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <div className="text-center group inline-block mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Stay Updated
          </h2>

          <span className="block h-[3px] w-12 bg-indigo-500 mx-auto transition-all duration-300 group-hover:w-full"></span>
        </div>

        <p className=" bg-[#f8fafc] dark:bg-gray-900  text-gray-800 dark:text-gray-200 transition-colors duration-300 mb-8">
          Subscribe to our newsletter and never miss an update.
        </p>

        {/* Newsletter Form */}
        <form
          onSubmit={handleSubscribe}
          className="max-w-md mx-auto flex items-center bg-gray-900 rounded-lg overflow-hidden"
        >
          <div className="relative group flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full bg-transparent text-white text-sm
                px-2 py-3 outline-none
                border-b border-gray-600
                transition-all duration-300
                focus:border-indigo-400
                placeholder:text-gray-400
                "
            />

            <span className="
                absolute left-0 bottom-0 h-[2px] w-0
                bg-indigo-500
                transition-all duration-300
                group-focus-within:w-full
                ">
            </span>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-3 transition"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-3 text-sm ${message.includes("success")
                ? "text-green-300"
                : "text-red-300"
              }`}
          >
            {message}
          </p>
        )}

        {/* App Buttons */}
       <div className="flex justify-center items-center gap-6 mt-12 flex-wrap">

  {/* GOOGLE PLAY */}
  <a
    href="https://play.google.com"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 bg-gray-900/90 backdrop-blur-md 
    border border-gray-700 hover:border-indigo-500 
    px-6 py-4 rounded-xl shadow-lg 
    hover:shadow-indigo-500/20 
    transition-all duration-300 hover:-translate-y-1"
  >
    {/* Logo */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      alt="Google Play"
      className="w-8 h-8 object-contain"
    />

    {/* Text */}
    <div className="flex flex-col leading-tight">
      <span className="text-xs text-gray-400">
        GET IT ON
      </span>
      <span className="text-base font-semibold text-white group-hover:text-indigo-400 transition">
        Google Play
      </span>
    </div>
  </a>


  {/* APP STORE */}
  <a
    href="https://www.apple.com/app-store/"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 bg-gray-900/90 backdrop-blur-md 
    border border-gray-700 hover:border-purple-500 
    px-6 py-4 rounded-xl shadow-lg 
    hover:shadow-purple-500/20 
    transition-all duration-300 hover:-translate-y-1"
  >
    {/* Logo */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
      alt="App Store"
      className="w-7 h-7 invert"
    />

    {/* Text */}
    <div className="flex flex-col leading-tight">
      <span className="text-xs text-gray-400">
        Download on the
      </span>
      <span className="text-base font-semibold text-white group-hover:text-purple-400 transition">
        App Store
      </span>
    </div>
  </a>

</div>
      </div>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-indigo-500 z-50 ${showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
          }`}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </newsletter>
  );
}

export default Newsletter;