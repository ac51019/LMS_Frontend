
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import Navbar from "../../Components/common/Navbar";
import { authService } from "../../api/auth.service";
import { Mail, Lock } from "lucide-react";
import { InputField } from "../../Components/common/InputFeild";
import { message } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe] = useState(false);

  const [loginMethod, setLoginMethod] = useState("EMAIL");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ---------------- OTP SEND ---------------- */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await authService.sendOtp(email);

      if (result.success) {
        setIsOtpSent(true);
        message.success("OTP sent successfully to your email.");
      } else {
        setError(result.error || "Failed to send OTP.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- LOGIN ---------------- */
  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let payload = { email };

      if (loginMethod === "EMAIL") {
        payload.loginType = "EMAIL";
        payload.password = password;
      } else {
        payload.loginType = "EMAIL_OTP";
        payload.otp = otp;
      }

      const result = await authService.multipleLogin(payload);

      if (result.success) {
        if (rememberMe)
          localStorage.setItem("rememberedEmail", email);
        else localStorage.removeItem("rememberedEmail");

        if (result.user) dispatch(loginSuccess(result.user));

        message.success("Login successful!");

        const redirectPath = localStorage.getItem("redirectPath");
        if (redirectPath) {
          localStorage.removeItem("redirectPath");
          navigate(redirectPath);
        } else {
          navigate(result.redirectUrl || "/courses");
        }
      } else {
        setError(result.error || "Login failed.");
      }
    } catch (err) {
      setError("Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.multipleLogin({
        loginType: "GOOGLE",
        googleToken: "mock_google_id_token",
      });

      if (result.success) {
        if (result.user) dispatch(loginSuccess(result.user));
        navigate(result.redirectUrl || "/courses");
      } else {
        setError(result.error || "Google Login failed.");
      }
    } catch {
      setError("Google Login error.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Navbar />

      <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-2">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Sign in to your account
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700">

            {/* LOGIN METHOD */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-8">
              <button
                type="button"
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition ${loginMethod === "EMAIL"
                  ? "bg-white dark:bg-gray-900 shadow text-blue-600"
                  : "text-gray-500 dark:text-gray-300"
                  }`}
                onClick={() => setLoginMethod("EMAIL")}
              >
                Password Login
              </button>

              <button
                type="button"
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition ${loginMethod === "OTP"
                  ? "bg-white dark:bg-gray-900 shadow text-blue-600"
                  : "text-gray-500 dark:text-gray-300"
                  }`}
                onClick={() => setLoginMethod("OTP")}
              >
                OTP Login
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={
                loginMethod === "OTP" && !isOtpSent
                  ? handleSendOtp
                  : login
              }
              className="space-y-2"
            >
              <InputField
                id="email"
                type="email"
                // label="Email Address"
                placeholder="Enter your Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-5 w-5 text-gray-400" />}
              />

              {loginMethod === "EMAIL" && (
                <InputField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  // label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-5 w-5 text-gray-400" />}
                  isPassword
                  showPassword={showPassword}
                  onTogglePassword={() =>
                    setShowPassword(!showPassword)
                  }
                />
              )}

              {loginMethod === "OTP" && isOtpSent && (
                <InputField
                  id="otp"
                  type="text"
                  label="Enter Security OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  icon={<Lock className="h-5 w-5 text-gray-400" />}
                />
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-lg text-white font-semibold 
  bg-gradient-to-r from-blue-600 to-purple-600
  shadow-md hover:shadow-xl hover:shadow-purple-500/30
  transform hover:-translate-y-0.5 active:scale-95
  transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Processing..."
                  : loginMethod === "OTP" && !isOtpSent
                    ? "Request OTP"
                    : "Sign In Securely"}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="relative my-8">
              <div className="border-t border-gray-200 dark:border-gray-600"></div>
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-3 bg-white dark:bg-gray-800 text-gray-500 text-sm">
                Or continue with
              </span>
            </div>

            {/* GOOGLE */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 border rounded-xl bg-white dark:bg-gray-700   shadow-md hover:shadow-xl hover:shadow-purple-500/30
  transform hover:-translate-y-0.5 active:scale-95
  transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300 font-bold text-[15px]"
            >
              Sign in with Google
            </button>

            {/* REGISTER */}
            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              New to the platform?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:underline"
              >
                Create an account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;