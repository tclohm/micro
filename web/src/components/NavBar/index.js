import { Link } from "react-router-dom";
import { Box, Heading } from "grommet";
import React from "react";

import AccentAnchor from "../AccentAnchor";
import AccentButton from "../AccentButton";

const NavBar = () => {
	return (
		<header>
			<Box
				align="center"
				border={{
					color: "light-4",
					size: "xsmall",
					style: "solid",
					side: "bottom"
				}}
				direction="row"
				justify="between"
				pad="small"
			>
				<Heading level="1" size="32px">
					<AccentAnchor inputColor="black">
						<Link to="/">microfails</Link>
					</AccentAnchor>
				</Heading>
				<Box
					direction="row"
					>
					<AccentButton
						inputHeight="2.5rem"
	            		inputWidth="5rem"
	            		inputColor="gray"
	            		inputBGColor="#FFF"
	            		inputBorder="white"
	            		inputHoverColor="white"
	            		border={{
	            			color: "white"
	            		}}
					>
						<Link to="/signin">Sign in</Link>
					</AccentButton>
					<AccentButton
						inputHeight="2.5rem"
	            		inputWidth="5rem"
	            		inputColor="white"
	            		inputBGColor="#FFC843"
	            		inputBorder="#FFC843"
	            		inputHoverColor="#F7D380"
					>
						<Link to="/signup">Sign up</Link>
					</AccentButton>
				</Box>
			</Box>
		</header>
	);
};

export default NavBar;