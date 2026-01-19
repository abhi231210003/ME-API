const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /search - Search across profile, projects, and skills
router.get('/', (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchTerm = `%${q}%`;

    // Search in projects and skills
    const projects = db.prepare(`
      SELECT id, title, description, 'project' as type FROM projects 
      WHERE LOWER(title) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?)
      ORDER BY created_at DESC
    `).all(searchTerm, searchTerm);

    const skills = db.prepare(`
      SELECT id, skill_name as name, 'skill' as type FROM skills 
      WHERE LOWER(skill_name) LIKE LOWER(?)
      ORDER BY skill_name ASC
    `).all(searchTerm);

    const profile = db.prepare(`
      SELECT id, name, email, bio, 'profile' as type FROM profile
      WHERE LOWER(name) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?) OR LOWER(bio) LIKE LOWER(?)
    `).all(searchTerm, searchTerm, searchTerm);

    const results = [
      ...profile,
      ...projects,
      ...skills
    ];

    res.json({
      query: q,
      total_results: results.length,
      results: results
    });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
