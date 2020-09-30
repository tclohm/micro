const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = requier("@apollo/federation");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");


(async () => {
	const port = process.env.ACCOUNTS_SERVICE_PORT;

	const server = new ApolloServer({
		schema: buildFederatedSchema([{ typeDefs, resolvers }])
	});

	const { url } = await server.listen({ port });
	console.log(`Accounts service running at ${url}`);
})();