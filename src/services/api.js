import http from '../config/http';

export const authApi = {
  login: (data) => http.post('auth/login', data),
  register: (data) => http.post('auth/solicitation-user', data),
  recoveryPassword: (data) => http.post('auth/recovery-password', data),
  resetPassword: (data) => http.post('auth/reset-password', data),
};

export const contactApi = {
  create: (payload) => http.post('contact', payload),
};

export const blockApi = {
  findAll: (params = {}) => http.get('questions', { params }),
};

export const basicHealthUnitApi = {
  findAll: (params = {}) => http.get('basic-health-unit', { params }),
};

export const questionnariesApi = {
  findAllByUser: (idUser) => http.get(`questionnaires/${idUser}`),
  create: (data) => http.post('questionnaires', data),
};
