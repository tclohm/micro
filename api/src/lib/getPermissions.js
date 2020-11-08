export default function(user) {
	if (user && user["app_metadata"]) {
		return user["app_metadata"].permissions;
	}
	return [];
}