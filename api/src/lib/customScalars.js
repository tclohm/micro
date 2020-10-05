import { ApolloError } from "apollo-server";
import { GraphQLScalarType } from "graphql";
import { isISO8601 } from "validator";

export const DateTimeResolver = new GraphQLScalarType({
	name: "DateTime",
	description: "An ISO 8601-encoded UTC date string."
});