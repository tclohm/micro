require("dotenv").config();
const server = require('./src/server.js');
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`🏃‍♀️ server listening on port ${port} 🏃‍♀️`));