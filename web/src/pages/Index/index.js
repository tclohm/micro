import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";

import MainLayout from "../../layouts/MainLayout";

// MARK: -- Authentication
import { AuthContext } from "../../context/AuthContext";

const Index = () => {
	
	const authContext = useContext(AuthContext);
	const { isAuthenticated } = authContext;

	useEffect(() => {
		isAuthenticated();
	}, [isAuthenticated])
	
	return (
		<MainLayout>
			{ isAuthenticated() ? 
			<>
				<p>Authenticated</p>
			</>
			:
			<>
			<h1>
				Microfails is the leading destination to try new things and fail with bravado
			</h1>
				<button>
					<Link to="/signup/new">Sign up</Link>
				</button>
			</>
			}
		</MainLayout>
	);
};

export default Index;