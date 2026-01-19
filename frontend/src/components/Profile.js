import React from 'react';

function Profile({ data }) {
  const { profile, skills, projects, work_experience, social_links } = data;

  return (
    <div className="component-section">
      <h2>Profile</h2>

      <div className="info-grid">
        <div className="info-item">
          <label>Name</label>
          <p>{profile.name}</p>
        </div>
        <div className="info-item">
          <label>Email</label>
          <p>{profile.email}</p>
        </div>
        {profile.location && (
          <div className="info-item">
            <label>Location</label>
            <p>{profile.location}</p>
          </div>
        )}
      </div>

      {profile.bio && (
        <div className="component-section">
          <h3>About</h3>
          <p>{profile.bio}</p>
        </div>
      )}

      {social_links && social_links.length > 0 && (
        <div>
          <h3>Connect</h3>
          <div className="link-group">
            {social_links.map(link => (
              <a
                key={link.id}
                href={link.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-btn"
              >
                {link.link_type.charAt(0).toUpperCase() + link.link_type.slice(1)}
              </a>
            ))}
          </div>
        </div>
      )}

      {work_experience && work_experience.length > 0 && (
        <div>
          <h3>Work Experience</h3>
          {work_experience.map(job => (
            <div key={job.id} className="card">
              <h4>{job.position} at {job.company_name}</h4>
              {job.description && <p>{job.description}</p>}
              <div className="card-meta">
                {job.start_date && (
                  <>
                    {new Date(job.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    {job.end_date ? ` - ${new Date(job.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}` : ' - Present'}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {skills && skills.length > 0 && (
        <div>
          <h3>Top Skills</h3>
          {skills.slice(0, 10).map(skill => (
            <div key={skill.id} className="skill-item">
              <span className="skill-name">{skill.skill_name}</span>
              <span className={`badge proficiency-${skill.proficiency.toLowerCase()}`}>
                {skill.proficiency}
              </span>
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div>
          <h3>Featured Projects</h3>
          {projects.slice(0, 3).map(project => (
            <div key={project.id} className="card">
              <h4>{project.title}</h4>
              {project.description && <p>{project.description}</p>}
              <div className="link-group">
                {project.github_link && (
                  <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="link-btn">
                    GitHub
                  </a>
                )}
                {project.live_link && (
                  <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="link-btn">
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
