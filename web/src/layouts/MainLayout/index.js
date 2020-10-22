import { Box } from "grommet";
import React from "react";

const MainLayout = ({ children }) => (
	<Box
		direction="column"
		justify="between"
		style={{ minHeight: "100vh" }}
		width="100%"
	>
		{children}
	</Box>
);

export default MainLayout;