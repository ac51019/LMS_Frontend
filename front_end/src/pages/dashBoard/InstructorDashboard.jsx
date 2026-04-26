import { useState } from "react";
import SideBar from "./SideBar";
import { authService } from "../../api/auth.service";
import DashboardOverview from "./instructor/DashboardOverview";
import MyCourses from "./instructor/MyCourses";
import CreateCourse from "./instructor/CreateCourse";
import CourseAnalytics from "./instructor/CourseAnalytics";
import StudentManagement from "./instructor/StudentManagement";
import AssignmentsQuizzes from "./instructor/AssignmentsQuizzes";
import LiveClasses from "./instructor/LiveClasses";
import Earnings from "./instructor/Earnings";
import Payouts from "./instructor/Payouts";
import ReviewsRatings from "./instructor/ReviewsRatings";
import Messages from "./instructor/Messages";
import Announcements from "./instructor/Announcements";
import Certificates from "./instructor/Certificates";
import CouponsPromotions from "./instructor/CouponsPromotions";
import Settings from "./instructor/Settings";

function InstructorDashboard() {
    const [current, setCurrent] = useState("dashboard");
    const isAuthenticated = authService.isInstructorAuthenticated() || authService.isAdminAuthenticated();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (current) {
            case "dashboard": return <DashboardOverview />;
            case "my-courses": return <MyCourses />;
            case "create-course": return <CreateCourse />;
            case "course-analytics": return <CourseAnalytics />;
            case "student-management": return <StudentManagement />;
            case "assignments-quizzes": return <AssignmentsQuizzes />;
            case "live-classes": return <LiveClasses />;
            case "earnings": return <Earnings />;
            case "payouts": return <Payouts />;
            case "reviews-ratings": return <ReviewsRatings />;
            case "messages": return <Messages />;
            case "announcements": return <Announcements />;
            case "certificates": return <Certificates />;
            case "coupons-promotions": return <CouponsPromotions />;
            case "settings": return <Settings />;
            // For admins who navigate to Courses via this dashboard (though AdminDash usually handles it)
            case "courses": return <MyCourses />;
            default: return <DashboardOverview />;
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <h2 className="text-2xl font-bold text-red-600">Access Denied. Instructor clearance required.</h2>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 relative">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-300 ease-in-out`}>
                <SideBar current={current} onSelect={(key) => { setCurrent(key); setSidebarOpen(false); }} />
            </div>

            {/* Main Content */}
            <section className="flex-1 min-w-0 flex flex-col h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 transition-all duration-300">
                <header className="flex items-center justify-between p-4 md:hidden bg-white shadow-sm">
                    <h1 className="text-xl font-bold text-slate-800">LMS INSTRUCTOR</h1>
                    <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600 focus:outline-none">
                        <i className="bx bx-menu text-3xl"></i>
                    </button>
                </header>
                <main className="flex-1 p-4 md:p-8 font-poppins overflow-y-auto w-full">
                    {renderContent()}
                </main>
            </section>
        </div>
    );
}

export default InstructorDashboard;
