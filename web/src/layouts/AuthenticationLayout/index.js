import { Link } from "react-router-dom";
import React from "react";


const AuthenticationLayout = ({ children }) => {

	return (
		<div>
			<Link to="/">microfails</Link>
			<p>Fail. Together. 
				<span role="img" aria-label="emoji facepalm">🤦‍♀</span>
			</p>
			<main>{children}</main>
		</div>
  )
}

export default AuthenticationLayout