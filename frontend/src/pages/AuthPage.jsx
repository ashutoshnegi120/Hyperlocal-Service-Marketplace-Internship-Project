import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthPage = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, [navigate, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    if (isLogin) {
      try {
        const res = await axios.post("http://localhost:4000/users/login", { email, password });
        toast.success("Login successful!");
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed!");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/users/register", { name, mobile, email, password });
      toast.success(res.data.message);
      setShowOTP(true);
    } catch (err) {
      if (err.response?.data?.message === "Email is already registered") {
        toast.error("Email is already registered!");
      } else {
        toast.error(err.response?.data?.message || "Registration failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post("http://localhost:4000/users/verify-email", { email, otp });
      toast.success(res.data.message);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed!");
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendDisabled(true);
      await axios.post("http://localhost:4000/users/resend-verification", { email });
      toast.success("OTP resent successfully!");
      setTimeout(() => setResendDisabled(false), 30000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
      setResendDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-gray-400 to-white pt-20">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          {isLogin ? "Login" : showOTP ? "Verify OTP" : "Register"}
        </h2>

        {!showOTP ? (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-4 py-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Mobile</label>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full border px-4 py-2 rounded-md"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-blue-600 underline">Forgot Password?</Link>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <button
                disabled={loading}
                className={`w-full sm:w-auto text-white px-6 py-2 rounded ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Registering..."
                  : isLogin
                  ? "Login"
                  : "Register"}
              </button>

              <button
                type="button"
                onClick={() => !loading && setIsLogin(!isLogin)}
                className="text-sm text-gray-700 underline"
              >
                {isLogin ? "Create account" : "Have an account? Login"}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full bg-green-600 text-white px-6 py-2 rounded"
            >
              Verify OTP
            </button>
            <button
              onClick={handleResendOTP}
              disabled={resendDisabled}
              className="w-full bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
