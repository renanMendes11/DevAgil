export const TOKEN_KEY = "user";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getUser = () => {  
    const user = localStorage.getItem(TOKEN_KEY);
    return JSON.parse(user);
};
export const login = user => {
   const userAux = JSON.stringify(user);
    localStorage.setItem(TOKEN_KEY, userAux);
};
export const logout = () => {
    localStorage.removeItem("user");
};