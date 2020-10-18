import { DateTimeResolver } from "../../lib/customScalars";
const resolvers = {
	DateTime: DateTimeResolver,

	Profile: {
		posts(profile, args, { dataSources }, info) {
			return dataSources.contentAPI.getOwnPosts({
				...args,
				authorProfileId: profile.id
			});
		}
	},

	Post: {
		author(post, args, context, info) {
			return { __typename: "Profile", id: post.authorProfileId };
		},
		id(post, args, context, info) {
			return post._id;
		},
		isBlocked(post, args, context, info) {
			return post.blocked;
		}
	},

	Query: {
		post(parent, { id }, { dataSources }, info) {
			return dataSources.contentAPI.getPostById(id);
		},
		posts(parent, args, { dataSources }, info) {
			return dataSources.contentAPI.getPosts(args);
		}
	},

	Mutation: {
		createPost(parent, { data }, { dataSources }, info) {
			return dataSources.contentAPI.createPost(data);
		},
		updatePost(parent, { data, where: { id: id } }, { dataSources }, info) {
			return dataSources.contentAPI.updatePost(data, id);
		},
		deletePost(parent, { where: { id } }, { dataSources }, info) {
			return dataSources.contentAPI.deletePost(id);
		}
	}
};

export default resolvers;