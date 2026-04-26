const Navbar = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;