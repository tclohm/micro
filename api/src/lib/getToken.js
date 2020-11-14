import fetch from "isomorphic-fetch";

export default async function getToken(email, password) {

	const query = `mutation auth($email: String!, $password: String!) {
		    		authenticate(
		    			data: { email: $email, password: $password }
		    		) { 
		    			refreshToken 
		    		} 
		    	}
		    `

	const variables = { email: email, password: password };

	const result = await fetch('http://localhost:4000/graphql', 
	{
		method: 'post',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({query, variables})
	})
		.then(response => {
			return response.json() 
		})
		.then(data => {
			return data
		})
		.catch(e => {
			console.log(e)
		})
	
	return result.data.authenticate.refreshToken
}