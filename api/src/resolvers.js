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
			const b = (args.data.profile.bio) ? ars.data.profile.bio : null
			const th = (args.data.profile.twitterHandle) ? ars.data.profile.twitterHandle : null
			const gh = (args.data.profile.githubHandle) ? ars.data.profile.githubHandle : null
			const ggh = (args.data.profile.googleHandle) ? ars.data.profile.googleHandle : null
			return ctx.prisma.user.create({
				data: {
					email: args.data.email,
					username: args.data.username,
					name: args.data.name,
					password: args.data.password,
					profile: {
						create: {
							bio: b,
							twitterHandle: th,
							githubHandle: gh,
							googleHandle: ggh
						}
					}
				}
			})
			
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