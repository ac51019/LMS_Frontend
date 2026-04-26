import img1 from "../../assets/images/user.png";
import { authService } from "../../api/auth.service";
function StudentSideBar({ current, onSelect }) {

    const menuItems = [
        { key: "dashboard", label: "Dashboard", icon: "bx bxs-dashboard" },
        { key: "my-learning", label: "My Learning", icon: "bx bxs-book-reader" },
        { key: "explore-courses", label: "Explore Courses", icon: "bx bx-search-alt" },
        { key: "wishlist", label: "Wishlist", icon: "bx bx-heart" },
        { key: "certificates", label: "My Certificates", icon: "bx bx-certification" },
        { key: "assignments-quizzes", label: "Assignments & Quizzes", icon: "bx bx-task" },
        { key: "live-classes", label: "Live Classes", icon: "bx bx-video" },
        { key: "messages", label: "Messages", icon: "bx bx-message-rounded-dots" },
        { key: "announcements", label: "Announcements", icon: "bx bx-broadcast" },
        { key: "purchase-history", label: "Purchase History", icon: "bx bx-receipt" },
        { key: "subscription", label: "Subscription", icon: "bx bxs-crown" },
        { key: "profile-settings", label: "Profile Settings", icon: "bx bx-cog" },
        { key: "help-support", label: "Help & Support", icon: "bx bx-support" },
    ];

    const handleLogout = async () => {
        await authService.logout();
    };

    return (
        <div className="bg-white shadow-lg flex flex-col p-4 md:px-6 w-64 shrink-0 h-full overflow-y-auto">
            <div
                className="flex items-center gap-3 px-3 py-5 border-b border-gray-200 cursor-pointer"
                onClick={() => onSelect("dashboard")}
            >
                <img src={img1} alt="Student Logo" className="w-10 h-10 rounded-full" />
                <span className="text-lg font-semibold text-blue-900">LMS STUDENT</span>
            </div>
            <ul className="flex flex-col mt-6 flex-1">
                {menuItems.map((item) => (
                    <li key={item.key}>
                        <button
                            onClick={() => onSelect(item.key)}
                            className={`w-full flex items-center gap-3 p-3 transition-colors rounded-lg mx-3 mb-3 text-left ${current === item.key
                                ? "bg-blue-500 text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <i className={`${item.icon} text-lg`} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-auto border-t border-gray-200 pt-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 transition-colors rounded-lg mx-3 text-left text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                    <i className="bx bx-log-out text-lg" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}

export default StudentSideBar;
