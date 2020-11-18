import { Box } from "grommet";
import React, { useContext, useEffect } from "react";

import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// MARK: -- Authentication
import { AuthContext } from "../../context/AuthContext";

const MainLayout = ({ centered, children }) => {

	const authContext = useContext(AuthContext);
	const { isAuthenticated } = authContext;

	useEffect(() => {

		isAuthenticated();

	}, [isAuthenticated])



	return (
		<Box
			direction="column"
			justify="between"
			style={{ minHeight: "100vh" }}
			width="100%"
		>
			<Navbar 
				isAuthenticated={isAuthenticated()} 
			/>
			<Box
				align={centered ? "center" : "start"}
				flex={{ grow: 1, shrink: 0 }}
				justify={centered ? "center" : "start"}
				margin={centered ? "large": "none"}
				width="100%"
			>
				<Container
				>{children}</Container>
			</Box>
			<Footer />
		</Box>
	)
}

export default MainLayout;