import { Link } from "react-router-dom";
import React from "react";
import Container from "../../components/Container";
import AuthSidebar from "../../components/AuthSidebar";
import SidebarContent from "../../components/SidebarContent";
import Artwork from "../../components/Artwork";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import Subtitle from "../../components/Subtitle";


const AuthenticationLayout = ({ children, sidebarColor, subtitleColor }) => {

	return (
		<Container>
			<AuthSidebar inputSidebarColor={sidebarColor}>
				<SidebarContent>
					<Header>
						<Link to="/"><Logo>microfails</Logo></Link>
		    			<Subtitle inputFontColor={subtitleColor}>
		    			Fail. Together. 
		    				<span role="img" aria-label="emoji facepalm">🤦‍♀</span>
		    			</Subtitle>
					</Header>
					<Artwork />
				</SidebarContent>
	    	</AuthSidebar>
			<main>{children}</main>
		</Container>
  )
}

export default AuthenticationLayout