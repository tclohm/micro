import { gql } from "apollo-server";

const typeDefs = gql`
	"""
	An ISO 8601-encoded UTC date string
	"""
	scalar DateTime

`;

export default typeDefs;