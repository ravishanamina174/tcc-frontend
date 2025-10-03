# ParkNet Backend API

Backend API server for ParkNet Smarter Cities application built with Node.js, Express, TypeScript, and MongoDB.

## Features

- 🚀 **Fast & Lightweight**: Built with Express.js and TypeScript
- 🗄️ **MongoDB Integration**: Using Mongoose ODM for data modeling
- 🔒 **Security**: Helmet.js for security headers, rate limiting
- 📝 **Logging**: Morgan for HTTP request logging
- 🌐 **CORS**: Configured for frontend integration
- ✅ **Type Safety**: Full TypeScript support

## API Endpoints

### Feedbacks Collection

- `POST /api/feedbacks` - Create new feedback
- `GET /api/feedbacks` - Get all feedbacks
- `GET /api/feedbacks/:id` - Get single feedback
- `PUT /api/feedbacks/:id` - Update feedback
- `DELETE /api/feedbacks/:id` - Delete feedback

### Health Check

- `GET /health` - API health status

## Environment Variables

Create a `.env` file in the backend root directory:

```env
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
MONGODB_URL=your_mongodb_connection_string
PORT=3001
NODE_ENV=development
```

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your environment variables

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Development

- **Port**: 3001 (configurable via PORT env var)
- **Database**: MongoDB Atlas
- **Frontend URL**: http://localhost:8080

## Testing with Postman

### Create Feedback
```
POST http://localhost:3001/api/feedbacks
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great parking app!"
}
```

### Get All Feedbacks
```
GET http://localhost:3001/api/feedbacks
```

### Get Single Feedback
```
GET http://localhost:3001/api/feedbacks/:id
```

### Update Feedback
```
PUT http://localhost:3001/api/feedbacks/:id
Content-Type: application/json

{
  "message": "Updated message"
}
```

### Delete Feedback
```
DELETE http://localhost:3001/api/feedbacks/:id
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts      # MongoDB connection
│   ├── controllers/
│   │   └── feedbackController.ts  # CRUD operations
│   ├── models/
│   │   └── Feedback.ts      # Mongoose schema
│   ├── routes/
│   │   └── feedbackRoutes.ts      # API routes
│   └── index.ts             # Main server file
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **dotenv**: Environment variables
- **express-rate-limit**: Rate limiting

## License

MIT
