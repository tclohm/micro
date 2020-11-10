import React from "react";
import { Route, Switch } from "react-router";

import Index from "../pages/Index";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Index} />
		<Route path="/session/new" component={Signin} />
		<Route path="/signup/new" component={Signup} />
	</Switch>
);

export default Routes;