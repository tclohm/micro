import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
	uri: process.env.REACT_APP_GRAPHQL_URI,
	request: operation => {
		const token = localStorage.getItem("token");
		if ( token ) {
			operation.setContext({
				headers: { Authorization: `Bearer ${token}` }
			});
		}
	},
	onError: ({ networkError, graphQLErrors }) => {
		if (graphQLErrors) {
			const unauthorizedErrors = graphQLErrors.filter(
				error => error.extensions.code === "UNAUTHENTICATED"
			);
			if (unauthorizedErrors.length) {
				window.location = '/signin';
			}

		}
	}
});

export default client;