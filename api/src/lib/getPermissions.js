export default function(user) {
	if (user && user["https://microfails.com/user_authorization"]) {
		return user["https://microfails.com/user_authorization"].permissions;
	}
	return false;
}