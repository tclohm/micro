const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-express");

const gateway = new ApolloGateway({
	serviceList: [
		{ name: "accounts", url: process.env.ACCOUNTS_SERVICE_URL }
	]
})

const server = new ApolloServer({
	gateway,
	subscriptions: false
})

module.exports = server 