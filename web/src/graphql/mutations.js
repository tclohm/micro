import { gql } from "@apollo/client";

export const SIGNUP = gql`
	mutation Signup($email: String!, $password: String!) {
		createAccount(email: $email, password: $password) {
			message
			refreshToken
			accountId
			expiresAt
		}
	}
`;

export const CREATEPROFILE = gql`
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


export const SIGNIN = gql`
	mutation Signin($auth: String, $password: String) {
		authenticate(auth: $auth, password: $password) {
			message
			refreshToken
			accountId
			expiresAt
		}
	}
`;