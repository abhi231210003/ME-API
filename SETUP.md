# Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional) - [Download](https://git-scm.com/)

Verify installations:
```bash
node --version
npm --version
```

**Note**: SQLite is automatically included and requires no additional installation!

## Step-by-Step Setup

### 1. Initial Setup

Clone or navigate to the project directory:
```bash
cd path/to/project03
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

The `.env` file already has correct defaults:
```env
DB_PATH=./me_api.db
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

**No changes needed** - SQLite database will be created automatically!

### 3. Initialize Database

Run the migration command to create the database and seed data:
```bash
npm run migrate
```

You should see:
```
Running migrations...
✓ Schema created successfully
✓ Seed data inserted successfully
✓ All migrations completed
```

This will create `me_api.db` file in the backend directory.

### 4. Start Backend Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

Verify it's working:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"OK","message":"API is running"}
```

### 5. Frontend Setup (in a new terminal)

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will open automatically on `http://localhost:3000`

## Verification Checklist

- [ ] Backend dependencies installed (`npm install` completed)
- [ ] `.env` file created in backend directory
- [ ] Database initialized (`npm run migrate` completed)
- [ ] `me_api.db` file exists in backend directory
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Health check returns 200: `curl http://localhost:5000/health`
- [ ] Frontend loads without errors
- [ ] Can view profile in frontend
- [ ] Can click through tabs (Profile, Projects, Skills, Search)
- [ ] Search functionality works

## Troubleshooting

### "Cannot find module 'better-sqlite3'"
```
Error: Cannot find module 'better-sqlite3'
```
**Solution:**
```bash
# Reinstall dependencies
npm install
# If still failing, try:
npm install better-sqlite3
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Kill process on port 5000
# On Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# On macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

Or change the port in `.env`:
```env
PORT=5001
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
cd backend
npm install
```

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
1. Ensure backend is running on port 5000
2. Check `.env` has `CORS_ORIGIN=http://localhost:3000`
3. Restart backend server

### Database File Not Created
**Solution:**
```bash
# Make sure you're in the backend directory
cd backend

# Run migrations
npm run migrate

# Check if me_api.db exists
ls -la me_api.db  # macOS/Linux
dir me_api.db     # Windows
```

### Migration Failed
**Solution:**
1. Delete the `me_api.db` file if it exists
2. Run migration again: `npm run migrate`
3. Check `.env` file exists and is readable

## Development Commands

### Backend
```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run migrations (create database & seed data)
npm run migrate
```

### Frontend
```bash
# Start development server with hot reload
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Database Backup

### Backup your data:
```bash
# Copy the database file
cp backend/me_api.db backend/me_api.db.backup
```

### Restore from backup:
```bash
cp backend/me_api.db.backup backend/me_api.db
```

### Reset database:
```bash
# Delete the database
rm backend/me_api.db

# Recreate it
npm run migrate
```

## Next Steps

1. **Customize Your Profile**
   - Edit `/database/seed.sql` with your information
   - Update your skills, projects, work experience, social links
   - Delete old `me_api.db` and run `npm run migrate` again

2. **Update Resume Link**
   - Add your resume URL to README.md

3. **Customize Styling**
   - Modify `/frontend/src/App.css` for your preferred colors

4. **Add Authentication** (Optional)
   - Implement JWT tokens for write operations
   - Protect POST/PUT endpoints

5. **Deploy**
   - Follow deployment guide in README.md
   - Deploy backend to Heroku
   - Deploy frontend to Vercel/Netlify

## Getting Help

- Check `README.md` for architecture overview
- See `API_EXAMPLES.md` for API usage examples
- Review `PROJECT_STRUCTURE.md` for file organization
- Check error messages and Google error codes
- Try deleting `node_modules` and running `npm install` again

---

**Quick Reset** (if something goes wrong):
```bash
# Backend
cd backend
rm me_api.db
npm run migrate

# Frontend
cd ../frontend
rm -rf node_modules
npm install
npm start
```

