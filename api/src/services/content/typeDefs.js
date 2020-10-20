import { gql } from "apollo-server";

const typeDefs = gql`
	"""
	An ISO 8601-encoded UTC date string
	"""
	scalar DateTime

	"""
	Specifies common fields for posts and replies.
	"""
	interface Content {
		"The unique MongoDB document ID of the content."
		id: ID!
		"The profile of the user who authored the content."
		author: Profile!
		"The data and time the content was created."
		createdAt: DateTime!
		"Whether the content is blocked."
		isBlocked: Boolean
		"The URL of a media file associated with the content."
		media: String
		"Has this content been edited"
		edited: Boolean
	}

	"""
	A post contains cotent authored by a user.
	"""
	type Post implements Content {
		"The unique MongoDB document ID of the post."
		id: ID!
		"The profile of the user who authored the post."
		author: Profile!
		"The date and time the post was created."
		createdAt: DateTime!
		"Whether the post is blocked."
		isBlocked: Boolean
		"The URL of a media file associated with the content."
		media: String!
		"The body content of the post (max. 256 characters)."
		text: String!
		"Has the post been edited."
		edited: Boolean
		replies(
			after: String
			before: String
			first: Int
			last: Int
			orderBy: ReplyOrderByInput
		): ReplyConnection
	}

	"""
	A reply contains content that is a response to another post.
	"""
	type Reply implements Content {
		"The unique MongoDB document ID of the reply."
		id: ID!
		"The profile of the user who authored the reply."
		author: Profile!
		"The date and time the reply was created."
		createdAt: DateTime!
		"Where the reply is blocked."
		isBlocked: Boolean
		"The URL of a media file associated with the content."
		media: String
		"The parent post of the reply"
		post: Post
		"The author of the parent post of the reply."
		postAuthor: Profile
		"The body content of the reply (max. 256 characters)."
		result: String!
		"Has the reply been edited."
		edited: Boolean
	}

	extend type Profile @key(fields: "id") {
		id: ID! @external

		"A list of posts written by the user."
		posts(
			after: String
			before: String
			first: Int
			last: Int
			orderBy: PostOrderByInput
		): PostConnection

		"A list of replies written by the user."
		replies(
			after: String
			before: String
			first: Int
			last: Int
			orderBy: ReplyOrderByInput
		): ReplyConnection
	}

	"""
	Information about pagination in a connection.
	"""
	type PageInfo {
		"The cursor to continue from when paginating forward."
		endCursor: String
		"Whether there are more items when paginating forward."
		hasNextPage: Boolean!
		"Whether there are more items when paginating backward."
		hasPreviousPage: Boolean!
		"The cursor to continue from them paginating backward."
		startCursor: String
	}

	"""
	A list of post edges with pagination information.
	"""
	type PostConnection {
		"A list of post edges."
		edges: [PostEdge]
		"Information to assist with pagination."
		pageInfo: PageInfo!
	}

	"""
	A list of reply edges with pagination information.
	"""
	type ReplyConnection {
		"A list of reply edges."
		edges: [ReplyEdge]
		"Information to assist with pagination."
		pageInfo: PageInfo!
	}

	"""
	A single post node with its cursor
	"""
	type PostEdge {
		"A cursor for use in pagination."
		cursor: ID!
		"A post at the end of an edge."
		node: Post!
	}

	"""
	A single reply node with its cursor.
	"""
	type ReplyEdge {
		"A cursor for use in pagination."
		cursor: ID!
		"A reply at the end of an edge."
		node: Reply!
	}

	"""
	Sorting options for post connections.
	"""
	enum PostOrderByInput {
		"Order posts ascending by creation time."
		createdAt_ASC
		"Order posts descending by creation time."
		createdAt_DESC
	}

	"""
	Provides a filter on which posts may be queried.
	"""
	input PostWhereInput {
		"""
		The unique username of the user viewing posts by users they follow.

		Results includes their own posts.
		"""
		followedBy: String
		"""
		Whether to include posts that have been blocked by a moderator.

		Default is 'true'.
		"""
		includeBlocked: Boolean
	}

	"""
	Sorting options for reply connections.
	"""
	enum ReplyOrderByInput {
		"Order replies ascending by creation time."
		createdAt_ASC
		"Order replies descending by creation time."
		createdAt_DESC
	}

	"""
	Provides a filter on which replies may be queried.
	"""
	input ReplyWhereInput {
		"The unique username of the user who sent the replies."
		from: String
		"The unique username of the user who recieved the replies."
		to: String
	}

	extend type Query {
		"Retrieves a single post by MongoDB document ID."
		post(id: ID!): Post!

		"Retrieves a list of posts."
		posts(
			after: String
			before: String
			first: Int
			last: Int
			orderBy: PostOrderByInput
			filter: PostWhereInput
		): PostConnection

		"Retrieves a single reply by MongoDB document ID."
		reply(id: ID!): Reply!

		"Retrieves a list of replies."
		replies(
			after: String
			before: String
			first: Int
			last: Int
			orderBy: ReplyOrderByInput
			filter: ReplyWhereInput!
		): ReplyConnection

		"""
		Performs a search of posts.

		Results are available in descending order by relevance only.
		"""
		searchPosts(
			after: String
			first: Int
			query: PostSearchInput!
		): PostConnection
	}

	"""
	Provides data to create a post.
	"""
	input CreatePostInput {
		"The URL of a media file associated with the content."
		media: String!
		"The body content of the post (max. 256 characters)."
		text: String!
		"The unique username of the user who authored the post."
		username: String!
	}

	input UpdatePostInput {
		"The URL of a media file associated with the content."
		media: String
		"The body content of the post (max. 256 characters)."
		text: String
	}

	"""
	Provides the unique ID of an existing piece of content.
	"""
	input ContentWhereUniqueInput {
		"The unique MongoDB document ID associated with the content."
		id: ID!
	}

	"""
	Provides data to create a reply to a post
	"""
	input CreateReplyInput {
		"The unique MongoDB document ID if the parent post."
		postId: ID!
		"The body content of the reply"
		result: String!
		"The unique username of the user who authored the reply."
		username: String!
	}

	"""
	Provides data to update a reply to a post
	"""
	input UpdateReplyInput {
		"The URL of a media file associated with the content."
		media: String
		"The body content of the reply (max. 256 characters)."
		result: String
	}

	"""
	Provides a search string to query posts by text in their body content.
	"""
	input PostSearchInput {
		"The text string to search for in the post content."
		text: String!
	}

	extend type Mutation {
		"Create a new post."
		createPost(data: CreatePostInput!): Post!

		"Update an existing post."
		updatePost(data: UpdatePostInput!
				   where: ContentWhereUniqueInput!
				  ): Post!

		"Delete an existing post."
		deletePost(where: ContentWhereUniqueInput!): ID!

		"Creates a new reply to a post."
		createReply(data: CreateReplyInput!): Reply!

		"Update an existing reply."
		updateReply(data: UpdateReplyInput!
					where: ContentWhereUniqueInput!
		): Reply!

		"Deletes a reply to a post."
		deleteReply(where: ContentWhereUniqueInput!): ID!

		"Toggles the current blocked state of the post."
		togglePostBlock(where: ContentWhereUniqueInput!): Post!

		"Toggles the current blocked state of the reply."
		toggleReplyBlock(where: ContentWhereUniqueInput!): Reply!
	}
`;

export default typeDefs;