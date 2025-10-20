import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage"
import Homes from "./pages/Homes";
import Beauty from "./pages/Beauty";
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"

const App = () => {
  // Global user state
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />
        <Route path="/homes" element={<Homes />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
