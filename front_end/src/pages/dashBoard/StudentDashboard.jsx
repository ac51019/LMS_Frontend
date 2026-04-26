import { useState } from "react";
import StudentSideBar from "./StudentSideBar";
import { authService } from "../../api/auth.service";
import DashboardOverview from "./student/DashboardOverview";
import MyLearning from "./student/MyLearning";
import ExploreCourses from "./student/ExploreCourses";
import Wishlist from "./student/Wishlist";
import MyCertificates from "./student/MyCertificates";
import AssignmentsQuizzes from "./student/AssignmentsQuizzes";
import LiveClasses from "./student/LiveClasses";
import Messages from "./student/Messages";
import Announcements from "./student/Announcements";
import PurchaseHistory from "./student/PurchaseHistory";
import Subscription from "./student/Subscription";
import ProfileSettings from "./student/ProfileSettings";
import HelpSupport from "./student/HelpSupport";

function StudentDashboard() {
    const [current, setCurrent] = useState("dashboard");
    const isAuthenticated = authService.isUserAuthenticated();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (current) {
            case "dashboard": return <DashboardOverview />;
            case "my-learning": return <MyLearning />;
            case "explore-courses": return <ExploreCourses />;
            case "wishlist": return <Wishlist />;
            case "certificates": return <MyCertificates />;
            case "assignments-quizzes": return <AssignmentsQuizzes />;
            case "live-classes": return <LiveClasses />;
            case "messages": return <Messages />;
            case "announcements": return <Announcements />;
            case "purchase-history": return <PurchaseHistory />;
            case "subscription": return <Subscription />;
            case "profile-settings": return <ProfileSettings />;
            case "help-support": return <HelpSupport />;
            default: return <DashboardOverview />;
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <h2 className="text-2xl font-bold text-red-600">Access Denied. Student clearance required.</h2>
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
                <StudentSideBar current={current} onSelect={(key) => { setCurrent(key); setSidebarOpen(false); }} />
            </div>

            {/* Main Content */}
            <section className="flex-1 min-w-0 flex flex-col h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 transition-all duration-300">
                <header className="flex items-center justify-between p-4 md:hidden bg-white shadow-sm">
                    <h1 className="text-xl font-bold text-slate-800">LMS STUDENT</h1>
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

export default StudentDashboard;
