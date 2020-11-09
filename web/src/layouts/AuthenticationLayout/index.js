import { Link } from "react-router-dom";
import React from "react";
import Container from "../../components/Container";
import AuthSidebar from "../../components/AuthSidebar";
import SidebarContent from "../../components/SidebarContent";
import Artwork from "../../components/Artwork";
import Header from "../../components/Header";
import Subtitle from "../../components/Subtitle";


const AuthenticationLayout = ({ children, sidebarColor, subtitleColor }) => {

	return (
		<Container>
			<AuthSidebar inputSidebarColor={sidebarColor}>
				<SidebarContent>
					<Header>
						<Link to="/" className="logo">microfails</Link>
		    			<Subtitle inputFontColor={subtitleColor}>Fail. Together. 🤦‍♀️</Subtitle>
					</Header>
					<Artwork />
				</SidebarContent>
	    	</AuthSidebar>
			<main>{children}</main>
		</Container>
  )
}

export default AuthenticationLayout