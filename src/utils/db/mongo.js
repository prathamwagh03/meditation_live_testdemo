const { MongoClient } = require("mongodb");
let dbConnection;
const getConnection = async (dbName) => {
  if(dbConnection) {
    return dbConnection.db(dbName)
  }

  dbConnection = await MongoClient.connect(`mongodb://localhost:27017/`)
  return dbConnection.db(dbName)
};

module.exports = {
  getConnection
};
