const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../secrets.js')
const { prisma } = require('../../lib/db.js')
const validate = require('./validate.js');

router.post('/signup', validate('signup'), (req, res) => {
	const user = req.body
	bcrypt.genSalt(13, function(error, salt) {
		bcrypt.hash(user.password, salt, function(error, hash) {
			if ( error ) {
				res.status(500).json({ message: 'error hashing data' })
				console.log(error)
			} else {
				user.password = hash
				prisma.user.create({
					data: {
						name: user.name,
						email: user.email,
						username: user.username,
						password: user.password,
					}
				}).then(usr => {
					if ( usr ) {
						const token = generateToken(usr)
						res.status(201).json({ message: 'created', token: token })
					} else {
						res.status(401).json({ message: 'creation failed. Email and/or Username may already be in use' })
					}
				}).catch(err => {
					res.status(401).json({ message: 'invalid credentials'})
				})
			}
		})
	})
})

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
	};

	const options = {
		expiresIn: '15m',
	}

	return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router