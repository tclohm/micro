import React, { createContext, useContext, useEffect, useState } from "react";
import history from "../routes/history";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	// MARK: -- is the user authenticated? 
	//		 -- is the app checking whether the user is authenticated?
	const token = localStorage.getItem('token');
	const userInfo = localStorage.getItem('userInfo');
	const expiresAt = localStorage.getItem('expiresAt');


	const [checkingSession , setCheckingSession] = useState(true);
	const [authenticated, setAuthenticated] = useState({
		token,
		expiresAt,
		userInfo: userInfo ? JSON.parse(userInfo) : {}
	});

	const setAuthInfo = ({ token, userInfo, expiresAt }) => {
		localStorage.setItem('token', token);
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		localStorage.setItem('expiresAt', expiresAt);

		setAuthenticated({
			token,
			userInfo,
			expiresAt
		});
	}

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		localStorage.removeItem('expiresAt');
		setAuthenticated({});
		history.push('/');
	}

	const isAuthenticated = () => {
		if(!authenticated.expiresAt) {
			return false;
		}
		return (
			new Date().getTime() / 1000 < authenticated.expiresAt
		);
	};

	return (
		<AuthContext.Provider value={{
			checkingSession,
			authenticated,
			setAuthenticated: authInfo => setAuthenticated(authInfo);
			logout,
			isAuthenticated
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };