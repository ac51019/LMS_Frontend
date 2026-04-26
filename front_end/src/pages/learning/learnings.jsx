import React, { useEffect, useState } from "react";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { learningService } from "../../api/learning.service";
import { progressService } from "../../api/progress.service";
import { useSelector } from "react-redux";
import { BookOpen, Award, TrendingUp, Clock, PlayCircle, CheckCircle } from "lucide-react";

function Learnings() {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    inProgress: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await learningService.getEnrollments(userId);
        const mappedCourses = response.data || [];

        let completedCount = 0;
        let inProgressCount = 0;

        // Fetch dynamic progress for all enrolled courses
        const progressPromises = mappedCourses.map(async (course) => {
          try {
            const progRes = await progressService.getProgress(userId, course.course_id);
            const playedTime = progRes.data || 0;

            // Assuming standard course duration if undefined is ~10000s for calculation sake
            const percentage = Math.min(Math.ceil((playedTime / 10000) * 100), 100);

            if (percentage >= 100) completedCount++;
            else if (percentage > 0) inProgressCount++;

            return { ...course, progress: Math.max(percentage, 5) }; // Always show at least 5% bar when enrolled
          } catch (err) {
            return { ...course, progress: 5 };
          }
        });

        const unifiedCourses = await Promise.all(progressPromises);

        setCourses(unifiedCourses);
        setStats({
          enrolled: unifiedCourses.length,
          completed: completedCount,
          inProgress: inProgressCount
        });

      } catch (err) {
        console.error("Dashboard failed to load:", err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchDashboard();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar page="learnings" />
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar page="learnings" />

      <div className="flex-grow max-w-[1400px] mx-auto w-full px-[4vw] py-12 mt-16">

        {/* Profile Header & Stats */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.username}!</h1>
          <p className="text-gray-500 dark:text-gray-400">Continue your learning journey where you left off.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-full text-blue-600 dark:text-blue-400">
              <BookOpen size={28} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Enrolled Courses</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.enrolled}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="bg-orange-100 dark:bg-orange-900/40 p-4 rounded-full text-orange-600 dark:text-orange-400">
              <TrendingUp size={28} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">In Progress</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="bg-green-100 dark:bg-green-900/40 p-4 rounded-full text-green-600 dark:text-green-400">
              <Award size={28} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Completed</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {courses.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-16 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You haven't enrolled yet.</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">Start exploring high-quality courses mapped globally by our top instructors and jumpstart your career right now.</p>
            <button
              onClick={() => navigate("/courses")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1"
            >
              Explore Course Catalog
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Learning Path</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-6">
              {courses.map((course) => (
                <div key={course.course_id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col sm:flex-row transition-shadow hover:shadow-lg">
                  <div className="w-full sm:w-[220px] h-[160px] relative">
                    <img
                      src={course.p_link || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80"}
                      alt={course.course_name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <PlayCircle size={48} className="text-white drop-shadow-md cursor-pointer" onClick={() => navigate(`/course/${course.course_id}`)} />
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                        {course.course_name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-1">By {course.instructor || "Zenlithic Instructor"}</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1 text-xs font-semibold">
                        <span className="text-gray-500 dark:text-gray-400">{course.progress}% Complete</span>
                        {course.progress >= 100 && <CheckCircle size={14} className="text-green-500" />}
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                        <div className={`h-2 rounded-full ${course.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${course.progress}%` }}></div>
                      </div>

                      <button
                        onClick={() => navigate(`/course/${course.course_id}`)}
                        className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                      >
                        {course.progress > 5 ? "Continue Learning" : "Start Learning"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Learnings;
