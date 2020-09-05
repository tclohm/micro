const { GraphQLServer } = require('graphql-yoga')
const { AuthSchema, AuthResolvers, authenticate } = require('../graphql/auth.sdl.js')
const sampleItems = [
	{ name: 'Apple' },
	{ name: 'Banana' },
	{ name: 'Orange' },
	{ name: 'Melon' }
]


const typeDefs = `
	type Query {
		items: [Item!]!
	}

	type Item {
		name: String!
	}
`

const resolvers = {
	Query: {
		items: () => sampleItems,
	},
}


const server = new GraphQLServer({ 
	typeDefs, 
	resolvers, 
	context: req => ({ ...req }),
	middlewares: [authenticate]
})


module.exports = server