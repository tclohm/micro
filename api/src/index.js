import app  from "./config/app";
import server from "./config/apollo";

const port = process.env.PORT

server.applyMiddleware({ app })

app.listen({ port }, () => {
	console.log(` Booting up server ${port}${server.graphqlPath}`)
})