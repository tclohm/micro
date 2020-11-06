export default function(user) {
	console.log("get perm", user)
	if (user && user["https://microfails.com/user_authorization"]) {
		return user["https://microfails.com/user_authorization"].permissions;
	}
	return [];
}