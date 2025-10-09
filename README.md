# Hyperlocal Service Marketplace

A comprehensive service booking platform connecting users with local professionals including plumbers, electricians, beauticians, and other service providers. Features real-time booking management, ratings and reviews, and secure payment processing.

## 📋 Overview

This platform enables users to discover and book local service providers in their area, while service providers can manage their appointments and build their reputation through customer reviews. The system includes role-based access for Users, Service Providers, and Administrators.

## ✨ Features

### User Features
- **Authentication System**: Secure registration and login with JWT tokens
- **Location-Based Search**: Find service providers in your area
- **Service Booking**: Schedule appointments with preferred professionals
- **Booking Management**: Track appointment status (Scheduled, Completed, Cancelled)
- **Ratings & Reviews**: Share feedback and rate service providers
- **Booking History**: View complete appointment history
- **Secure Payments**: Integrated payment gateway support

### Service Provider Features
- **Professional Profiles**: Showcase skills, experience, and services
- **Appointment Management**: View and manage bookings
- **Earnings Dashboard**: Track completed services and payments
- **Customer Ratings**: Build reputation through customer feedback

### Admin Features
- **Service Management**: Add, edit, and remove service categories
- **Provider Management**: Approve and manage service providers
- **Booking Oversight**: Monitor all platform bookings
- **Analytics Dashboard**: View platform statistics and metrics

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: Bcrypt
- **Payment Integration**: Razorpay/Stripe

### Frontend
- **Framework**: React.js
- **Styling**: Modern responsive design
- **State Management**: React Hooks


## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Razorpay/Stripe account for payment gateway

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hyperlocal-service-marketplace
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYMENT_KEY=your_payment_gateway_key
PAYMENT_SECRET=your_payment_gateway_secret
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_PAYMENT_KEY=your_payment_gateway_key
```

4. **Run the Application**

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## 📅 Development Timeline

### Week 1: Authentication & Core Setup
- JWT authentication implementation
- User roles setup (User, Provider, Admin)
- Password hashing with Bcrypt
- React project initialization
- Homepage and service listings UI

### Week 2: Service Management & Booking
- Service CRUD APIs
- Booking system implementation
- API integration with frontend
- Booking forms and payment pages

### Week 3: Booking Status & Reviews
- Booking status management
- Booking history dashboard
- Ratings and reviews system
- User feedback interface

### Week 4: Payments & Polish
- Payment gateway integration
- API optimization and testing
- Responsive design implementation
- Admin dashboard completion

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details
- `POST /api/services/book` - Book a service

### Bookings
- `GET /api/bookings/user` - User booking history
- `GET /api/bookings/provider` - Provider bookings
- `PATCH /api/bookings/:id/status` - Update booking status

### Reviews
- `POST /api/reviews` - Submit a review
- `GET /api/reviews/:providerId` - Get provider reviews

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🤝 Contributing

This is a collaborative project. Team members should follow these guidelines:

1. Create a feature branch for your work (`git checkout -b feature/FeatureName`)
2. Commit your changes with clear messages (`git commit -m 'Add FeatureName'`)
3. Push to your branch (`git push origin feature/FeatureName`)
4. Create a Pull Request for review
5. Wait for team review and approval before merging

### Branch Naming Convention
- `Ashutosh/` - Backend
- `Chandan/` - Frontend
- `main\master/` - merge version


## 👥 Team

This project is being developed collaboratively by our team as part of our learning journey in full-stack development.

---

**Built with ❤️ for connecting communities with local service providers**
