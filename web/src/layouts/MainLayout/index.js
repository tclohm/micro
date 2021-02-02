import React, { useContext, useEffect } from "react";

// MARK: -- Authentication
import { AuthContext } from "../../context/AuthContext";

const MainLayout = ({ children }) => {

	const authContext = useContext(AuthContext);
	const { isAuthenticated } = authContext;

	useEffect(() => {

		isAuthenticated();

	}, [isAuthenticated])



	return (
		<>
			<div>{children}</div>
		</>
	)
}

export default MainLayout;