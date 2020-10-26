import { gql } from "apollo-server";

const typeDefs = gql`
	"""
	An ISO 8601-encoded UTC date string.
	"""
	scalar DateTime
	"""
	An account is a user that provides authentication details.
	"""
	type Account @key(fields: "id") {
		"unqiue ID associated with the account"
		id: ID!
		"The date and time the account was created"
		createdAt: DateTime!
		"Email associated with the account (unique)"
		email: String!
		"Account blocked"
		isBlocked: Boolean
		"Account has moderator role"
		isModerator: Boolean
	}

	extend type Query {
		"Retrieves a single account by ID."
		account(id: ID!): Account!
		"Retrieves a list of accounts."
		accounts: [Account]
		"Retrieves the current logges in account."
		viewer: Account
	}

	"""
	Provides data to create new account
	"""
	input CreateAccountInput {
		"New account's email (unique)"
		email: String!
		"New account's password"
		password: String!
	}

	"""
	Provides the unique ID of an existing account
	"""
	input AccountWhereUniqueInput {
		"Unique ID associated with the account"
		id: ID!
	}

	"""
	Provides data to update an exisiting account.

	A current password and new password are required to update a password.

	Password and email fields cannot be update simultaneously.
	"""
	input UpdateAccountInput {
		"The updated account email."
		email: String
		"The updated account password."
		newPassword: String
		"The exisiting account password."
		password: String
	}

	extend type Mutation {
		"Toggles permissions of moderator role."
		changeAccountModeratorRole(where: AccountWhereUniqueInput!): Account!

		"Creates a new account."
		createAccount(data: CreateAccountInput): Account!

		"Deletes an account."
		deleteAccount(where: AccountWhereUniqueInput): Boolean!

		"Updates an account's details."
		updateAccount(
			data: UpdateAccountInput!
			where: AccountWhereUniqueInput!
		): Account!

		"Blocks or unblocks an account from authenticating."
		changeAccountBlockedStatus(where: AccountWhereUniqueInput!): Account!
	}
`
;

export default typeDefs;