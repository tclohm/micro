import React, { useContext, useEffect } from "react";

import { Avatar, Button, Nav } from "grommet";

import StyledSettingSidebar from "./styles";

// MARK: -- Authentication
import { AuthContext } from "../../context/AuthContext";

const SettingSidebar = (props) => {

	const authContext = useContext(AuthContext);
	const { logout } = authContext;

	return (
		<StyledSettingSidebar {...props}
			background="white"
			pad="small"
			footer={
				<Button 
					icon={<i className="fas fa-sign-out-alt"></i>} 
					hoverIndicator
					onClick={ () => { logout() } }
				/>
			}
		>
			<Nav gap="small">
				<Button icon={<i className="fas fa-user-edit"></i>} hoverIndicator />
				<Button icon={<i className="fas fa-cog"></i>} hoverIndicator />
			</Nav>
		</StyledSettingSidebar>
	);
}

export default SettingSidebar;