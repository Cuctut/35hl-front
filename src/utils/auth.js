
const TokenKey = 'Authorization'

const uidKey = 'uid'

const roleKey = 'role'

export const setToken = (token) => {
  return localStorage.setItem(TokenKey, token)
}

export const getToken = () => {
    return localStorage.getItem(TokenKey);
}

export const removeToken = () =>  {
  return localStorage.removeItem(TokenKey)
}

export const setUid = (uid) => {
  return localStorage.setItem(uidKey, uid)
}

export const getUid = () => {
  return localStorage.getItem(uidKey);
}

export const removeUid = () =>  {
  return localStorage.removeItem(uidKey)
}

export const setRole = (role) => {
  return localStorage.setItem(roleKey, role)
}

export const getRole = () => {
  return localStorage.getItem(roleKey);
}

export const removeRole = () =>  {
  return localStorage.removeItem(roleKey)
}

export const isRoleAdmin = () => {
  return getRole() === 'ADMIN'
}