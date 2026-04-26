import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed">
      <h1 className="text-2xl font-bold p-6 border-b border-gray-700">
        Support Admin
      </h1>

      <nav className="p-4 space-y-4">
        <Link to="/dashboard" className="block hover:text-indigo-400">
          Dashboard
        </Link>

        <Link to="/chats" className="block hover:text-indigo-400">
          Chats
        </Link>

        <Link to="/users" className="block hover:text-indigo-400">
          Users
        </Link>

        <Link to="/settings" className="block hover:text-indigo-400">
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;