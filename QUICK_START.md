# Quick Reference Guide

## What You Have

A complete full-stack application with:
- **Express.js REST API** (Backend)
- **React Single-Page App** (Frontend)
- **SQLite Database** (File-based, no server needed)
- **Complete Documentation** (Setup & usage)

## File Structure at a Glance

```
project03/
├── backend/          ← Express API server
├── frontend/         ← React UI
├── database/         ← SQL schema & seed data
├── README.md         ← Full documentation
├── SETUP.md          ← Installation guide
└── API_EXAMPLES.md   ← Request examples
```

## To Get Started Immediately

```bash
# 1. Create database
createdb me_api_db

# 2. Backend (Terminal 1)
cd backend && npm install && cp .env.example .env
# Database is auto-created (no configuration needed)
npm run migrate && npm run dev

# 3. Frontend (Terminal 2)
cd frontend && npm install && npm start

# 4. Open http://localhost:3000
```

## API Quick Test

```bash
# Check if API is running
curl http://localhost:5000/health

# Get profile
curl http://localhost:5000/profile

# Get all projects
curl http://localhost:5000/projects

# Search
curl "http://localhost:5000/search?q=React"
```

## Main Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | API status |
| GET | `/profile` | Get complete profile |
| PUT | `/profile` | Update profile |
| GET | `/projects` | List projects |
| GET | `/projects?skill=Python` | Filter by skill |
| GET | `/skills` | List all skills |
| GET | `/skills/top?limit=5` | Top 5 skills |
| GET | `/search?q=React` | Full-text search |

## Frontend Sections

1. **Profile** - Name, email, bio, location, work history
2. **Projects** - All projects with links
3. **Skills** - All skills with proficiency levels
4. **Search** - Search across everything

## Key Files to Customize

### Backend
- `database/seed.sql` - Your profile data
- `backend/.env` - Database configuration

### Frontend
- `frontend/.env` - API URL for deployment
- `frontend/src/App.css` - Styling

## Documentation Files

| File | Purpose |
|------|---------|
| README.md | Full project overview & architecture |
| SETUP.md | Step-by-step setup instructions |
| API_EXAMPLES.md | cURL, JavaScript, Python examples |
| PROJECT_STRUCTURE.md | Detailed file organization |
| PROJECT_COMPLETE.md | What was built summary |
| postman_collection.json | Import into Postman |

## Troubleshooting Quick Links

- **Module Not Found** → Run `npm install` in backend directory
- **Port in Use** → Change PORT in `.env`
- **CORS Error** → Verify API_URL in frontend .env matches backend
- **Database Error** → Delete `me_api.db` and run `npm run migrate`
- **Blank Page** → Check browser console and terminal for errors

## Deployment Checklist

- [ ] Customize `database/seed.sql` with your data
- [ ] Update resume link in README.md
- [ ] Test all endpoints with Postman
- [ ] Build frontend: `npm run build`
- [ ] Deploy backend (Heroku, AWS, etc.)
- [ ] Deploy frontend (Vercel, Netlify, etc.)
- [ ] Update CORS_ORIGIN for production
- [ ] Update API_URL in frontend .env
- [ ] Test live endpoints
- [ ] Share URLs in README.md

## Need Help?

1. Read the appropriate documentation file
2. Check SETUP.md troubleshooting section
3. Review API_EXAMPLES.md for endpoint usage
4. Use Postman collection to test endpoints
5. Check browser console for frontend errors
6. Check terminal output for backend errors

## Technology Stack Summary

```
Frontend:    React 18 + Axios + CSS3
Backend:     Node.js + Express + SQLite
Database:    SQLite (file-based, no server)
Hosting:     Heroku (backend), Vercel (frontend)
API Style:   RESTful JSON
```

---

**Status**: ✅ Project Complete  
**Database**: SQLite (No server required!)  
**Last Updated**: January 19, 2024  
**Version**: 1.0.0
