import React from "react";
import { Route, Switch } from "react-router";

import Index from "../pages/Index";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Index} />
		<Route path="Signin" component={Signin} />
	</Switch>
);

export default Routes;