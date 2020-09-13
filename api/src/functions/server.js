const express = require('express')
const app = express()
const { prisma } = require('../lib/db.js')

const authRoutes = require('../services/auth/routes')

app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/api/users', async function (req, res) {
	const users = await prisma.user.findMany()
	console.log(users)
	res.json({ message: 'ok!' })
})

app.get('/', (req, res) => res.send('Is your server 🏃‍♀️?'))

module.exports = app