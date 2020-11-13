import React, { createContext, useContext, useEffect, useState } from "react";
import history from "../routes/history";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	// MARK: -- is the user authenticated? 
	//		 -- is the app checking whether the user is authenticated?
	const token = localStorage.getItem("token");
	const userInfo = localStorage.getItem("userInfo");
	const expiresAt = localStorage.getItem("expiresAt");

	const [authState, setAuthState] = useState({
		token,
		userInfo: userInfo ? JSON.parse(userInfo) : {},
		expiresAt
	})

	const setAuthInfo = ({ token, userInfo, expiresAt }) => {
		localStorage.setItem('token', token);
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		localStorage.setItem('expiresAt', expiresAt);

		setAuthState({
			token,
			userInfo,
			expiresAt
		});
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		localStorage.removeItem('expiresAt');
		setAuthState({});
		history.push('/');
	};

	const isAuthenticated = () => {
		if (!authState.expiresAt) {
			return false;
		}
		return (
			new Date().getTime() / 1000 < authState.expiresAt
		);
	};

	const _getTokenSilently = (data) => {
		// MARK: -- grab token from database
		return -1
	};

	const getTokenSilently = (data) => {
		return _getTokenSilently(data)
	}

	return (
		<Provider 
			value={{
				authState,
				getToken: (...p) => getTokenSilently(...p),
				setAuthState: authInfo => setAuthInfo(authInfo),
				logout,
				isAuthenticated
			}}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };