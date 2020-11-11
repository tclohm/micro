import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "../pages/Index";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Index} />
		<Route exact path="/session/new" component={Signin} />
		<Route exact path="/signup/new" component={Signup} />
	</Switch>
);

export default Routes;