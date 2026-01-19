const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /projects - List all projects, optionally filter by skill
router.get('/', (req, res) => {
  try {
    const { skill } = req.query;
    let query = 'SELECT DISTINCT p.* FROM projects p';
    let params = [];

    if (skill) {
      query += ` 
        INNER JOIN project_skills ps ON p.id = ps.project_id
        INNER JOIN skills s ON ps.skill_id = s.id
        WHERE LOWER(s.skill_name) = LOWER(?)
      `;
      params.push(skill);
    }

    query += ' ORDER BY p.created_at DESC';

    const stmt = db.prepare(query);
    const projects = params.length > 0 ? stmt.all(params[0]) : stmt.all();

    res.json({
      count: projects.length,
      projects: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /projects/:id - Get a specific project
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Get associated skills
    const skills = db.prepare(`
      SELECT s.* FROM skills s
      INNER JOIN project_skills ps ON s.id = ps.skill_id
      WHERE ps.project_id = ?
    `).all(id);

    res.json({
      ...project,
      skills: skills
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

module.exports = router;
