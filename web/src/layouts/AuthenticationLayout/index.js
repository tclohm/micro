import { Link } from "react-router";
import Container from "../../components/Container";
import AuthSideBar from "../../components/AuthSideBar";
import SidebarContent from "../../components/SidebarContent";
import Artwork from "../../components/Artwork";
import Header from "../../components/Header";
import Subtitle from "../../components/Subtitle";


const AuthenticationLayout = ({ children, sidebarColor, subtitleColor }) => {

	return (
		<Container>
			<AuthSideBar inputSidebarColor={sidebarColor}>
				<SidebarContent>
					<Header>
						<Link to="" className="logo">microfails</Link>
		    			<Subtitle inputFontColor={subtitleColor}>Fail. Together. 🤦‍♀️</Subtitle>
					</Header>
					<Artwork />
				</SidebarContent>
	    	</AuthSideBar>
			<main>{children}</main>
		</Container>
  )
}

export default AuthenticationLayout