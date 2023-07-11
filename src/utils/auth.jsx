export const getToken = () => {
  const token = sessionStorage.getItem('token');
  return token ? JSON.parse(token) : null;
};

export const getCurrentUser = () => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const token = getToken();
export const user = getCurrentUser();
