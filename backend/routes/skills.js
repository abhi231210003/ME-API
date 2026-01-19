const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /skills - List all skills
router.get('/', (req, res) => {
  try {
    const skills = db.prepare('SELECT * FROM skills ORDER BY proficiency DESC, skill_name ASC').all();

    res.json({
      count: skills.length,
      skills: skills
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// GET /skills/top - Get top skills by proficiency
router.get('/top', (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const skills = db.prepare(`
      SELECT * FROM skills 
      ORDER BY 
        CASE proficiency 
          WHEN 'Expert' THEN 1 
          WHEN 'Advanced' THEN 2 
          WHEN 'Intermediate' THEN 3 
          WHEN 'Beginner' THEN 4 
          ELSE 5 
        END, 
      skill_name ASC 
      LIMIT ?
    `).all(parseInt(limit));

    res.json({
      count: skills.length,
      skills: skills
    });
  } catch (error) {
    console.error('Error fetching top skills:', error);
    res.status(500).json({ error: 'Failed to fetch top skills' });
  }
});

// GET /skills/:id - Get a specific skill
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const skill = db.prepare('SELECT * FROM skills WHERE id = ?').get(id);

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    console.error('Error fetching skill:', error);
    res.status(500).json({ error: 'Failed to fetch skill' });
  }
});

module.exports = router;
