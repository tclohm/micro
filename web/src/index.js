import { ApolloProvider } from "@apollo/client";
import { Grommet } from "grommet";
import { Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import React from "react";
import ReactDOM from "react-dom";

import { AuthProvider } from "./context/AuthContext";

import client from "./graphql/apollo";
import GlobalStyle from "./styles/global";
import history from "./routes/history";
import Routes from "./routes";
import theme from "./styles/theme";

const App = () => (
	<Auth0Provider
		domain={process.env.REACT_APP_AUTH0_DOMAIN}
		clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
		redirectUri={`${window.location.origin}/index`}
	>
		<AuthProvider>
			<ApolloProvider client={client}>
				<GlobalStyle />
				<Grommet theme={theme}>
					<Router history={history}>
						<Routes />
					</Router>
				</Grommet>
			</ApolloProvider>
		</AuthProvider>
	</Auth0Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));