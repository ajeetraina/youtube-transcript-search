# YouTube Transcript Search Engine

A full-stack application that enables users to search through YouTube video transcripts with timestamp-based navigation. The application allows you to extract transcripts from YouTube videos, store them in a PostgreSQL database, and perform full-text search across all stored transcripts.

## System Architecture

```mermaid
graph TD
    A[Frontend - React/Vite] --> B[Backend - Express]
    B --> C[PostgreSQL Database]
    B --> D[YouTube API]
    
    subgraph Frontend Components
        A --> E[Search Component]
        A --> F[Auth Components]
        A --> G[Video Player]
        A --> H[Results Display]
    end
    
    subgraph Backend Services
        B --> I[Auth Service]
        B --> J[Transcript Service]
        B --> K[Search Service]
    end
    
    subgraph Database Schema
        C --> L[Users Table]
        C --> M[Transcripts Table]
        M --> N[Full-text Search Index]
    end
```

## Features

- User authentication and authorization
- YouTube transcript extraction
- Full-text search capabilities using PostgreSQL
- Real-time video playback with timestamp navigation
- Docker support for easy deployment
- Comprehensive test coverage
- CI/CD with GitHub Actions

## Quick Start

### Prerequisites

- Docker Desktop
- Git
- Node.js (for local development)

### Running with Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/ajeetraina/youtube-transcript-search.git
cd youtube-transcript-search
```

2. Create environment files:
```bash
# Backend environment
cat > backend/.env << EOL
DATABASE_URL=postgresql://ytuser:ytpassword@postgres:5432/youtube_transcript
JWT_SECRET=dev_secret_key_123
PORT=3000
EOL

# Frontend environment
cat > frontend/.env << EOL
VITE_API_URL=http://localhost:3000
EOL
```

3. Start the services:
```bash
docker-compose up --build
```

4. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Local Development Setup

1. Start PostgreSQL:
```bash
docker-compose up -d postgres
```

2. Install backend dependencies:
```bash
cd backend
npm install
npm run migrate
npm run dev
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Transcripts
- `POST /api/transcripts` - Add new video transcript
- `GET /api/transcripts/:videoId` - Get transcript by video ID
- `GET /api/transcripts/search?q=:query` - Search through transcripts

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Transcripts Table
```sql
CREATE TABLE transcripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_id VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  content JSONB NOT NULL,
  search_vector TSVECTOR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX transcript_search_idx ON transcripts USING gin(search_vector);
```

## Project Structure

```
youtube-transcript-search/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── migrations/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Development

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Database Migrations

```bash
cd backend
npm run migrate
```

### Linting

```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

The application includes comprehensive test coverage:

- Frontend: React Testing Library with Vitest
- Backend: Jest with Supertest
- Integration tests for API endpoints
- Database query tests
- Authentication flow tests

## Security

- JWT-based authentication
- Password hashing with bcrypt
- SQL injection prevention
- CORS configuration
- Rate limiting (optional)

## Deployment

The application can be deployed using:

1. Docker Compose (provided)
2. Manual deployment
3. Cloud platforms (AWS, GCP, Azure)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- YouTube Transcript API
- PostgreSQL Full-Text Search
- React and Vite communities
- Docker and Docker Compose teams