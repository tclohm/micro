import React, { createContext, useContext, useEffect, useState } from "react";
import history from "../routes/history";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	
	const [checkingSession , setCheckingSession] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<AuthContext.Provider value={{}}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, useAuth };
export default AuthContext;