import jwt from "jsonwebtoken";

export const TOKEN_KEY = "API-REST";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
  const email = jwt.decode(token, {
    complete: true,
  });
  const objToken = { token: token, email: email };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(objToken));
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
