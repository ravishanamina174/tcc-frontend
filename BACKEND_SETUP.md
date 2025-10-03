# 🚀 ParkNet Backend & Frontend Integration Setup

This guide will help you set up the complete ParkNet application with both frontend and backend running together.

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Clerk account for authentication

## 🏗️ Project Structure

```
parknet-smarter-cities/
├── frontend/ (existing)
│   ├── src/
│   │   ├── lib/api.ts          # API service
│   │   └── pages/Contact.tsx   # Updated contact form
│   └── vite.config.ts          # Updated with proxy
└── backend/ (new)
    ├── src/
    │   ├── config/database.ts      # MongoDB connection
    │   ├── controllers/feedbackController.ts  # CRUD operations
    │   ├── models/Feedback.ts      # Mongoose schema
    │   ├── routes/feedbackRoutes.ts # API routes
    │   └── index.ts                # Main server
    ├── package.json
    ├── tsconfig.json
    ├── env.example
    └── start.sh
```

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
Copy the example environment file and update with your values:
```bash
cp env.example .env
```

**Update `.env` with your actual values:**
```env
CLERK_SECRET_KEY=sk_test_6ErRhO7LcgtxbgMPeowqZBg01qx5iWpPx5JNPUSBOQ
CLERK_PUBLISHABLE_KEY=pk_test_Y3VycmVudC1yYXktOTEuY2xlcmsuYWNjb3VudHMuZGV2JA
MONGODB_URL=mongodb+srv://naminaravisha03:CCG5NvdxpSu09yOO@cluster0.f0d8uqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
NODE_ENV=development
```

### Step 4: Build and Start Backend
```bash
# Build the project
npm run build

# Start the server
npm start

# Or use the startup script
./start.sh
```

**Expected Output:**
```
🚀 ParkNet Backend API server running on port 3001
📊 Environment: development
🔗 Health check: http://localhost:3001/health
📝 API docs: http://localhost:3001/api/feedbacks
✅ MongoDB connected successfully
```

## 🌐 Frontend Setup

### Step 1: Install New Dependencies
```bash
# From the root directory
npm install axios
```

### Step 2: Start Frontend
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.4.19  ready in 1234 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://[::]:8080/
```

## 🔗 API Endpoints

### Health Check
- **GET** `http://localhost:3001/health`

### Feedbacks API
- **POST** `http://localhost:3001/api/feedbacks` - Create feedback
- **GET** `http://localhost:3001/api/feedbacks` - Get all feedbacks
- **GET** `http://localhost:3001/api/feedbacks/:id` - Get single feedback
- **PUT** `http://localhost:3001/api/feedbacks/:id` - Update feedback
- **DELETE** `http://localhost:3001/api/feedbacks/:id` - Delete feedback

## 🧪 Testing with Postman

### 1. Test Health Check
```
GET http://localhost:3001/health
```

### 2. Test Create Feedback
```
POST http://localhost:3001/api/feedbacks
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great parking app! Very user-friendly."
}
```

### 3. Test Get All Feedbacks
```
GET http://localhost:3001/api/feedbacks
```

## 🎯 Frontend Integration

### Contact Form
- Navigate to `http://localhost:8080/contact`
- Fill out the form (Name, Email, Message)
- Click "Send Message"
- The form will call the backend API
- Success/error messages will be displayed
- Form will be cleared after successful submission

### API Service
- Located at `src/lib/api.ts`
- Handles all HTTP requests to backend
- Includes error handling and logging
- TypeScript interfaces for type safety

## 🔧 Development Workflow

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
# From root directory
npm run dev
```

### Both Running Together
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev` (from root)
3. Backend runs on port 3001
4. Frontend runs on port 8080
5. Frontend proxies `/api` requests to backend

## 🚨 Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Check your MongoDB Atlas connection string
- **Port Already in Use**: Change PORT in .env file
- **Build Errors**: Ensure TypeScript is installed globally

### Frontend Issues
- **API Calls Failing**: Ensure backend is running on port 3001
- **CORS Errors**: Backend CORS is configured for localhost:8080
- **Proxy Issues**: Check vite.config.ts proxy configuration

### Common Commands
```bash
# Backend
cd backend
npm install
npm run build
npm start

# Frontend
npm install
npm run dev

# Check if ports are in use
lsof -i :3001  # Backend port
lsof -i :8080  # Frontend port
```

## 📱 Testing the Complete Flow

1. **Start Backend**: `cd backend && npm start`
2. **Start Frontend**: `npm run dev`
3. **Open Browser**: Navigate to `http://localhost:8080/contact`
4. **Fill Form**: Enter name, email, and message
5. **Submit**: Click "Send Message"
6. **Verify**: Check MongoDB Atlas for saved data
7. **Test API**: Use Postman to test other endpoints

## 🎉 Success Indicators

- ✅ Backend running on port 3001
- ✅ Frontend running on port 8080
- ✅ MongoDB connection successful
- ✅ Contact form submits to backend
- ✅ Data saved in MongoDB Atlas
- ✅ API endpoints responding correctly
- ✅ CORS working between frontend/backend

## 🔒 Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend only
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Global error handler with environment-based logging

## 📚 Next Steps

- Add authentication middleware
- Implement user management
- Add more API endpoints
- Set up production deployment
- Add automated testing
- Implement monitoring and logging

---

**Need Help?** Check the console logs for both frontend and backend for detailed error messages.
