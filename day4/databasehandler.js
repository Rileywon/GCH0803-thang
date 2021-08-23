const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';

async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db("GCH0803DB");
    return dbo;
}

module.exports = {getDB}