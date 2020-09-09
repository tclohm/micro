const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// build a schema
const schema = buildSchema(`
	type Query {
		me: User
	}

	type User {
		id: ID
		name: String
	}
`);

const root = {
	Query_me: (request) => {
		return request.auth.user
	},

	User_me: (user) => {
		return user.getName()
	}
};

const server = express()

// server.use(express.json())

server.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));

server.get('/', (req, res) => res.send('Is your server 🏃‍♀️?'))

module.exports = server