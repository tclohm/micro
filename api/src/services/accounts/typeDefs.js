const { gql } = require("apollo-server")

const typeDefs = gql`
	extend type Query {
		hello: String
	}
`
;

module.exports = typeDefs;