const EXPRESS = require ('express')
const {ObjectId,MongoClient, Int32 } = require('mongodb');

const { getDB } = require('./databasehandler');

const APP = EXPRESS()
const url = 'mongodb://localhost:27017';

APP.use(EXPRESS.urlencoded({extended:true}))
APP.set('view engine', 'hbs')

APP.post('/insert',async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const newStudent = {name:nameInput,tuoi: Int32(tuoiInput)};
    const dbo = await getDB();
    const newS = await dbo.collection("students").insertOne(newStudent);
    console.log("gia tri moi cua insert la : ", newS.insertedId.toHexString());
    res.redirect('/');
})

APP.get('/delete', async(req,res)=>{
    const idInput = req.query.id;
    const dbo = await getDB();
    await dbo.collection("students").deleteOne({_id:ObjectId(idInput)});
    res.redirect('/');
})

APP.get('/',async (req,res)=>{
    const dbo = await getDB();
    const allStudents = await dbo.collection("students").find({}).toArray();
    res.render('index',{data:allStudents})
})

APP.post('/search',async (req,res)=>{
    const Search = req.body.txtSearch;
    const dbo = await getDB();
    const allStudents = await dbo.collection("students").find({name:Search}).toArray();
    res.render('index',{data:allStudents})
})

const PORT = process.env.PORT || 5000;
APP.listen(PORT);
