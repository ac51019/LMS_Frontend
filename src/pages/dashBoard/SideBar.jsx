import img1 from "../../assets/images/user.png";
import { authService } from "../../api/auth.service";
import { useSelector } from "react-redux";

function SideBar({ current, onSelect }) {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role;

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "bx bxs-dashboard" },
    ...(userRole === "ROLE_ADMIN" || userRole === "ROLE_SUPER_ADMIN"
      ? [
        { key: "user", label: "Users", icon: "bx bxs-group" },
        { key: "blogs", label: "Blog Management", icon: "bx bx-edit" }
      ]
      : []),
    ...(userRole === "ROLE_INSTRUCTOR"
      ? [
        { key: "my-courses", label: "My Courses", icon: "bx bx-book-open" },
        { key: "create-course", label: "Create New Course", icon: "bx bx-plus-circle" },
        { key: "course-analytics", label: "Course Analytics", icon: "bx bx-line-chart" },
        { key: "student-management", label: "Student Management", icon: "bx bxs-user-detail" },
        { key: "assignments-quizzes", label: "Assignments & Quizzes", icon: "bx bx-task" },
        { key: "live-classes", label: "Live Classes", icon: "bx bx-video" },
        { key: "earnings", label: "Earnings", icon: "bx bx-money" },
        { key: "payouts", label: "Payouts", icon: "bx bx-wallet" },
        { key: "reviews-ratings", label: "Reviews & Ratings", icon: "bx bx-star" },
        { key: "messages", label: "Messages", icon: "bx bx-message-rounded-dots" },
        { key: "announcements", label: "Announcements", icon: "bx bx-broadcast" },
        { key: "certificates", label: "Certificates", icon: "bx bx-certification" },
        { key: "coupons-promotions", label: "Coupons & Promotions", icon: "bx bxs-discount" },
        { key: "settings", label: "Settings", icon: "bx bx-cog" },
      ]
      : [
        // For admins, keep Courses and standard ones
        { key: "courses", label: "Courses", icon: "bx bxs-book" },
      ]),
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
        <img src={img1} alt="Instructor Logo" className="w-10 h-10 rounded-full" />
        <span className="text-lg font-semibold text-blue-900">
          {userRole === "ROLE_ADMIN" || userRole === "ROLE_SUPER_ADMIN" ? "LMS ADMIN" : "LMS INSTRUCTOR"}
        </span>
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

export default SideBar;
