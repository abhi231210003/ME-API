# API Request Examples

## Using cURL

### Health Check
```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "OK",
  "message": "API is running",
  "timestamp": "2024-01-19T10:00:00.000Z"
}
```

### Get Profile
```bash
curl http://localhost:5000/profile
```

Response:
```json
{
  "profile": {
    "id": 1,
    "name": "John Developer",
    "email": "john@example.com",
    "bio": "Full-stack developer passionate about building scalable web applications.",
    "avatar_url": null,
    "location": "San Francisco, CA",
    "created_at": "2024-01-19T10:00:00.000Z",
    "updated_at": "2024-01-19T10:00:00.000Z"
  },
  "skills": [
    {
      "id": 1,
      "profile_id": 1,
      "skill_name": "JavaScript",
      "proficiency": "Expert",
      "created_at": "2024-01-19T10:00:00.000Z"
    }
  ],
  "projects": [...],
  "work_experience": [...],
  "social_links": [...]
}
```

### Get All Projects
```bash
curl http://localhost:5000/projects
```

Response:
```json
{
  "count": 5,
  "projects": [
    {
      "id": 1,
      "profile_id": 1,
      "title": "E-Commerce Platform",
      "description": "Full-stack e-commerce platform with payment integration",
      "github_link": "https://github.com/user/ecommerce",
      "live_link": "https://ecommerce-demo.com",
      "created_at": "2024-01-19T10:00:00.000Z",
      "updated_at": "2024-01-19T10:00:00.000Z"
    }
  ]
}
```

### Filter Projects by Skill
```bash
curl "http://localhost:5000/projects?skill=Python"
```

### Get Top 5 Skills
```bash
curl "http://localhost:5000/skills/top?limit=5"
```

Response:
```json
{
  "count": 5,
  "skills": [
    {
      "id": 1,
      "profile_id": 1,
      "skill_name": "JavaScript",
      "proficiency": "Expert",
      "created_at": "2024-01-19T10:00:00.000Z"
    },
    {
      "id": 8,
      "profile_id": 1,
      "skill_name": "TypeScript",
      "proficiency": "Advanced",
      "created_at": "2024-01-19T10:00:00.000Z"
    }
  ]
}
```

### Search
```bash
curl "http://localhost:5000/search?q=React"
```

Response:
```json
{
  "query": "React",
  "total_results": 3,
  "results": [
    {
      "id": 2,
      "skill_name": "React",
      "type": "skill"
    },
    {
      "id": 1,
      "title": "E-Commerce Platform",
      "description": "Full-stack e-commerce platform built with React",
      "type": "project"
    }
  ]
}
```

### Add a Skill
```bash
curl -X POST http://localhost:5000/profile/skills \
  -H "Content-Type: application/json" \
  -d '{
    "skill_name": "GraphQL",
    "proficiency": "Intermediate"
  }'
```

### Add a Project
```bash
curl -X POST http://localhost:5000/profile/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "Project description",
    "github_link": "https://github.com/user/project",
    "live_link": "https://project-demo.com"
  }'
```

### Update Profile
```bash
curl -X PUT http://localhost:5000/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Developer",
    "email": "john@example.com",
    "bio": "Updated bio",
    "location": "San Francisco, CA",
    "avatar_url": "https://example.com/avatar.jpg"
  }'
```

## Using JavaScript/Fetch

```javascript
// Get Profile
fetch('http://localhost:5000/profile')
  .then(res => res.json())
  .then(data => console.log(data));

// Get Projects with skill filter
fetch('http://localhost:5000/projects?skill=Python')
  .then(res => res.json())
  .then(data => console.log(data));

// Add Skill
fetch('http://localhost:5000/profile/skills', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    skill_name: 'GraphQL',
    proficiency: 'Intermediate'
  })
})
.then(res => res.json())
.then(data => console.log(data));

// Search
fetch('http://localhost:5000/search?q=React')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Using Python/Requests

```python
import requests

# Base URL
BASE_URL = 'http://localhost:5000'

# Health Check
response = requests.get(f'{BASE_URL}/health')
print(response.json())

# Get Profile
response = requests.get(f'{BASE_URL}/profile')
print(response.json())

# Filter Projects by Skill
response = requests.get(f'{BASE_URL}/projects?skill=Python')
print(response.json())

# Add Skill
data = {
    'skill_name': 'GraphQL',
    'proficiency': 'Intermediate'
}
response = requests.post(f'{BASE_URL}/profile/skills', json=data)
print(response.json())

# Search
response = requests.get(f'{BASE_URL}/search?q=React')
print(response.json())
```
