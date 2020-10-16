import { and, rule, shield } from "graphql-shiled";

import getPermissions from "../../lib/getPermissions";

const permissions = shield(
	{},
	{ debug: process.env.NODE_ENV === "development" }
);

export default permissions;