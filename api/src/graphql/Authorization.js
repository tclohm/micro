export const schema = gql`
	type AuthPayload {
		token: String
		user: User
	}
`