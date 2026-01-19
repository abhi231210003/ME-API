import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getProfile = () => api.get('/profile');
export const getProjects = (skill = null) => {
  const params = skill ? { skill } : {};
  return api.get('/projects', { params });
};
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const getSkills = () => api.get('/skills');
export const getTopSkills = (limit = 10) => api.get(`/skills/top?limit=${limit}`);
export const search = (query) => api.get('/search', { params: { q: query } });
export const getHealth = () => api.get('/health');

export default api;
