import React from 'react';

function Skills({ data }) {
  const { skills, count } = data;

  return (
    <div className="component-section">
      <h2>Skills</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Total skills: {count}</p>

      {skills && skills.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {skills.map(skill => (
            <div key={skill.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{skill.skill_name}</h3>
                <span className={`badge proficiency-${skill.proficiency.toLowerCase()}`}>
                  {skill.proficiency}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No skills found.</p>
      )}
    </div>
  );
}

export default Skills;
