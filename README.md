# HackFest 2025 - MERN Stack Application

A full-stack web application for managing hackathon events, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Beautiful glassmorphism design with Tailwind CSS
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Responsive Design**: Mobile-first approach with responsive components
- **Authentication**: Complete login/signup system with JWT
- **User Management**: Profile management and preferences
- **Event Management**: Browse and register for hackathon events

### Backend (Node.js/Express)
- **RESTful API**: Complete REST API with proper HTTP methods
- **Authentication**: JWT-based authentication with role-based access
- **Database**: MongoDB with Mongoose ODM
- **Security**: Rate limiting, input validation, CORS, security headers
- **Error Handling**: Centralized error handling with proper status codes
- **Validation**: Request validation using express-validator

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logger

## 📁 Project Structure

```
OdooProject/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # Node.js backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── start-project.bat       # Windows startup script
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd OdooProject
   ```

2. **Start the application (Windows)**
   ```bash
   # Double-click the start-project.bat file
   # OR run it from command line:
   start-project.bat
   ```

3. **Manual setup (Alternative)**

   **Backend Setup:**
   ```bash
   cd server
   npm install
   cp env.example .env
   # Edit .env with your MongoDB connection string
   npm run dev
   ```

   **Frontend Setup:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/hackfest_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update profile |
| GET | `/api/user/preferences` | Get preferences |
| PUT | `/api/user/preferences` | Update preferences |

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/featured` | Get featured events |
| GET | `/api/events/:id` | Get single event |
| POST | `/api/events` | Create event (Admin) |
| PUT | `/api/events/:id` | Update event (Admin) |

## 🎨 Frontend Features

### Components
- **Navbar**: Navigation with authentication status
- **Home**: Landing page with hero section
- **Login**: User authentication form
- **Signup**: User registration form
- **Background**: Animated background component
- **ThemeContext**: Dark/light theme management
- **AuthContext**: Authentication state management

### Styling
- **Glassmorphism**: Modern glass-like UI elements
- **Gradients**: Beautiful gradient backgrounds
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Complete dark/light theme support

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: Prevents API abuse
- **CORS**: Configured for frontend communication
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: Proper error responses without sensitive data

## 🗄️ Database Models

### User Model
- Basic info (name, email, password)
- Role-based access control
- Profile preferences and social links
- Account status and timestamps

### Event Model
- Event details (title, description, dates)
- Location and categories
- Participant limits and registration
- Prizes, sponsors, and statistics

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure MongoDB Atlas
4. Set up proper CORS origins
5. Deploy to Heroku, Vercel, or similar

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Update API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure MongoDB is running
3. Verify environment variables are set correctly
4. Check that both frontend and backend are running

## 🎯 Next Steps

Potential enhancements:
- Email verification
- Password reset functionality
- File upload for event images
- Real-time notifications
- Admin dashboard
- Event submission system
- Team management
- Payment integration 