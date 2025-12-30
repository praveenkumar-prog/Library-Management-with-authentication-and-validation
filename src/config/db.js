const nano = require("nano");
require("dotenv").config();

const couch = nano(process.env.COUCHDB_URL);
const db = couch.use(process.env.COUCHDB_DB);

module.exports = db;
