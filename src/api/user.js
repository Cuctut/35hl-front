import request from '../utils/axios'

export function login(params) {
  return request.post('/auth/login', params);
}

export function register(params) {
  return request.post('/auth/register', params);
}

export function getUserMenu() {
  return request.get('/menu/profileMenu');
}

export function getUserInfo() {
  return request.get('/auth/userInfo');
}

export function udtUserInfo(params) {
  return request.put('/auth/userInfo', params);
}

export function getAllUsers() {
  return request.get('/users');
}

export function updateUserStatus(id, status) {
  return request.put(`/users/${id}/${status}`);
}