require("dotenv").config();
const {  } = require('./config')
const server = require("./api/server.js");

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
