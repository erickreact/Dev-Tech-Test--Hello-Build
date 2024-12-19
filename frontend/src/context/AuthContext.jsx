import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const login = (userData, accessToken) => {
		setUser(userData);
		setToken(accessToken);
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("token", accessToken);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
