-- Seed data for Me-API (Example candidate profile)
-- Customize this with your actual information

-- Insert profile
INSERT INTO profile (name, email, bio, location) VALUES (
  'John Developer',
  'john@example.com',
  'Full-stack developer passionate about building scalable web applications. Experienced in Node.js, React, and SQLite.',
  'San Francisco, CA'
);

-- Insert skills
INSERT INTO skills (profile_id, skill_name, proficiency) VALUES
(1, 'JavaScript', 'Expert'),
(1, 'Node.js', 'Expert'),
(1, 'React', 'Advanced'),
(1, 'SQLite', 'Advanced'),
(1, 'Python', 'Intermediate'),
(1, 'Docker', 'Intermediate'),
(1, 'AWS', 'Intermediate'),
(1, 'TypeScript', 'Advanced'),
(1, 'Express.js', 'Expert'),
(1, 'SQL', 'Advanced');

-- Insert projects
INSERT INTO projects (profile_id, title, description, github_link, live_link) VALUES
(1, 'E-Commerce Platform', 'Full-stack e-commerce platform with payment integration and inventory management', 'https://github.com/user/ecommerce', 'https://ecommerce-demo.com'),
(1, 'Real-time Chat Application', 'Chat application with WebSocket support, user authentication, and message history', 'https://github.com/user/chat-app', 'https://chat-demo.com'),
(1, 'Data Analytics Dashboard', 'Interactive dashboard for visualizing business metrics and KPIs', 'https://github.com/user/analytics', 'https://analytics-demo.com'),
(1, 'ML Model API', 'REST API for serving machine learning models with Flask and SQLite', 'https://github.com/user/ml-api', NULL),
(1, 'Mobile App Backend', 'Scalable backend for mobile application with GraphQL and authentication', 'https://github.com/user/mobile-backend', NULL);

-- Insert work experience
INSERT INTO work_experience (profile_id, company_name, position, description, start_date, end_date, current) VALUES
(1, 'Tech Corp', 'Senior Full-Stack Developer', 'Led development of microservices architecture and mentored junior developers', '2021-01-15', NULL, 1),
(1, 'StartUp Inc', 'Full-Stack Engineer', 'Built and deployed React applications with Node.js backends', '2019-06-01', '2020-12-31', 0),
(1, 'Web Services LLC', 'Junior Developer', 'Developed responsive web applications using HTML, CSS, JavaScript', '2018-01-15', '2019-05-31', 0);

-- Insert social links
INSERT INTO social_links (profile_id, link_type, link_url) VALUES
(1, 'github', 'https://github.com/johndeveloper'),
(1, 'linkedin', 'https://linkedin.com/in/johndeveloper'),
(1, 'portfolio', 'https://johndeveloper.com'),
(1, 'twitter', 'https://twitter.com/johndeveloper');
