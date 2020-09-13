const requiredFields = {
	signup: [
		'name',
		'email',
		'username',
		'password'
	],
	signin: [
		'auth',
		'password'
	],
}

function anythingMissingFrom(requestBody, endpoint) {
	const requestBodyKeys = Object.keys(requestBody)
	const missing = requiredFields[endpoint].filter(field => !requestBodyKeys.includes(field))
	return missing
}

function validate(endpoint) {
	return (req, res, next) => {
		if (req.method == 'GET' || req.method == 'DELETE') {
			next()
		} else {
			if (Object.keys(req.body).length > 0) {
				const missing = anythingMissingFrom(req.body, endpoint)
				if (missing.length > 0) {
					res.status(400).json({
						message: `Request is missing the following required fields: ${missing}`
					})
				} else {
					next()
				}
			} else {
				res.status(400).json({ message: 'Missing body data' })
			}
		}
	}
}

module.exports = validate