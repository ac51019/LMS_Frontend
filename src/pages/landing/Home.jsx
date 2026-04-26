// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../Components/common/Navbar";
// import Footer from "../../Components/common/Footer";
// import { faGraduationCap, faAward, faStar, faPlay, faClock, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import c1 from "../../assets/images/c1.jpg";
// import c2 from "../../assets/images/html.png";
// import c3 from "../../assets/images/sql.jpg";
// import c4 from "../../assets/images/python.jpg";
// import c5 from "../../assets/images/java.png";
// import c6 from "../../assets/images/css.png";
// import bannerImg from "../../assets/images/home-banner.png";
// import { authService } from "../../api/auth.service";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCourses } from "../../redux/slices/courseSlice";
// import { formatCurrency } from "../../utils/currency";

// function Home() {
//   const navigate = useNavigate();
//   const isAuthenticated = authService.isUserAuthenticated();

//   const dispatch = useDispatch();
//   const { items: globalCourses, status: coursesStatus } = useSelector((state) => state.courses);

//   const [popularCourses, setPopularCourses] = useState([]);

//   useEffect(() => {
//     if (coursesStatus === 'idle') {
//       dispatch(fetchAllCourses());
//     }
//   }, [coursesStatus, dispatch]);

//   useEffect(() => {
//     if (coursesStatus === 'succeeded' && globalCourses) {
//       const fetchedData = globalCourses.map((c, index) => ({
//         id: c.course_id,
//         title: c.course_name,
//         img: (c.p_link && c.p_link.startsWith("http")) ? c.p_link : [c1, c2, c3, c4, c5, c6][index % 6],
//         price: c.price || 499,
//         rating: 4.8
//       }));
//       setPopularCourses(fetchedData.slice(0, 6));
//     }
//   }, [globalCourses, coursesStatus]);

//   // Continue Learning Mock Data
//   const continueLearning = [
//     { id: 101, title: "Advanced React Patterns", progress: 65, lastViewed: "2 hours ago", img: c1 },
//     { id: 102, title: "Fullstack Next.js", progress: 32, lastViewed: "1 day ago", img: c2 }
//   ];

//   // Recently Viewed Mock Data
//   const recentlyViewed = [
//     { id: 3, title: "SQL Beginner Course", img: c3, price: 499, rating: 4.8 },
//     { id: 4, title: "Python Master Course", img: c4, price: 599, rating: 4.9 },
//   ];



//   const featureData = [
//     {
//       icon: faGraduationCap,
//       title: "Interactive Learning",
//       desc: "Engage with dynamic content, quizzes, and real-world projects to master your skills.",
//       color: "text-blue-500",
//       bg: "bg-blue-100"
//     },
//     {
//       icon: faStar,
//       title: "Expert Instructors",
//       desc: "Learn directly from industry experts with years of practical experience.",
//       color: "text-purple-500",
//       bg: "bg-purple-100"
//     },
//     {
//       icon: faAward,
//       title: "Global Certification",
//       desc: "Earn verified certificates that showcase your expertise to global employers.",
//       color: "text-orange-500",
//       bg: "bg-orange-100"
//     }
//   ];

//   return (
//     <div className="bg-[#f8fafc] dark:bg-gray-900 font-sans antialiased text-gray-800 dark:text-gray-200 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
//       <Navbar page="home" />

//       {/* Hero Section with Glassmorphism & Micro-animations */}
//       <section className="relative pt-[120px] pb-24 md:pt-[160px] md:pb-32 px-6 overflow-hidden">
//         {/* Background Decorative Elements */}
//         <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl -z-10"></div>
//         <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl -z-10"></div>

//         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-12">
//           {/* Left Content */}
//           <div className="w-full md:w-1/2 z-10 text-center md:text-left">
//             <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold text-sm mb-6 shadow-sm">
//               🌟 Unleash Your Potential
//             </div>
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white tracking-tight">
//               Master the Skills of <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
//                 Tomorrow.
//               </span>
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl md:leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
//               Join millions of learners accelerating their careers with expert-led courses, practical projects, and global certifications.
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
//               <button
//                 onClick={() => navigate("/courses")}
//                 className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
//               >
//                 Explore Courses
//               </button>
//               <button
//                 className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-gray-800 font-bold text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group"
//               >
//                 <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
//                   <FontAwesomeIcon icon={faPlay} className="text-indigo-600 ml-1 text-sm" />
//                 </div>
//                 How it works
//               </button>
//             </div>
//           </div>

//           {/* Right Image/Graphic */}
//           <div className="w-full md:w-1/2 relative z-10 flex justify-center">
//             <div className="relative w-full max-w-lg">
//               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
//               <img
//                 src={bannerImg}
//                 alt="Learning Platform"
//                 className="relative rounded-3xl shadow-2xl object-cover border-4 border-white z-10 w-full h-auto"
//               />
//               {/* Floating UI Badges */}
//               <div className="absolute -left-8 top-12 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                     <span className="text-green-600 font-bold text-lg">✓</span>
//                   </div>
//                   <div>
//                     <p className="text-sm font-bold text-gray-800">10k+ Courses</p>
//                     <p className="text-xs text-gray-500">Updated Daily</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Authenticated User Sections (Continue Learning & Recently Viewed) */}
//       {isAuthenticated && (
//         <section className="max-w-[1400px] mx-auto px-6 py-12">
//           <div className="mb-12">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
//               <FontAwesomeIcon icon={faPlay} className="text-indigo-600 dark:text-indigo-400" />
//               Continue Learning
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               {continueLearning.map(course => (
//                 <div key={course.id} onClick={() => navigate("/learnings")} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-5 hover:shadow-md transition-shadow cursor-pointer">
//                   <img src={course.img} alt={course.title} className="w-24 h-24 rounded-xl object-cover" />
//                   <div className="flex-1 flex flex-col justify-between py-1">
//                     <div>
//                       <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-1">{course.title}</h3>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
//                         <FontAwesomeIcon icon={faClock} /> Last viewed {course.lastViewed}
//                       </p>
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-xs font-semibold mb-1">
//                         <span className="text-indigo-600">{course.progress}% Completed</span>
//                       </div>
//                       <div className="w-full bg-gray-100 rounded-full h-2">
//                         <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <div className="flex justify-between items-end mb-6">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recently Viewed</h2>
//               <button className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline flex items-center gap-1" onClick={() => navigate("/courses")}>
//                 View all <FontAwesomeIcon icon={faAngleRight} />
//               </button>
//             </div>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {recentlyViewed.map((course) => (
//                 <div key={course.id} onClick={() => navigate(`/course/${course.id}`)} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer">
//                   <img src={course.img} alt={course.title} className="w-full h-36 object-cover" />
//                   <div className="p-4">
//                     <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">{course.title}</h3>
//                     <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
//                       <FontAwesomeIcon icon={faStar} />
//                       <span className="text-gray-700 dark:text-gray-300 font-semibold">{course.rating}</span>
//                     </div>
//                     <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(course.price)}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Features Section */}
//       <section className="bg-white dark:bg-gray-900 py-20 px-6 border-y border-gray-100 dark:border-gray-800 transition-colors">
//         <div className="max-w-[1400px] mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2">Why Choose Us</h2>
//             <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Transform Your Learning Experience</h1>
//           </div>
//           <div className="grid md:grid-cols-3 gap-10">
//             {featureData.map((feature, index) => (
//               <div key={index} className="px-6 py-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300 transform hover:-translate-y-2 group text-center">
//                 <div className={`w-16 h-16 mx-auto rounded-2xl ${feature.bg} dark:bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                   <FontAwesomeIcon icon={feature.icon} className={`text-2xl ${feature.color}`} />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Popular Courses Section */}
//       <section className="py-20 px-6 max-w-[1400px] mx-auto">
//         <div className="flex justify-between items-end mb-10 text-center md:text-left">
//           <div>
//             <h2 className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2">Top Choices</h2>
//             <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Most Popular Courses</h1>
//           </div>
//           <button onClick={() => navigate("/courses")} className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-50 dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 font-semibold hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors">
//             View All Courses <FontAwesomeIcon icon={faAngleRight} />
//           </button>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {popularCourses.map((course) => (
//             <div key={course.id} onClick={() => navigate(`/course/${course.id}`)} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
//               <div className="relative overflow-hidden h-48">
//                 <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
//                 <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
//                   <FontAwesomeIcon icon={faStar} className="text-amber-400" /> 4.8
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h6 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{course.title}</h6>
//                 <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
//                   <span className="flex items-center gap-1"><FontAwesomeIcon icon={faClock} /> 12h 30m</span>
//                   <span className="flex items-center gap-1"><FontAwesomeIcon icon={faGraduationCap} /> 1.2k Students</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="text-xl font-black text-gray-900 dark:text-white">
//                     {formatCurrency(course.price)}
//                   </div>
//                   <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:underline">Explore &rarr;</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-10 text-center md:hidden">
//           <button onClick={() => navigate("/courses")} className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md">
//             View All Courses
//           </button>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// export default Home;
















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import {
  faGraduationCap,
  faAward,
  faStar,
  faPlay,
  faClock,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import c1 from "../../assets/images/c1.jpg";
import c2 from "../../assets/images/html.png";
import c3 from "../../assets/images/sql.jpg";
import c4 from "../../assets/images/python.jpg";
import c5 from "../../assets/images/java.png";
import c6 from "../../assets/images/css.png";
import bannerImg from "../../assets/images/home-banner.png";
import { authService } from "../../api/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../redux/slices/courseSlice";
import { formatCurrency } from "../../utils/currency";
import Newsletter from "../../Components/common/Newsletter";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isUserAuthenticated();

  const dispatch = useDispatch();
  const { items: globalCourses, status: coursesStatus } = useSelector(
    (state) => state.courses
  );

  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    if (coursesStatus === "idle") {
      dispatch(fetchAllCourses());
    }
  }, [coursesStatus, dispatch]);

  useEffect(() => {
    if (coursesStatus === "succeeded" && globalCourses) {
      const fetchedData = globalCourses.map((c, index) => ({
        id: c.course_id,
        title: c.course_name,
        img:
          c.p_link && c.p_link.startsWith("http")
            ? c.p_link
            : [c1, c2, c3, c4, c5, c6][index % 6],
        price: c.price || 499,
        rating: 4.8,
      }));
      setPopularCourses(fetchedData.slice(0, 6));
    }
  }, [globalCourses, coursesStatus]);

  const continueLearning = [
    {
      id: 101,
      title: "Advanced React Patterns",
      progress: 65,
      lastViewed: "2 hours ago",
      img: c1,
    },
    {
      id: 102,
      title: "Fullstack Next.js",
      progress: 32,
      lastViewed: "1 day ago",
      img: c2,
    },
  ];

  // const recentlyViewed = [
  //   { id: 3, title: "SQL Beginner Course", img: c3, price: 499, rating: 4.8 },
  //   { id: 4, title: "Python Master Course", img: c4, price: 599, rating: 4.9 },
  // ];

  const featureData = [
    {
      icon: faGraduationCap,
      title: "Interactive Learning",
      desc: "Engage with dynamic content, quizzes, and real-world projects to master your skills.",
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      icon: faStar,
      title: "Expert Instructors",
      desc: "Learn directly from industry experts with years of practical experience.",
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
    {
      icon: faAward,
      title: "Global Certification",
      desc: "Earn verified certificates that showcase your expertise to global employers.",
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="bg-[#f8fafc] dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Navbar page="home" />

      <div className="container mx-auto max-w-7xl">

      {/* HERO SECTION */}
      <section className="relative pt-[110px] md:pt-[150px] pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border text-indigo-600 font-semibold text-sm mb-6">
              🌟 Unleash Your Potential
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
              Master the Skills of {" "}
              <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Tomorrow.
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Join millions of learners accelerating their careers with expert-led courses and practical projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/courses")}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:-translate-y-1 transition"
              >
                Explore Courses
              </button>

              <button className="px-8 py-4 rounded-full bg-white border shadow-sm flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                  <FontAwesomeIcon icon={faPlay} className="text-indigo-600 text-sm" />
                </div>
                How it works
              </button>
            </div>
          </div>

            {/* Right Image/Graphic */}
          <div className="w-full md:w-1/2 relative z-10 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
              <img
                src={bannerImg}
                alt="Learning Platform"
                className="relative rounded-3xl shadow-2xl object-cover border-4 border-white z-10 w-full h-auto"
              />
              {/* Floating UI Badges */}
              <div className="absolute -left-8 top-12 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">10k+ Courses</p>
                    <p className="text-xs text-gray-500">Updated Daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTH SECTIONS */}
      {isAuthenticated && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FontAwesomeIcon icon={faPlay} className="text-indigo-600" />
            Continue Learning
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {continueLearning.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate("/learnings")}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm flex gap-5 cursor-pointer"
              >
                <img
                  src={course.img}
                  alt=""
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{course.title}</h3>

                  <div className="mt-3 w-full bg-gray-100 h-2 rounded-full">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURES */}
      <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl border shadow-sm hover:shadow-lg transition"
            >
              <div
                className={`w-16 h-16 mx-auto rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  className={`text-2xl ${feature.color}`}
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

     {/* Popular Courses Section */}
       <section className="py-20 px-6 max-w-[1400px] mx-auto">
         <div className="flex justify-between items-end mb-10 text-center md:text-left">
          <div>
             <h2 className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2">Top Choices</h2>
             <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Most Popular Courses</h1>
           </div>
           <button onClick={() => navigate("/courses")} className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-50 dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 font-semibold hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors">
             View All Courses <FontAwesomeIcon icon={faAngleRight} />
           </button>
         </div>

         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {popularCourses.map((course) => (
            <div key={course.id} onClick={() => navigate(`/course/${course.id}`)} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
              <div className="relative overflow-hidden h-48">
                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-amber-400" /> 4.8
                </div>
              </div>
              <div className="p-6">
                <h6 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{course.title}</h6>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="flex items-center gap-1"><FontAwesomeIcon icon={faClock} /> 12h 30m</span>
                  <span className="flex items-center gap-1"><FontAwesomeIcon icon={faGraduationCap} /> 1.2k Students</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-black text-gray-900 dark:text-white">
                    {formatCurrency(course.price)}
                  </div>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:underline">Explore &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center md:hidden">
          <button onClick={() => navigate("/courses")} className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md">
            View All Courses
          </button>
        </div>
      </section>

      <Newsletter />

      <Footer />
    </div>
    </div>
  );
}

export default Home;