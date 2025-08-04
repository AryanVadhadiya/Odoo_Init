# HackFest 2025 Backend API

A professional Node.js/Express backend for the HackFest 2025 MERN stack application.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user profile management with preferences
- **Event Management**: Full CRUD operations for hackathon events
- **Security**: Rate limiting, input validation, CORS, and security headers
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Express-validator for request validation
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit
- **Logging**: morgan

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd OdooProject/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Environment Variables**
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

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user profile | Private |
| POST | `/api/auth/logout` | Logout user | Private |
| POST | `/api/auth/refresh` | Refresh JWT token | Private |
| POST | `/api/auth/change-password` | Change user password | Private |

### User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/user/profile` | Get user profile | Private |
| PUT | `/api/user/profile` | Update user profile | Private |
| DELETE | `/api/user/profile` | Deactivate account | Private |
| GET | `/api/user/preferences` | Get user preferences | Private |
| PUT | `/api/user/preferences` | Update user preferences | Private |
| GET | `/api/user/stats` | Get user statistics | Private |
| GET | `/api/user/search` | Search users | Admin |

### Events

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/events` | Get all events | Public |
| GET | `/api/events/featured` | Get featured events | Public |
| GET | `/api/events/upcoming` | Get upcoming events | Public |
| GET | `/api/events/:id` | Get single event | Public |
| POST | `/api/events` | Create new event | Admin/Moderator |
| PUT | `/api/events/:id` | Update event | Admin/Moderator |
| DELETE | `/api/events/:id` | Delete event | Admin |
| POST | `/api/events/:id/register` | Register for event | Private |
| GET | `/api/events/search` | Search events | Public |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health status |

## Request/Response Examples

### User Registration
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

### Create Event
```bash
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "AI Hackathon 2025",
  "description": "Build innovative AI solutions",
  "shortDescription": "24-hour AI hackathon",
  "startDate": "2025-03-15T09:00:00.000Z",
  "endDate": "2025-03-16T09:00:00.000Z",
  "registrationDeadline": "2025-03-10T23:59:59.000Z",
  "categories": ["ai-ml"],
  "difficulty": "intermediate",
  "location": {
    "type": "online"
  }
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: All inputs are validated using express-validator
- **Password Hashing**: Passwords are hashed using bcryptjs
- **CORS**: Configured for frontend communication
- **Security Headers**: Helmet.js for security headers
- **JWT Expiration**: Tokens expire after configurable time

## Database Models

### User Model
- Basic info (name, email, password)
- Role-based access control
- Profile preferences
- Social links
- Account status

### Event Model
- Event details (title, description, dates)
- Location and categories
- Participant limits
- Prizes and sponsors
- Registration status

## Development

### Running Tests
```bash
npm test
```

### Code Structure
```
server/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # Documentation
```

### Adding New Routes

1. Create route file in `routes/` directory
2. Import and use in `server.js`
3. Add validation middleware
4. Implement error handling

### Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: JWT expiration time
- `CORS_ORIGIN`: Allowed CORS origin
- `RATE_LIMIT_WINDOW_MS`: Rate limiting window
- `RATE_LIMIT_MAX_REQUESTS`: Max requests per window

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure MongoDB Atlas or production database
4. Set up proper CORS origins
5. Use environment-specific configurations
6. Implement logging and monitoring

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## License

MIT License - see LICENSE file for details 