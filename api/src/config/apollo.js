import  { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

const gateway = new ApolloGateway({
	serviceList: [
		{ name: "accounts", url: process.env.ACCOUNTS_SERVICE_URL },
		{ name: "profiles", url: process.env.PROFILES_SERVICE_URL },
		{ name: "content",  url: process.env.CONTENT_SERVICE_URL  }
	],
	buildService({ url }) {
		return new RemoteGraphQLDataSource({
			url,
			willSendRequest({ request, context }) {
				request.http.headers.set(
					"user",
					context.user ? JSON.stringify(context.user) : null
				);
			}
		});
	}
})

const server = new ApolloServer({
	gateway,
	subscriptions: false,
	context: ({ req }) => {
		try {
			const token = req.headers.authorization || '';
			if (!token) {
				return { user: null }
			}
			const decoded = jwt.verify(
				token.slice(7),
				process.env.JWT_SECRET
			);
			return { user: decoded }
		} catch (err) {
			return { user: null }
		}
	}
});

export default server;