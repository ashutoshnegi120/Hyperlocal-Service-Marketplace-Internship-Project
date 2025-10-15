import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:4000/users/verify-email", { email, otp });
      toast.success(res.data.message);
      navigate("/auth");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post("http://localhost:4000/users/resend-verification", { email });
      toast.info(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Resend failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
        />
        <button onClick={handleVerify} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
          Verify
        </button>
        <button onClick={handleResend} className="bg-gray-500 text-white px-4 py-2 rounded">
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
