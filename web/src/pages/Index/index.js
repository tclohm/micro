import { Link } from "react-router-dom";
import { Box, Image, Heading } from "grommet";
import React from "react";

import AccentButton from "../../components/AccentButton";
import MainLayout from "../../layouts/MainLayout";

const Index = () => {
	return (
		<MainLayout>
			<Box 
				align="center" 
				margin={{ top: "none" }}
				width="100%"
				background={{ color: "#F4EED2" }} 
				height="medium"
				direction="row"
				justify="evenly"
				>
				<Box 
					align="start"
					margin="large"
				>
					<Heading level="3">
					Microfails is the leading destination to try new things and fail with bravado
					</Heading>
					<AccentButton
						inputWidth='9rem'
						inputColor='white'
						inputBGColor='#FFC843'
						inputBorder='2px solid #FFC843'
						inputHoverColor='#F7D380'
						inputMargin="1rem 0 0 0"
					>
						<Link to="/signup">Sign up</Link>
					</AccentButton>
				</Box>
				<Box height="medium" width="medium">
					<Image fit="contain" src={process.env.PUBLIC_URL + 'placeholder.png'} />
				</Box>
			</Box>
		</MainLayout>
	);
};

export default Index;