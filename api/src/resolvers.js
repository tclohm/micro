const { Context } = require('./context')
const resolvers = {
	Query: {
		feed: (parent, args, ctx=Context) => {
			return ctx.prisma.user.findMany()
		},
		filterProfile: (parent, args, ctx=Context) => {
			return ctx.prisma.profile.findMany({
				where: {
					OR: [
						{ user: { connect: { username: { contains: args.searchString } } } },
						{ githubHandle: { contains: args.searchString } },
						{ googleHandle: { contains: args.searchString } },
						{ twitterHandle: { contains: args.searchString } },
					],
				},
			})
		},
		profile: (parent, args, ctx=Context) => {
			return ctx.prisma.profile.findOne({
				where: { id: Number(args.where.id) }
			})
		}
	},

	Mutation: {
		signupUser: (parent, args, ctx=Context) => {
			return ctx.prisma.user.create(args)
		},

		signinUser: (parent, args, ctx=Context) => {
			const { username, email } = args.data
			if (username) {
				return ctx.prisma.user.findOne({
					where: { username: args.data.username }
				})
			} else {
				return ctx.prisma.user.findOne({ 
					where: { email: args.data.email }
				})
			}
		},

		updateProfile: (parent, args, ctx=Context) => {
			return ctx.prisma.profile.update({
				where: { id: Number(args.id) },
				data: {
					bio: args.bio,
					twitterHandle: args.twitterHandle,
					googleHandle: args.googleHandle,
					githubHandle: args.githubHandle
				}
			})
		}
	},

	User: {
		profile: (parent, args, ctx) => {
			return ctx.prisma.user
				.findOne({
					where: { id: parent.id }
				})
				.profile()
		},
	},

	Profile: {
		user: (parent, args, ctx) => {
			return ctx.prisma.profile
				.findOne({
					where: { id: parent.id },
				})
				.user()
		},
	},
}

module.exports = { resolvers }