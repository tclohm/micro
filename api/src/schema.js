const { gql } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const { resolvers } = require('./resolvers')

const typeDefs = gql`

	interface AuthPayload {
		token: String!
	}

	type Profile {
		id: 			ID!
		bio: 			String
		twitterHandle: 	String
		googleHandle: 	String
		githubHandle: 	String
		user: 			User
	}

	type User {
		id: 		ID!
		email: 		String!
		name: 		String
		username: 	String!
		profile: 	Profile
	}

	type SignUpPayload {
		userErrors: [UserError!]!
		account: Account
	}

	type UserError {
		message: String!
		field: [String!]
		code: UserErrorCode
	}

	type Query {
		feed: [User!]!
		filterProfile(searchString: String): [Profile!]!
		profile(where: ProfileWhereUniqueInput): Profile
	}

	type Mutation {
		signupUser(data: UserCreateInput!): SignUpPayload!
		signinUser(data: AccountInput): SignInPayload!
		updateProfile(where: ProfileWhereUniqueInput, data: ProfileUpdateInput): Profile!
	}

	input ProfileWhereUniqueInput {
		id: ID
	}

	input AccountCreateInput {
		email: String!
		id: ID
		name: String
		username: String
		password: String
		profile: ProfileCreateInput
	}

	input AccountInput {
		email: String
		username: String
		password: String
	}

	

	input ProfileCreateInput {
		id: 			ID
		bio: 			String
		twitterHandle: 	String
		googleHandle: 	String
		githubHandle: 	String
	}

	input ProfileUpdateInput {
		bio: 			String
		twitterHandle: 	String
		googleHandle: 	String
		githubHandle: 	String
	}
`

const schema = makeExecutableSchema({
	resolvers,
	typeDefs,
})

module.exports = { schema }