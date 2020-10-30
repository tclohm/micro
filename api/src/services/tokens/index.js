import { ApolloServer } from "apollo-server";
import { applyMiddleware } from "graphql-middleware";
import { buildFederatedSchema } from "@apollo/federation";

import TokenDataSource from "./datasources/TokensDataSource"
import initMongoose from "../../config/mongoose";
import permissions from "./permissions";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";


(async () => {
	const port = process.env.TOKENS_SERVICE_PORT;

	const schema = applyMiddleware(
		buildFederatedSchema([{ typeDefs, resolvers }]),
		permissions
	);

	const server = new ApolloServer({
		schema,
		context: ({ req }) => {
			const user = req.headers.user ? JSON.parse(req.headers.user) : null;
			return { user };
		},
		dataSources: () => {
			return {
				tokensAPI: new TokensDataSource({ Token })
			};
		}
	});

	initMongoose();

	const { url } = await server.listen({ port });
	console.log(`Token service ready at ${url}`);
})();
