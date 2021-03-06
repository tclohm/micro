import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../graphql/apollo";
import { GET_VIEWER } from "../graphql/queries";
import history from "../routes/history";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	// MARK: -- is the user authenticated? 
	//		 -- is the app checking whether the user is authenticated?
	const [viewerQuery, setViewerQuery] = useState(null);

	const token = localStorage.getItem("token");
	const expiresAt = localStorage.getItem("expiresAt");

	const [authState, setAuthState] = useState({
		token,
		expiresAt
	});

	const setAuthInfo = ({ refreshToken, expiresAt }) => {
		localStorage.setItem('token', refreshToken);
		localStorage.setItem('expiresAt', expiresAt);

		setAuthState({
			token,
			expiresAt
		});
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('expiresAt');
		setAuthState({});
		history.push('/');
	};

	const isAuthenticated = () => {
		if (!authState.expiresAt) {
			return false;
		}
		
		return (
			Number( new Date().getTime() / 1000 ) < Number( authState.expiresAt  / 1000 )
		);
	};

	const _getTokenSilently = (data) => {
		// MARK: -- grab token from database
		return -1
	};

	const getTokenSilently = (data) => {
		return _getTokenSilently(data)
	}

	const value = {
				authState,
				getToken: (...p) => getTokenSilently(...p),
				setAuthState: authInfo => setAuthInfo(authInfo),
				logout,
				isAuthenticated
			}

	return (
		<Provider 
			value={value}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };