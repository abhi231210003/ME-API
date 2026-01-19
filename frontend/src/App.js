import React, { useState, useEffect } from 'react';
import './App.css';
import { getProfile, getProjects, getSkills, search, getHealth } from './api';
import Profile from './components/Profile';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Search from './components/Search';
import Health from './components/Health';

function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [skillsData, setSkillsData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    checkHealth();
    loadProfileData();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await getHealth();
      setHealthStatus(response.data);
    } catch (err) {
      console.error('Health check failed:', err);
      setHealthStatus({ status: 'ERROR', message: 'Unable to connect to API' });
    }
  };

  const loadProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProfile();
      setProfileData(response.data);
    } catch (err) {
      setError('Failed to load profile data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProjectsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProjects();
      setProjectsData(response.data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSkillsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSkills();
      setSkillsData(response.data);
    } catch (err) {
      setError('Failed to load skills');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await search(query);
      setSearchResults(response.data);
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchResults(null);
    
    if (tab === 'projects' && !projectsData) {
      loadProjectsData();
    } else if (tab === 'skills' && !skillsData) {
      loadSkillsData();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>Me-API Playground</h1>
          <p>Personal Profile API</p>
          {healthStatus && (
            <div className={`health-badge ${healthStatus.status === 'OK' ? 'ok' : 'error'}`}>
              {healthStatus.status === 'OK' ? '✓' : '✗'} API {healthStatus.status}
            </div>
          )}
        </div>
      </header>

      <nav className="app-nav">
        <div className="container">
          <button 
            className={activeTab === 'profile' ? 'active' : ''} 
            onClick={() => handleTabChange('profile')}
          >
            Profile
          </button>
          <button 
            className={activeTab === 'projects' ? 'active' : ''} 
            onClick={() => handleTabChange('projects')}
          >
            Projects
          </button>
          <button 
            className={activeTab === 'skills' ? 'active' : ''} 
            onClick={() => handleTabChange('skills')}
          >
            Skills
          </button>
          <button 
            className={activeTab === 'search' ? 'active' : ''} 
            onClick={() => setActiveTab('search')}
          >
            Search
          </button>
        </div>
      </nav>

      <main className="app-main">
        <div className="container">
          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading">Loading...</div>}

          {activeTab === 'profile' && profileData && <Profile data={profileData} />}
          {activeTab === 'projects' && projectsData && <Projects data={projectsData} />}
          {activeTab === 'skills' && skillsData && <Skills data={skillsData} />}
          {activeTab === 'search' && <Search onSearch={handleSearch} results={searchResults} />}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Me-API Playground. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
