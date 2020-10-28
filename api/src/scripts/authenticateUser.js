import getToken from "../lib/getToken";

(async () => {
	const [email, password] = process.env.slice(2)
	const accessToken = await getToken(email, password).catch(error => {
		console.log(error)
	});
	console.log(accessToken);
})();