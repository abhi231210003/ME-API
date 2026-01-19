# Me-API Playground

A personal profile API playground that stores your own information in a database and exposes it via a REST API with a minimal frontend.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Quick Start](#quick-start)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Frontend Usage](#frontend-usage)
- [Deployment](#deployment)
- [Sample Requests](#sample-requests)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)

## Features

✅ **Profile Management** - Create and update your candidate profile  
✅ **Projects** - Showcase your projects with descriptions and links  
✅ **Skills** - Track skills with proficiency levels  
✅ **Work Experience** - Document your career history  
✅ **Social Links** - Connect GitHub, LinkedIn, portfolio, etc.  
✅ **Search** - Full-text search across projects and skills  
✅ **Health Check** - API liveness endpoint  
✅ **CORS Enabled** - Frontend can communicate with backend  
✅ **Responsive UI** - Beautiful, modern interface  
✅ **SQLite Database** - No server setup required  

## Architecture

```
┌─────────────────────────────────────────┐
│           Frontend (React)              │
│  - Profile View                         │
│  - Projects List                        │
│  - Skills Display                       │
│  - Search Functionality                 │
└──────────────┬──────────────────────────┘
               │ HTTP/CORS
┌──────────────▼──────────────────────────┐
│      Backend API (Express.js)           │
│  - REST Endpoints                       │
│  - Request Validation                   │
│  - Database Integration                 │
└──────────────┬──────────────────────────┘
               │ SQL Queries
┌──────────────▼──────────────────────────┐
│    Database (SQLite)                    │
│  - Profile Table                        │
│  - Skills Table                         │
│  - Projects Table                       │
│  - Work Experience Table                │
│  - Social Links Table                   │
│  - me_api.db (file-based)               │
└─────────────────────────────────────────┘
```

## Database Schema

### Tables

**profile**
- `id` (PRIMARY KEY)
- `name` (TEXT)
- `email` (TEXT, UNIQUE)
- `bio` (TEXT)
- `avatar_url` (TEXT)
- `location` (TEXT)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

**skills**
- `id` (PRIMARY KEY)
- `profile_id` (FOREIGN KEY → profile)
- `skill_name` (TEXT)
- `proficiency` (TEXT) - Beginner, Intermediate, Advanced, Expert
- `created_at` (DATETIME)

**projects**
- `id` (PRIMARY KEY)
- `profile_id` (FOREIGN KEY → profile)
- `title` (TEXT)
- `description` (TEXT)
- `github_link` (TEXT)
- `live_link` (TEXT)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

**work_experience**
- `id` (PRIMARY KEY)
- `profile_id` (FOREIGN KEY → profile)
- `company_name` (TEXT)
- `position` (TEXT)
- `description` (TEXT)
- `start_date` (DATE)
- `end_date` (DATE)
- `current` (BOOLEAN)
- `created_at` (DATETIME)

**social_links**
- `id` (PRIMARY KEY)
- `profile_id` (FOREIGN KEY → profile)
- `link_type` (TEXT) - github, linkedin, portfolio, twitter, etc.
- `link_url` (TEXT)
- `created_at` (DATETIME)

**project_skills** (Many-to-many relationship)
- `id` (PRIMARY KEY)
- `project_id` (FOREIGN KEY → projects)
- `skill_id` (FOREIGN KEY → skills)

### Indexes
- `idx_skills_profile_id` on `skills(profile_id)`
- `idx_skills_name` on `skills(skill_name)`
- `idx_projects_profile_id` on `projects(profile_id)`
- `idx_work_profile_id` on `work_experience(profile_id)`
- `idx_social_links_profile_id` on `social_links(profile_id)`
- `idx_project_skills_project_id` on `project_skills(project_id)`

## Quick Start

### Prerequisites

- Node.js 14+
- npm or yarn
- No database server required (SQLite is file-based)

### Local Development Setup

1. **Navigate to project**
   ```bash
   cd project03
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Initialize Database**
   ```bash
   npm run migrate
   ```

4. **Start Backend Server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

5. **Setup Frontend** (in a new terminal)
   ```bash
   cd ../frontend
   npm install
   npm start
   ```
   Frontend runs on `http://localhost:3000`

6. **Access the Application**
   Open `http://localhost:3000` in your browser

## Setup Instructions

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
DB_PATH=./me_api.db
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

**Note**: SQLite database file will be created automatically in the backend directory.

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### Database Setup

Simply run:

```bash
cd backend
npm run migrate
```

This will:
1. Create the SQLite database file (`me_api.db`)
2. Create all tables and indexes
3. Insert seed data with your profile

## API Endpoints

### Health Check

**GET /health**
```
Response: 200 OK
{
  "status": "OK",
  "message": "API is running"
}
```

### Profile Endpoints

**GET /profile**
```
Returns full profile with all related data (skills, projects, work, links)
```

**PUT /profile**
```
Update profile information
Request body: { name, email, bio, location, avatar_url }
```

**POST /profile/skills**
```
Add a new skill
Request body: { skill_name, proficiency }
```

**POST /profile/projects**
```
Add a new project
Request body: { title, description, github_link, live_link }
```

### Projects Endpoints

**GET /projects**
```
List all projects
Query params: ?skill=python (optional - filter by skill)
```

**GET /projects/:id**
```
Get specific project with associated skills
```

### Skills Endpoints

**GET /skills**
```
List all skills
```

**GET /skills/top**
```
Get top skills by proficiency
Query params: ?limit=10 (optional)
```

**GET /skills/:id**
```
Get specific skill
```

### Search Endpoint

**GET /search**
```
Search across profile, projects, and skills
Query params: q=search_term (required)
```

## Frontend Usage

### Navigation

- **Profile Tab**: View complete profile with work experience, skills, and projects
- **Projects Tab**: Browse all projects with GitHub and live links
- **Skills Tab**: See all skills with proficiency levels
- **Search Tab**: Search across the entire database

### Search Features

- Search by skill name
- Search by project title or description
- Search by profile name or bio
- Results displayed with type (profile, project, skill)

## Deployment

### Deploy to Heroku (Backend)

1. **Prepare Backend**
   ```bash
   cd backend
   echo "web: node server.js" > Procfile
   ```

2. **Deploy**
   ```bash
   heroku login
   heroku create your-app-name-api
   git push heroku main
   heroku run npm run migrate
   ```

3. **Set Environment**
   ```bash
   heroku config:set CORS_ORIGIN=https://your-frontend-url.com
   ```

### Deploy to Vercel (Frontend)

1. **Build**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**
   - Connect GitHub repo to Vercel
   - Set `REACT_APP_API_URL` environment variable
   - Deploy

### Environment Variables for Production

Backend:
```
DB_PATH=./me_api.db
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-frontend-url.com
```

Frontend:
```
REACT_APP_API_URL=https://your-api-url.herokuapp.com
```

## Sample Requests

### Using cURL

**Health Check**
```bash
curl http://localhost:5000/health
```

**Get Profile**
```bash
curl http://localhost:5000/profile
```

**Get All Projects**
```bash
curl http://localhost:5000/projects
```

**Filter Projects by Skill**
```bash
curl "http://localhost:5000/projects?skill=Python"
```

**Get Top 5 Skills**
```bash
curl "http://localhost:5000/skills/top?limit=5"
```

**Search**
```bash
curl "http://localhost:5000/search?q=React"
```

**Add a Skill**
```bash
curl -X POST http://localhost:5000/profile/skills \
  -H "Content-Type: application/json" \
  -d '{"skill_name": "GraphQL", "proficiency": "Intermediate"}'
```

### Using Postman

1. Import the provided `postman_collection.json`
2. Create requests for each endpoint
3. Set variable `BASE_URL` to `http://localhost:5000`
4. Test CORS by calling from frontend

## Known Limitations

1. **No Authentication**: Write operations (POST, PUT) are open. Should implement JWT in production.
2. **No Input Validation**: Minimal validation. Add libraries like `joi` for production.
3. **No Pagination**: Large result sets are not paginated. Implement offset/limit.
4. **No Rate Limiting**: No rate limiting. Add `express-rate-limit` for production.
5. **Single Profile**: Database assumes one candidate profile. Multi-user would require schema changes.
6. **No Tests**: Unit and integration tests not included.
7. **No Logging**: Minimal logging. Add `morgan` and `winston` for better observability.
8. **Limited Search**: LIKE queries used. Consider full-text search for larger datasets.
9. **No File Uploads**: Avatar and resume uploads not implemented.

## Future Enhancements

- [ ] JWT Authentication for write operations
- [ ] Input validation using `joi`
- [ ] Pagination support
- [ ] Rate limiting with `express-rate-limit`
- [ ] Logging with `morgan` and `winston`
- [ ] Unit and integration tests with Jest
- [ ] Full-text search
- [ ] File upload support
- [ ] Multi-user support
- [ ] API documentation with Swagger

## Resume Link

Update this with your actual resume:
[Your Resume](https://your-resume-link.com)

## Repository

- **GitHub**: [Your Repository URL](https://github.com)
- **Backend API**: [Deployed Backend URL](https://your-api.herokuapp.com)
- **Frontend**: [Deployed Frontend URL](https://your-frontend.vercel.app)

## License

MIT License - feel free to use this project as a template for your own portfolio.

---

**Last Updated**: January 19, 2024  
**Version**: 1.0.0  
**Database**: SQLite (file-based, no server required)
