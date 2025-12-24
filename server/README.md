# Server Backend

Backend API for Pet Manager application built with Node.js, Express, TypeScript, and MongoDB.

## Features

- 🔐 JWT Authentication
- 📝 CRUD operations for pets
- ⭐ Favorites system
- 🔍 Search and filtering
- 📄 Pagination
- 🛡️ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Input validation
- 🧪 Comprehensive testing

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript
- **Authentication:** JWT + bcryptjs
- **Security:** Helmet, express-rate-limit
- **Testing:** Jest, Supertest

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file (copy from `.env.example`):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pet-manager
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

### Database Setup

Seed the database with sample data:

```bash
npm run seed
```

### Development

```bash
npm run dev
```

Server will run on http://localhost:5000

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health check

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Pets
- `GET /api/pets` - Get all pets
- `GET /api/pets/:id` - Get single pet
- `POST /api/pets` - Create pet (protected)
- `PUT /api/pets/:id` - Update pet (protected)
- `DELETE /api/pets/:id` - Delete pet (protected)

### Favorites
- `GET /api/favorites` - Get user favorites (protected)
- `POST /api/favorites` - Add favorite (protected)
- `DELETE /api/favorites/:petId` - Remove favorite (protected)
- `GET /api/favorites/check/:petId` - Check if favorited (protected)

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
server/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth, error handling
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utilities (seed script)
│   └── server.ts       # Entry point
├── dist/               # Compiled JavaScript
└── package.json
```

## MongoDB Collections

### Users
```typescript
{
  email: string
  password: string (hashed)
  username: string
  role: 'user' | 'admin'
  timestamps: true
}
```

### Pets
```typescript
{
  name: string
  kind: 'dog' | 'cat' | 'bird'
  weight: number
  height: number
  length: number
  number_of_lives?: number  // cats only
  wingspan?: number         // birds only
  num_of_feathers?: number  // birds only
  ownerId?: ObjectId
  timestamps: true
}
```

### Favorites
```typescript
{
  userId: ObjectId (ref: User)
  petId: ObjectId (ref: Pet)
  timestamps: true
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Helmet security headers
- Input validation
- Error handling middleware

## License

MIT
