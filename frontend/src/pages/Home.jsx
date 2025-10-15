
import { FaTools, FaBolt, FaSpa } from "react-icons/fa";

const HomePage = () => {
  return (
    <div>
      <section className="bg-blue-50 min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-600">
          Find Trusted Professionals Near You
        </h1>
        <p className="text-gray-700 mb-6 text-lg md:text-xl">
          Book electricians, plumbers, beauticians, and more in just a few clicks
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
          <input
            type="text"
            placeholder="Search for services..."
            className="px-4 py-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Search
          </button>
        </div>
      </section>
      <section className="py-16 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Popular Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
              <FaTools className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Plumbing</h3>
              <p className="text-gray-600 text-center">
                Fix leaks, install taps, and handle all plumbing issues.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
              <FaBolt className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Electrical</h3>
              <p className="text-gray-600 text-center">
                Certified electricians for repairs, installations, and emergencies.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
              <FaSpa className="text-4xl text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Beauty & Wellness</h3>
              <p className="text-gray-600 text-center">
                Professional beauticians and wellness experts at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Choose UrbanComfort?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                Only experienced and verified professionals for your safety and satisfaction.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Schedule services in just a few clicks, anytime, anywhere.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple payment options with secure transactions and receipts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
