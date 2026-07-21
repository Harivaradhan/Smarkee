import api from './api.js';

const authService = {
  login: async ({ username, password, role }) => {
    const response = await api.post('/auth/login', { username, password, role });
    return response.data;
  },
};

export default authService;
