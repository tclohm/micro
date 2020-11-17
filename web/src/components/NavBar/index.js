import { Link } from "react-router-dom";
import { Box, Heading } from "grommet";
import React, { useEffect, useContext } from "react";

import AccentAnchor from "../AccentAnchor";
import AccentButton from "../AccentButton";

// MARK: -- Authentication
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {

	const authContext = useContext(AuthContext);
	const { isAuthenticated } = authContext;

	useEffect(() => {
		isAuthenticated();
	}, [isAuthenticated])


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
					{
						isAuthenticated() ?
							<AccentButton
								inputRadius="2rem"
								inputHeight="2.5rem"
			            		inputWidth="2.5rem"
			            		inputColor="black"
			            		inputBGColor="white"
			            		inputBorder="white"
			            		inputHoverColor="white"

							>
							<i className="fas fa-user-circle fa-2x"></i>
							</AccentButton>
					:
					<>
						<AccentButton
							inputHeight="2.5rem"
		            		inputWidth="5rem"
		            		inputColor="gray"
		            		inputBGColor="#FFF"
		            		inputBorder="white"
		            		inputHoverColor="white"
		            		border={{
		            			color: "black"
		            		}}
						>
							<Link to="/session/new">Sign in</Link>
						</AccentButton>
						<Link to="/signup/new">
							<AccentButton
									inputHeight="2.5rem"
				            		inputWidth="5rem"
				            		inputColor="white"
				            		inputBGColor="#FFC843"
				            		inputBorder="#FFC843"
				            		inputHoverColor="#F7D380"
								>
								Sign up
							</AccentButton>
						</Link>
					</>
					}
				</Box>
			</Box>
		</header>
	);
};

export default NavBar;