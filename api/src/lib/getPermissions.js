export default function(user) {
	if (user && user["https://microfails.com/user_authentication"]) {
		return user["https://microfails.com/user_authentication"].permissions;
	}
	return false;
}