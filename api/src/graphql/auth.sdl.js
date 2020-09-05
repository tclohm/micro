const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server-core')

const AuthSchema = `
	type Query {
		hello(name: String): String!
	}
`
const AuthResolvers = {
	Query: {
		hello: (_, { name }, ctx) => {
			if (ctx.claims !== "read-posts") {
				return new AuthenticationError("not authorized")
			}
			return `Hello ${name || "World"}`
		}
	}
}

const authenticate = async (resolve, root, args, context, info) => {
	let token;
	try {
		token = jwt.verify(context.request.get('Authorization'), 'secret')
	} catch (e) {
		return new AuthenticationError('Not authorized')
	}
	context.claims = token.claims
	const result = await resolve(root, args, context, info)
	return result
}


module.exports = { AuthSchema, AuthResolvers, authenticate }