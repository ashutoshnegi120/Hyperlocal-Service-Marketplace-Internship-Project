import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaUserAlt } from "react-icons/fa";



const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/auth");
  };

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [navigate]);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold hover:text-blue-500">
          Urban Company
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/beauty" className="text-gray-700 hover:text-blue-500">
            Beauty
          </Link>
          <Link to="/homes" className="text-gray-700 hover:text-blue-500">
            Homes
          </Link>
        </div>

        {/* Icons / User */}
        <div className="hidden md:flex items-center gap-4 relative">
          <FaShoppingCart className="text-2xl cursor-pointer" />

          {user ? (
            <>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 bg-gray-600 text-white  rounded-full flex items-center justify-center font-bold hover:bg-gray-500 uppercase cursor-pointer"
              >
                {user.name?.[0]}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-10 w-32 bg-white shadow-md rounded-md border">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/auth">
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold cursor-pointer">
                <FaUserAlt/>
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">
          <Link
            to="/beauty"
            onClick={() => setMenuOpen(false)}
            className="py-2"
          >
            Beauty
          </Link>
          <Link
            to="/homes"
            onClick={() => setMenuOpen(false)}
            className="py-2"
          >
            Homes
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-md text-center"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
