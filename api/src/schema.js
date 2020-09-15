const { gql } = require('apollo-server-express')

export default gql`

	type Cheer {
		id: 			ID!
		userId: 		Int
		userResultId: 	Int
		cheered: 		Boolean
		user: 			User
		result: 		UserResult
	}

	type Post {
		id: 		ID!
		title: 		String
		content: 	String
		edited: 	Boolean
		createdAt: 	DateTime
		user: 		User
		results: 	UserResult[]
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
		email: 		String
		name: 		String
		username: 	String
		posts: 		[Post]
		profile: 	Profile
		results: 	[UserResult]
	}

	type UserResult {
		id: 		ID!
		failed: 	Boolean
		userId: 	Int
		postId: 	Int
		post: 		Post
		user: 		User
		cheers: 	[Cheers]
	}

	type Query {
		feed: [Post!]!
		filterPosts(searchString: String): [Post!]!
		post(id: Int!): Post
	}

	type Mutation {
		createPost(content: String, title: String!): Post!
		deleteOnePost(where: PostWhereUniqueInput!): Post
		signupUser(data: UserCreateInput!): AuthPayload
		signinUser(data: UserInput!): AuthPayload
	}

	input PostWhereUniqueInput {
		id: ID
	}

	input ResultWhereUniqueInput {
		id: ID
	}

	input ProfileWhereUniqueInput {
		id: ID
	}

	input UserCreateInput {
		email: String!
		id: ID
		name: String
		username: String
		password: String
		posts: PostCreateWithoutPostsInput
		profile: ProfileCreateWithoutProfileInput
	}

	input PostCreateWithoutPostsInput {
		connect: [PostWhereUniqueInput!]
		create: [PostCreateWithoutUserInput!]
	}

	input PostCreateWithoutUserInput {
		id: ID
		title: String!
		content: String
		edited: Boolean
		results: ResultCreateWithoutResultsInput
	}

	input ResultCreateWithoutResultsInput {
		connect: [ResultWhereUniqueInput]
		create: [ResultCreateWithoutUserInput]
	}

	input ResultCreateWithoutUserInput {
		id: ID
		failed: Boolean
	}

	input ProfileCreateWithoutProfileInput {
		connect: ProfileWhereUniqueInput
		create: ProfileCreateWithoutProfileInput
	}

	input UserInput {
		email: String?
		username: String?
		password: String
	}

	input ProfileCreateWithoutProfileInput {
		id: 			ID
		bio: 			String
		twitterHandle: 	String
		googleHandle: 	String
		githubHandle: 	String
	}
`

const resolver = {
	Query: {
		feed: (parent, args, ctx) => {
			return ctx.prisma.post.findMany({
			})
		}
	}
}