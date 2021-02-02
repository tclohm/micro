import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom";

import { AuthProvider } from "./context/AuthContext";

import client from "./graphql/apollo";
import GlobalStyle from "./styles/global";
import history from "./routes/history";
import Routes from "./routes";
import theme from "./styles/theme";

const App = () => (
	<AuthProvider>
		<ApolloProvider client={client}>
			<GlobalStyle />
			<Router history={history}>
				<Routes />
			</Router>
		</ApolloProvider>
	</AuthProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));