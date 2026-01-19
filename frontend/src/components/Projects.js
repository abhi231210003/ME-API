import React from 'react';

function Projects({ data }) {
  const { projects, count } = data;

  return (
    <div className="component-section">
      <h2>Projects</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Total projects: {count}</p>

      {projects && projects.length > 0 ? (
        projects.map(project => (
          <div key={project.id} className="card">
            <h3>{project.title}</h3>
            {project.description && <p>{project.description}</p>}
            <div className="link-group">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn"
                >
                  GitHub Repo
                </a>
              )}
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn"
                >
                  Live Demo
                </a>
              )}
            </div>
            <div className="card-meta">
              Created: {new Date(project.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default Projects;
