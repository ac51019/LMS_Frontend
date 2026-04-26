import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/stats"
      );
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 w-full">
        <Navbar />

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow">
              <h3>Total Users</h3>
              <p className="text-3xl font-bold">
                {stats.totalUsers}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3>Active Chats</h3>
              <p className="text-3xl font-bold">
                {stats.activeChats}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3>Resolved Chats</h3>
              <p className="text-3xl font-bold">
                {stats.resolvedChats}
              </p>
            </div>

          </div>

          <div className="bg-white mt-8 p-6 rounded-xl shadow">
            <h3 className="text-xl mb-4">Recent Chats</h3>

            {stats.recentChats.map(chat => (
              <div key={chat._id} className="border-b py-2">
                <b>{chat.userName}</b> — {chat.message}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;