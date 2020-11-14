import getToken from "../lib/getToken";

(async () => {
	const [email, password] = process.argv.slice(2)
	const accessToken = await getToken(email, password)
	console.log(accessToken);
})();