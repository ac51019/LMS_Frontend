import User from "../models/User.js";
import Chat from "../models/Chat.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const activeChats = await Chat.countDocuments({
      status: "active"
    });

    const resolvedChats = await Chat.countDocuments({
      status: "closed"
    });

    const recentChats = await Chat.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      activeChats,
      resolvedChats,
      recentChats
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};