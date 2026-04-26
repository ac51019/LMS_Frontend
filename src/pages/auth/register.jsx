


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import { authService } from "../../api/auth.service";
import {
  User,
  Mail,
  Phone,
  Lock,
  FileText,
  Key,
  Building,
  CheckCircle2,
} from "lucide-react";
import { InputField } from "../../Components/common/InputFeild";
import { message } from "antd";

function RegistrationForm() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("STUDENT");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    role: "STUDENT",
    bio: "",
    expertise: "",
    documentLink: "",
    companyName: "",
    taxInfo: "",
    inviteCode: "",
  });

  const roles = [
    { id: "STUDENT", title: "Student", desc: "Access courses and certificates.", icon: <User className="w-8 h-8" /> },
    { id: "INSTRUCTOR", title: "Instructor", desc: "Create courses and analytics.", icon: <FileText className="w-8 h-8" /> },
    { id: "VENDOR", title: "Vendor", desc: "Manage instructors and revenue.", icon: <Building className="w-8 h-8" /> },
    { id: "ADMIN", title: "Admin", desc: "Platform administration.", icon: <Key className="w-8 h-8" /> },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setFormData((prev) => ({ ...prev, role: roleId }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRole === "ADMIN" && formData.inviteCode !== "SECRET_ADMIN_123") {
      setError("Invalid admin invite code.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await authService.register(formData);

      if (result.success) {
        message.success("Registration successful!");
        navigate("/login");
      } else {
        setError(result.error || "Registration failed.");
      }
    } catch {
      setError("Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- ROLE SELECT ---------------- */

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((r) => (
          <div
            key={r.id}
            onClick={() => handleRoleSelect(r.id)}
            className={`cursor-pointer border-2 rounded-xl p-6 relative transition-all
            ${selectedRole === r.id
                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
          >
            <div
              className={`p-4 rounded-full mb-4 w-fit
              ${selectedRole === r.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                }`}
            >
              {r.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {r.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {r.desc}
            </p>

            {selectedRole === r.id && (
              <CheckCircle2 className="absolute top-4 right-4 text-blue-600" />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setStep(2)}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white  shadow-md hover:shadow-xl hover:shadow-purple-500/30
  transform hover:-translate-y-0.5 active:scale-95
  transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl font-bold text-lg"
      >
        Continue
      </button>
    </div>
  );

  /* ---------------- FORM ---------------- */

  const renderFormFields = () => (
    <form onSubmit={handleSubmit} className="space-y-6">

      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {selectedRole}  DETAILS
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField name="username" placeholder="Full Name" value={formData.username} onChange={handleChange} icon={<User />} />
        <InputField name="email" placeholder="Enter your Email address" value={formData.email} onChange={handleChange} icon={<Mail />} />
        <InputField name="mobileNumber" placeholder="Phone Number" value={formData.mobileNumber} onChange={handleChange} icon={<Phone />} />
        <InputField name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} icon={<Lock />} />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        disabled={isLoading}
        className="w-full py-4 text-white rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-xl hover:shadow-purple-500/30
  transform hover:-translate-y-0.5 active:scale-95
  transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Navbar />

      <div className="flex justify-center py-12 px-4">
        <div className="max-w-4xl w-full">

          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Create Your Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {step === 1
                ? "Choose how you want to use the platform."
                : "Fill in your details."}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
            {step === 1 ? renderRoleSelection() : renderFormFields()}

            <div className="mt-8 text-center border-t pt-6 border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-bold">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;