import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStore } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-300 text-gray-900 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Company Section */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">About Us</a></li>
            <li><a href="#" className="hover:text-black">Careers</a></li>
            <li><a href="#" className="hover:text-black">Blog</a></li>
            <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Customers Section */}
        <div>
          <h3 className="font-semibold mb-4">For Customers</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">UC Reviews</a></li>
            <li><a href="#" className="hover:text-black">Categories Near You</a></li>
            <li><a href="#" className="hover:text-black">New Launches</a></li>
            <li><a href="#" className="hover:text-black">Help Center</a></li>
          </ul>
        </div>

        {/* Professionals Section */}
        <div>
          <h3 className="font-semibold mb-4">For Professionals</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">Partner With Us</a></li>
            <li><a href="#" className="hover:text-black">Training Academy</a></li>
          </ul>
        </div>

        {/* Social and Store Links */}
        <div>
          <h3 className="font-semibold mb-4">Social Links</h3>
          <div className="flex space-x-4 mb-6 text-xl">
            <a href="#"><FaFacebookF className="hover:text-black" /></a>
            <a href="#"><FaTwitter className="hover:text-black" /></a>
            <a href="#"><FaInstagram className="hover:text-black" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-black" /></a>
          </div>

          <h3 className="font-semibold mb-4">Get the App</h3>
          <div className="flex flex-col space-y-3">
            <button className="w-40 h-10 bg-black text-white rounded-md flex items-center justify-center text-sm">
              <FaGooglePlay /> Google Play
            </button>
            <button className="w-40 h-10 bg-black text-white rounded-md flex items-center justify-center text-sm">
              <FaAppStore /> App Store
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Urban Comfort. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
