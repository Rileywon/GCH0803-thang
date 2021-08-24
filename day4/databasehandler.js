const {MongoClient,ObjectId} = require('mongodb');

//const URL = 'mongodb://localhost:27017';
const URL = "mongodb+srmongodb+srv://new-thang-99:27112011@cluster0.xogzz.mongodb.net/testv://new-thang-99:Thang1999+@cluster0.xogzz.mongodb.net/test";
const DATABASE_NAME = "GCH0803DB"

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function insertStudent(newStudent) {
    const dbo = await getDB();
    const newS = await dbo.collection("students").insertOne(newStudent);
    console.log("gia tri moi cua insert la : ", newS.insertedId.toHexString());
}

async function deleteStudent(idInput) {
    const dbo = await getDB();
    await dbo.collection("students").deleteOne({ _id: ObjectId(idInput) });
}

async function searchStudent(Search) {
    const dbo = await getDB();
    const allStudents = await dbo.collection("students").find({ name: Search }).toArray();
    return allStudents;
}

async function getAllStudent() {
    const dbo = await getDB();
    const allStudents = await dbo.collection("students").find({}).toArray();
    return allStudents;
}
async function getStudentByID(idInput){
    const dbo = await getDB();
    return dbo.collection("students").findOne({__id:ObjectId(idInput)});
}
    module.exports = {getDB,insertStudent,deleteStudent,searchStudent,getAllStudent,getStudentByID}