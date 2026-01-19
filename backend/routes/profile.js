const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /profile - Get profile information with all related data
router.get('/', (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM profile LIMIT 1').get();
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profileId = profile.id;

    // Get skills
    const skills = db.prepare('SELECT * FROM skills WHERE profile_id = ? ORDER BY proficiency DESC').all(profileId);

    // Get projects
    const projects = db.prepare('SELECT * FROM projects WHERE profile_id = ? ORDER BY created_at DESC').all(profileId);

    // Get work experience
    const work = db.prepare('SELECT * FROM work_experience WHERE profile_id = ? ORDER BY start_date DESC').all(profileId);

    // Get social links
    const links = db.prepare('SELECT * FROM social_links WHERE profile_id = ?').all(profileId);

    res.json({
      profile: profile,
      skills: skills,
      projects: projects,
      work_experience: work,
      social_links: links
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /profile - Update profile information
router.put('/', (req, res) => {
  try {
    const { name, email, bio, location, avatar_url } = req.body;

    const stmt = db.prepare(`
      UPDATE profile 
      SET name = ?, email = ?, bio = ?, location = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = (SELECT id FROM profile LIMIT 1)
    `);
    
    stmt.run(name, email, bio, location, avatar_url);

    const profile = db.prepare('SELECT * FROM profile LIMIT 1').get();

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      profile: profile
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// POST /profile/skills - Add a skill
router.post('/skills', (req, res) => {
  try {
    const { skill_name, proficiency } = req.body;

    const profile = db.prepare('SELECT id FROM profile LIMIT 1').get();
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profileId = profile.id;

    const stmt = db.prepare('INSERT INTO skills (profile_id, skill_name, proficiency) VALUES (?, ?, ?)');
    const result = stmt.run(profileId, skill_name, proficiency);

    const skill = db.prepare('SELECT * FROM skills WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      message: 'Skill added successfully',
      skill: skill
    });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

// POST /profile/projects - Add a project
router.post('/projects', (req, res) => {
  try {
    const { title, description, github_link, live_link } = req.body;

    const profile = db.prepare('SELECT id FROM profile LIMIT 1').get();
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profileId = profile.id;

    const stmt = db.prepare('INSERT INTO projects (profile_id, title, description, github_link, live_link) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(profileId, title, description, github_link, live_link);

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      message: 'Project added successfully',
      project: project
    });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

module.exports = router;
