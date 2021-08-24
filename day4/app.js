const EXPRESS = require ('express')
const {Int32 } = require('mongodb');

const { insertStudent,deleteStudent,searchStudent,getAllStudent,getStudentByID } = require('./databasehandler');

const APP = EXPRESS()

APP.use(EXPRESS.urlencoded({extended:true}))
APP.set('view engine', 'hbs')

APP.get('/edit',async (req,res)=>{
    const idInput = req.query.id;
    const search_Student = await getStudentByID(idInput);
    res.render('edit',{student:search_Student})
})

APP.post('/insert',async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const pictureInput = req.body.picture;
    const newStudent = {name:nameInput,tuoi: Int32(tuoiInput),picture:pictureInput};
    await insertStudent(newStudent);
    res.redirect('/');
})

APP.get('/delete',async(req,res)=>{
    const idInput = req.query.id;
    await deleteStudent(idInput);
    res.redirect('/');
})

APP.get('/',async (req,res)=>{
    const allStudents = await getAllStudent();
    res.render('index',{data:allStudents}); 
})

APP.post('/search',async (req,res)=>{
    const Search = req.body.txtSearch;
    const allStudents = await searchStudent(Search);
    res.render('index',{data:allStudents})
})

const PORT = process.env.PORT || 5000;
APP.listen(PORT);

