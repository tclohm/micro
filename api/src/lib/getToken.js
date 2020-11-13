import { gql } from "apollo-server";
import request from "request";
import util from "util";

const requestPromise = util.promisify(request);

export default async function (email, password) {
	const query = { 
				"query": 
				`mutation { authentication(email: ${email}, password: ${password})`
			}
	const options = {
		method: "POST",
		url: `http://localhost:${process.env.PORT}/graphql`,
		headers: { "content-type": "application/graphql" },
		body: query
	};

	const response = await requestPromise(options).catch(error => {
		throw new Error(error);
	});

	console.log(response.body);

}


// const token = gql`
// 	mutation Authenticate($email: email, $password: password) {
// 		authenticate(email: $email, password: $password) {
// 			refreshToken
// 		}
// 	}
// `;