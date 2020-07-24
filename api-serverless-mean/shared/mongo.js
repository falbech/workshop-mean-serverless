
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

const config = {
  url: 'mongodb://localhost:27017/crud-workshop-mean-az',
  dbName: 'crud-workshop-mean-az'
}

async function createConnection(){
  const connection = await MongoClient.connect(config.url, { useNewUrlParser: true });
  const db = connection.db(config.dbName);
  return {
    connection,
    db
  }
}

module.exports = createConnection;
