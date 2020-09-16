const { ApolloServer } = require('apollo-server-express')
const jwt = require('express-jwt')
const { schema } = require('./schema')
const { createContext } = require('./context')


const express = require('express')

const app = express()

const server = new ApolloServer({
		schema,
		context: createContext 
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
	
	console.log(`booting up server...\nport is on 4000.....\n👟 + 🎽 = 🏃‍♀️........💨`)

})