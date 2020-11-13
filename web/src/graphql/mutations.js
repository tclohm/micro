import { gql } from "@apollo/client";

const SIGNUP = gql`
	mutation Signup($email: String!, $password: String!) {
		createAccount(email: $email, password: $password) {
			message
			refreshToken
			accountId
			expiresAt
		}
	}
`;

const CREATEPROFILE = gql`
	mutation CreateProfile($accountId: String!, $description: String, $fullName: String, $username: String!) {
		createProfile(accountId: $accountId, description: $description, fullName: $fullName, username: $username) {
			id
			account
			avatar
			description
			fullName
			username
		}
	}
`;
