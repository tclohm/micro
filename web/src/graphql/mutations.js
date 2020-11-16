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
	mutation CreateProfile($data: CreateProfileInput) {
		createProfile(data: $data) {
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
	mutation SIGNIN($data: CreateAccountInput!) {
		authenticate(data: $data) {
			message
			refreshToken
			accountId
			expiresAt
		}
	}
`;
