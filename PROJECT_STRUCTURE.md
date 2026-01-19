# Project Structure

```
project03/
├── backend/                    # Express.js Backend
│   ├── routes/                 # API route handlers
│   │   ├── profile.js          # Profile CRUD operations
│   │   ├── projects.js         # Projects endpoints
│   │   ├── skills.js           # Skills endpoints
│   │   ├── search.js           # Search functionality
│   │   └── health.js           # Health check
│   ├── migrations/             # Database migrations
│   │   └── run.js              # Migration runner
│   ├── server.js               # Main server file
│   ├── db.js                   # Database connection pool
│   ├── package.json            # Backend dependencies
│   ├── .env.example            # Environment variables example
│   └── README.md               # Backend specific docs
│
├── frontend/                   # React Frontend
│   ├── public/                 # Static files
│   │   └── index.html          # Main HTML file
│   ├── src/                    # React source code
│   │   ├── components/         # React components
│   │   │   ├── Profile.js      # Profile component
│   │   │   ├── Projects.js     # Projects component
│   │   │   ├── Skills.js       # Skills component
│   │   │   ├── Search.js       # Search component
│   │   │   └── Health.js       # Health check component
│   │   ├── api.js              # API client
│   │   ├── App.js              # Main App component
│   │   ├── App.css             # Global styles
│   │   ├── index.js            # React entry point
│   │   └── index.css           # Base styles
│   ├── package.json            # Frontend dependencies
│   ├── .env                    # Frontend environment variables
│   └── README.md               # Frontend specific docs
│
├── database/                   # Database files
│   ├── schema.sql              # Database schema definition
│   └── seed.sql                # Seed data for database
│
├── README.md                   # Main project documentation
├── API_EXAMPLES.md             # cURL and code examples
├── PROJECT_STRUCTURE.md        # This file
├── postman_collection.json     # Postman API collection
└── .gitignore                  # Git ignore rules
```

## Directory Descriptions

### `/backend`
Contains the Express.js REST API server.
- **routes/**: Modular route handlers for different resources
- **migrations/**: Database initialization and seeding
- **server.js**: Express app setup and middleware configuration
- **db.js**: SQLite database connection

### `/frontend`
Contains the React single-page application.
- **src/components/**: Reusable React components
- **src/api.js**: Axios-based API client wrapper
- **App.js**: Main application component with navigation
- **App.css**: Complete styling for all components

### `/database`
Contains database definition and seed data.
- **schema.sql**: CREATE TABLE statements and indexes
- **seed.sql**: Initial profile data (sample data)

## File Purposes

### Backend Files
- `server.js`: Express app initialization, middleware setup, route mounting
- `db.js`: SQLite database connection configuration
- `routes/profile.js`: GET /profile, PUT /profile, POST /skills, POST /projects
- `routes/projects.js`: GET /projects, GET /projects/:id
- `routes/skills.js`: GET /skills, GET /skills/top, GET /skills/:id
- `routes/search.js`: GET /search?q=query
- `routes/health.js`: GET /health (liveness check)
- `migrations/run.js`: Executes schema.sql and seed.sql on startup

### Frontend Files
- `App.js`: Navigation, tab management, API calls
- `components/Profile.js`: Displays complete profile with work history
- `components/Projects.js`: Lists all projects with links
- `components/Skills.js`: Grid view of all skills with proficiency
- `components/Search.js`: Search form and results display
- `api.js`: Centralized API client with methods for all endpoints
- `App.css`: Responsive design, color scheme, layout

### Database Files
- `schema.sql`: 5 main tables + 1 junction table, 6 indexes
- `seed.sql`: Sample candidate with 10 skills, 5 projects, 3 jobs, 4 links

## Technology Stack

**Backend**
- Node.js + Express.js
- SQLite (file-based, no server)
- CORS enabled
- Body-parser for JSON

**Frontend**
- React 18
- Axios for HTTP
- CSS3 with responsive design
- No additional UI libraries (vanilla CSS)

**Database**
- SQLite3 (better-sqlite3 package)
- File-based (me_api.db)
- No server setup required
- SQLite 3.x+
- SQL migrations approach
- Foreign key constraints
- Performance indexes

## Data Flow

1. **User opens frontend** → React App loads, fetches profile from API
2. **Navigation** → User clicks tabs to switch views
3. **API calls** → Frontend uses axios to call backend endpoints
4. **Backend processing** → Express validates, queries SQLite
5. **Response** → JSON returned to frontend
6. **Rendering** → React components display data

## Key Design Decisions

1. **Single Profile**: Simplified schema assuming one candidate
2. **No Authentication**: Open endpoints for demo purposes
3. **SQLite**: File-based relational DB suitable for structured profile data
4. **Express + React**: Modern, familiar stack for full-stack demo
5. **CSS-only Frontend**: No dependencies, easy to understand
6. **Seed Data**: Sample candidate profile for testing
7. **CORS Enabled**: Frontend and backend can be on different ports/domains
