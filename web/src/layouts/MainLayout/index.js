import { Box } from "grommet";
import React from "react";

import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MainLayout = ({ centered, children }) => (
	<Box
		direction="column"
		justify="between"
		style={{ minHeight: "100vh" }}
		width="100%"
	>
		<Navbar />
		<Box
			align={centered ? "center" : "start"}
			flex={{ grow: 1, shrink: 0 }}
			justify={centered ? "center" : "start"}
			margin={centered ? "large": "none"}
			width="100%"
		>
			<Container>{children}</Container>
		</Box>
		<Footer />
	</Box>
);

export default MainLayout;