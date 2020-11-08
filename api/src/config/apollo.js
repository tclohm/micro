import  { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";

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
				console.log(context)
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
		console.log(req)
		const user = req.headers.user || null
		return { user }
	}
});

export default server;