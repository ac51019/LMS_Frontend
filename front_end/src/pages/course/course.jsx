import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Progress, Modal, message, Skeleton, Spin, Tabs } from "antd";
import {
  Play, Lock, MessageSquare, BookOpen, Users, Clock, Award,
  ChevronLeft, AlertCircle, RefreshCw, CheckCircle, Search,
  Download, FileText, Star, ThumbsUp, HelpCircle
} from "lucide-react";
import Feedback from "./Feedback";
import Forum from "./forum";
import { courseService } from "../../api/course.service";
import { progressService } from "../../api/progress.service";
import { learningService } from "../../api/learning.service";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const { TabPane } = Tabs;

const Course = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Progress/Player states
  const [duration, setDuration] = useState(null);
  const [played, setPlayed] = useState(0);
  const [changePlayed, setChangePlayed] = useState(0);
  const [progressLoading, setProgressLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Tabs & UI
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const playerRef = useRef(null);

  // Mock curriculum since we only have 1 video in db currently
  const mockCurriculum = [
    {
      section: "Section 1: Introduction",
      lectures: [
        { id: 1, title: "Course Overview", duration: "05:00", completed: true },
        { id: 2, title: "Development Setup", duration: "12:30", completed: false }
      ]
    },
    {
      section: "Section 2: Core Concepts",
      lectures: [
        { id: 3, title: "Main Lecture", duration: "45:00", active: true, completed: false }
      ]
    }
  ];

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await courseService.getCourseById(courseId);
      if (response.success && response.data) {
        let cData = response.data;
        cData.p_link = (cData.p_link && cData.p_link.startsWith("http")) ? cData.p_link : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070";
        cData.y_link = (cData.y_link && cData.y_link.startsWith("http")) ? cData.y_link : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        setCourse(cData);
      } else {
        setError(true);
        setErrorMessage("Course details could not be found.");
      }
    } catch (err) {
      console.error("API Error fetching course:", err);
      setError(true);
      setErrorMessage(err.message || "Network error while fetching course data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        if (!userId) {
          setIsEnrolled(false);
          return;
        }
        const res = await learningService.getEnrollments(userId);
        if (res.success) {
          const enrolledCourses = res.data.map((item) => item.course_id);
          setIsEnrolled(enrolledCourses.includes(courseId));
        }
      } catch (err) {
        console.error("Error checking enrollment:", err);
      }
    };
    fetchEnrollment();
  }, [courseId, userId]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setProgressLoading(true);
        const res = await progressService.getProgress(userId, courseId);
        if (res.success) {
          setPlayed(res.data);
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setProgressLoading(false);
      }
    };

    if (userId && courseId && isEnrolled) {
      fetchProgress();
    } else {
      setProgressLoading(false);
    }
  }, [userId, courseId, isEnrolled]);

  useEffect(() => {
    const updateProgress = async () => {
      if (courseId && userId && duration && isEnrolled) {
        const res = await progressService.updateProgress(userId, courseId, played, duration);
        if (res.success) {
          setPlayed(changePlayed < played ? played : changePlayed);
        }
      }
    };
    updateProgress();
  }, [changePlayed, courseId, userId, duration, played, isEnrolled]);

  const handleDuration = () => {
    if (playerRef.current) {
      const videoDuration = playerRef.current.getDuration();
      setDuration(videoDuration);
      if (videoDuration > 0 && isEnrolled) {
        progressService.updateDuration(userId, courseId, videoDuration);
      }
    }
  };

  const handleEnroll = async () => {
    const authToken = localStorage.getItem("token");
    if (!isAuthenticated || !authToken) {
      message.warning("You need to login to continue");
      localStorage.setItem("redirectPath", location.pathname);
      setTimeout(() => navigate("/login"), 1000);
      return;
    }
    dispatch(addToCart(course));
    message.success(`${course.course_name} added to cart!`);
    navigate("/cart");
  };

  const saveNotes = () => {
    setNotesSaved(true);
    message.success("Notes auto-saved successfully!");
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const getProgressPercent = () => {
    if (progressLoading || !duration || duration === 0) return 0;
    return Math.min(Math.ceil((played / duration) * 100), 100);
  };

  const progressPercent = getProgressPercent();

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen py-10 bg-slate-50 flex flex-col items-center">
        <Spin size="large" className="mb-8" />
        <div className="w-full max-w-7xl px-6">
          <Skeleton active paragraph={{ rows: 1 }} />
          <div className="flex gap-6 mt-8">
            <Skeleton.Node active style={{ width: 300, height: 500 }} />
            <div className="flex-1 space-y-4">
              <Skeleton.Node active style={{ width: '100%', height: 400 }} />
              <Skeleton active paragraph={{ rows: 4 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State / Not Found
  if (error || !course) {
    return (
      <div className="min-h-screen py-20 bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-red-100 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {!course ? "Course Not Found" : "Something went wrong!"}
          </h2>
          <p className="text-gray-500 mb-8">
            {errorMessage || "The course you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Back to Dashboard
            </button>
            {error && (
              <button
                onClick={fetchCourseData}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-indigo-700 transition shadow-md"
              >
                <RefreshCw className="w-4 h-4" /> Retry
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Not Enrolled Preview State
  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Dark Hero Section */}
        <div className="bg-slate-900 text-white pt-10 pb-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
            <div className="flex-1 lg:pr-10">
              <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-6 flex items-center gap-1 font-medium transition">
                <ChevronLeft className="w-4 h-4" /> Back to courses
              </button>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{course.course_name}</h1>
              <p className="text-xl text-gray-300 mb-6 max-w-3xl line-clamp-3">{course.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <span className="bg-yellow-500/20 text-yellow-500 font-bold px-3 py-1 rounded flex items-center gap-1 text-sm">
                  4.8 <Star className="w-4 h-4 fill-current" />
                </span>
                <span className="text-gray-400 text-sm">(12,403 ratings) 45,912 students</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                <Users className="w-4 h-4" /> Created by Top Instructor
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Last updated 10/2026</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 42 hours total</span>
              </div>
            </div>

            {/* Preview Card floating right */}
            <div className="w-full lg:w-96 shrink-0 relative lg:-bottom-24 z-10">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden text-slate-800">
                <div className="h-48 relative bg-gray-900 flex items-center justify-center group cursor-pointer"
                  style={{ backgroundImage: `url(${course.p_link})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition">
                    <Play className="w-6 h-6 text-slate-900 ml-1" />
                  </div>
                  <span className="absolute bottom-4 left-0 w-full text-center text-white font-bold text-lg drop-shadow-md z-10">Preview this course</span>
                </div>

                <div className="p-6">
                  <div className="text-3xl font-bold mb-4">₹{course.price || "2,499"}</div>
                  <button
                    onClick={handleEnroll}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md mb-3 flex items-center justify-center gap-2 transition"
                  >
                    {!isAuthenticated ? "Log In to Enroll" : "Add to Cart"}
                  </button>
                  <p className="text-center text-xs text-gray-500 mb-6 cursor-pointer">30-Day Money-Back Guarantee</p>

                  <h4 className="font-bold mb-3">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-3"><Play className="w-4 h-4 text-gray-400" /> 42 hours on-demand video</li>
                    <li className="flex items-center gap-3"><FileText className="w-4 h-4 text-gray-400" /> 14 downloadable resources</li>
                    <li className="flex items-center gap-3"><Award className="w-4 h-4 text-gray-400" /> Certificate of completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Details below hero */}
        <div className="max-w-7xl mx-auto px-6 pt-16 lg:pt-10 flex flex-col lg:flex-row gap-10">
          <div className="flex-1 lg:pr-10 lg:max-w-[calc(100%-400px)]">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 leading-relaxed">Master the core concepts of this subject and build production-ready applications from scratch.</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-slate-800">Course content</h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
              {mockCurriculum.map((section, si) => (
                <div key={si} className="border-b border-gray-200 last:border-0">
                  <div className="bg-gray-50 px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-100">
                    <h3 className="font-bold text-slate-800">{section.section}</h3>
                    <span className="text-sm text-gray-500">{section.lectures.length} lectures</span>
                  </div>
                  <div className="px-6 py-2">
                    {section.lectures.map(l => (
                      <div key={l.id} className="flex justify-between items-center py-2 text-sm text-gray-600">
                        <span className="flex items-center gap-3"><Play className="w-4 h-4 text-gray-400" /> {l.title}</span>
                        <span className="text-gray-400">{l.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Learning Interface (Udemy style layout)
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Bar */}
      <div className="h-14 bg-slate-900 text-white flex justify-between items-center px-6 shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/my-learning')} className="text-gray-300 hover:text-white transition flex items-center gap-1 text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Dashboard
          </button>
          <div className="w-px h-6 bg-gray-700"></div>
          <h1 className="font-bold text-sm truncate max-w-sm md:max-w-xl">{course.course_name}</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs text-gray-300 font-medium">{progressPercent}%</span>
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
            {progressPercent === 100 && (
              <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs font-bold border border-indigo-500 px-2 py-1 rounded">
                <Award className="w-3 h-3" /> Get Certificate
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
        {/* Left/Main Column - Video & Content */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-white custom-scrollbar">

          {/* Video Player Container */}
          <div className="bg-black w-full relative">
            <div className="max-w-[1200px] mx-auto relative pt-[56.25%] bg-black">
              <div className="absolute inset-0">
                <ReactPlayer
                  ref={playerRef}
                  url={course?.y_link || ""}
                  controls={true}
                  playbackRate={playbackRate}
                  width="100%"
                  height="100%"
                  onDuration={handleDuration}
                  onProgress={(progress) => {
                    if (changePlayed + 10 <= progress.playedSeconds) {
                      setChangePlayed(progress.playedSeconds);
                    }
                  }}
                  played={played}
                  config={{
                    file: { attributes: { controlsList: 'nodownload' } },
                    youtube: { playerVars: { modestbranding: 1, rel: 0 } }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Under Video Controls */}
          <div className="max-w-[1200px] mx-auto w-full px-6 py-4 flex flex-wrap justify-between items-center border-b border-gray-100 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Main Lecture</h2>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition text-sm">
                <Download className="w-4 h-4" /> Download Resources
              </button>
              <button
                onClick={() => {
                  progressService.updateProgress(userId, courseId, duration || 100, duration || 100);
                  message.success("Lecture marked as completed!");
                }}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm text-sm"
              >
                Mark as Complete <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="max-w-[1200px] mx-auto w-full px-6 py-4">
            <Tabs defaultActiveKey="overview" className="course-learning-tabs">

              <TabPane tab={<span className="font-semibold px-2">Overview</span>} key="overview">
                <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-slate-800">About this course</h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{course.description}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-bold mb-3 text-slate-800">Requirements</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Basic computer literacy</li>
                        <li>No programming experience needed. You will learn everything you need to know</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                          IN
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">Top Instructor</h4>
                          <p className="text-sm text-gray-500">Sr. Software Developer</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 mt-2 font-medium">
                        <div className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500" /> 4.8 Rating</div>
                        <div className="flex items-center gap-1"><Users className="w-4 h-4 text-indigo-400" /> 45,912 Students</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>

              <TabPane tab={<span className="font-semibold px-2">Notes</span>} key="notes">
                <div className="py-4 max-w-2xl">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Personal Notes</h3>
                    <span className="text-xs text-gray-400 font-medium">Notes correspond to timestamps</span>
                  </div>
                  <textarea
                    className="w-full bg-yellow-50/50 border border-yellow-200 rounded-xl p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition text-gray-700 shadow-inner"
                    placeholder="Create a new note at this timestamp..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={saveNotes}
                  ></textarea>
                  <div className="flex justify-end mt-4">
                    <button onClick={saveNotes} className="px-6 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition">
                      Save Note
                    </button>
                  </div>
                  {notesSaved && <p className="text-green-600 text-sm mt-2 font-medium flex justify-end"> <CheckCircle className="w-4 h-4 mr-1 inline" /> Saved securely</p>}
                </div>
              </TabPane>

              <TabPane tab={<span className="font-semibold px-2">Q&A</span>} key="qa">
                <div className="py-4">
                  <Forum courseId={courseId} />
                </div>
              </TabPane>

              <TabPane tab={<span className="font-semibold px-2">Assignments</span>} key="assignments">
                <div className="py-4 max-w-3xl">
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Final Project Assignment</h3>
                        <p className="text-gray-500 text-sm mb-4">Upload your finalized source code as a zip file. Must be under 50MB.</p>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer">
                          <Download className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-indigo-600 font-bold">Click to upload <span className="text-gray-500 font-normal">or drag and drop</span></p>
                          <p className="text-xs text-gray-400 mt-1">ZIP, PDF, or RAR</p>
                        </div>
                        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow disabled:opacity-50">Submit Assignment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>

              <TabPane tab={<span className="font-semibold px-2">Reviews</span>} key="reviews">
                <div className="py-4">
                  <Feedback courseid={courseId} />
                </div>
              </TabPane>

            </Tabs>
          </div>
        </div>

        {/* Right Sidebar - Course Curriculum */}
        <div className="hidden lg:flex w-80 lg:w-96 flex-col border-l border-gray-200 bg-gray-50 shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.03)] z-10">
          <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
            <h2 className="font-bold text-slate-800">Course content</h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {mockCurriculum.map((section, si) => (
              <div key={si} className="border-b border-gray-200">
                <div className="bg-white px-4 py-4 cursor-pointer hover:bg-gray-50 flex justify-between items-start transition">
                  <h3 className="font-bold text-slate-800 text-sm leading-tight max-w-[85%]">{section.section}</h3>
                  <i className="bx bx-chevron-up text-gray-400"></i>
                </div>
                <div className="bg-gray-50 py-1">
                  {section.lectures.map(l => (
                    <div key={l.id} className={`px-4 py-3 flex gap-3 cursor-pointer transition ${l.active ? 'bg-indigo-100 hover:bg-indigo-100' : 'hover:bg-gray-100'}`}>
                      {l.completed ? (
                        <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                      ) : (
                        <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shrink-0 cursor-pointer" />
                      )}

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-tight mb-1 ${l.active ? 'text-indigo-900 font-bold' : 'text-slate-700'}`}>
                          {l.title}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Play className="w-3 h-3" /> {l.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global CSS for Customizations */}
      <style>{`
         .course-learning-tabs .ant-tabs-nav::before {
            border-bottom: 2px solid #f3f4f6;
         }
         .course-learning-tabs .ant-tabs-ink-bar {
            background: #4f46e5;
            height: 3px;
         }
         .course-learning-tabs .ant-tabs-tab {
            padding: 12px 0 10px;
            font-size: 15px;
            color: #6b7280;
         }
         .course-learning-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #4f46e5 !important;
         }
         .course-learning-tabs .ant-tabs-tab:hover {
            color: #4f46e5;
         }
         .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
         }
         .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
         }
         .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
            border: 2px solid transparent;
            background-clip: content-box;
         }
         .custom-scrollbar:hover::-webkit-scrollbar-thumb {
            background-color: #94a3b8;
         }
      `}</style>
    </div>
  );
};

export default Course;