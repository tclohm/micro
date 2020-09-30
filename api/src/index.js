const app = require('./src/config/app')
const server = require('./src/config/apollo')

server.applyMiddleware({ app })

app.listen({ port }, () => {
	
	console.log(`booting up server...\nport is on ${port}${server.graphqlPath}.....\n👟 + 🎽 = 🏃‍♀️........💨`)

})