import express from 'express'
//import mongoose, { Collection } from 'mongoose'
import mongoose from 'mongoose'
import admin from "./models/admin.js"
import student from './models/student.js'
import stuDetails from './controllers/rollno.js'
import itLecturers from './models/itLecturers.js'
import aidsLecturers from './models/aidsLecturers.js'
import aimlLecturers from './models/aimlLecturers.js'
import civilLecturers from './models/civilLecturers.js'
import cseLecturers from './models/cseLecturers.js'
import eceLecturers from './models/eceLecturers.js'
import eeeLecturers from './models/eeeLecturers.js'
import mechLecturers from './models/mechLecturers.js'
import prodLecturers from './models/prodLecturers.js'

const app = express()

// setting view engine
app.set('view engine','ejs')
app.set('views','html')

// setting server
app.listen(3000)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//connecting to databases
const dburi = 'mongodb+srv://AWAIZ:ALPHA25742@data.o7tmfv0.mongodb.net/data?retryWrites=true&w=majority'
mongoose.connect(dburi).then(x=>{ console.log('connected to db') })


// requesting forms
app.get('/data-entry-form',(req,res)=>{ res.render('data-entry-form') })
app.get('/student-login-form',(req,res)=>{ res.render('student-login-form') })
app.get('/admin-login-form',(req,res)=>{ res.render('admin-login-form') })
app.get('/feedback-form',(req,res)=>{ res.render('feedback-form') })


// sending form submits

app.use('/data-entry-submit',(req,res)=>{
    // let obj = {
    //     lecturer:'gouri mam',
    //     subjects:[
    //         {subject:'database systems',yr:2,section:'B',sem:4,feedback:[]},
    //         {subject:'it owrksop lab',yr:2,section:'B',sem:3,feedback:[]},
    //         {subject:'network security and cryptography',yr:3,section:'B',sem:6,feedback:[]},
    //     ]
    // }
    //const data = new itLecturers(req.body)
    // const data = new itLecturers(obj)
    data.save().then(result=>{
        // res.redirect('/data-entry-form')
        res.send(result)
    })
    .catch(err=>{
        console.log(err.message)
    })})

app.post('/student-login-submit',(req,res)=>{
    //checking and saving id if student is new
    student.find({
        email:`${req.body.email}`
    }).then(result=>{
        if(!result.length==0) {
            //no access page
            res.send(result)
            console.log('already logged in')
        }
        else {
            const newStudent = new student(req.body)
            newStudent.save().then( result => {
                let studentDetailsObj = stuDetails('160420737082')
                // let studentDetailsObj = { collection:null, yr:0, section:null }
                let lecturerSubjectAarray = []
                let x = studentDetailsObj.collection
                console.log(typeof(studentDetailsObj.collection));
                x.find({'subjects.yr':studentDetailsObj.yr})
                .then(result=>{
                    res.send(result)
                    console.log(result[0].lecturer);
                    result.forEach(lecturer_object=>{
                        lecturer_object.subjects.forEach(sub=>{
                            if (sub.yr==3 && sub.sem==5 ) {
                                lecturerSubjectAarray.push([lecturer_object.lecturer,sub.subject])
                            }
                        })
                    })
                    console.log(lecturerSubjectAarray);
                })
                //res.redirect('/feedback-form')
            } )
            // .catch( err => console.log(err.message) )
        }
    }).catch(err=>{
        console.log(err.message)
    })
    //choosing the collection as per student details
    // console.log(obj.collection);
    // obj[collection].find({ 
    //     subjects:[{ yr:obj[yr], section:obj[section] }]
    // })
    //a get function can post(student id from student login form) and get data(for feedback form) ryt?
})

app.post('/admin-login-submit',(req,res)=>{
    //adding new admin
    // const newAdmin = new admin(req.body)
    // newAdmin.save().then(result=>{
    //     // res.redirect('/data-entry-form')
    //     res.send(result)
    // })
    // .catch(err=>{
    //     console.log(err.message)
    //     console.log(req.body)
    // })
    admin.find({
        email:`${req.body.email}`,
        password:`${req.body.password}`
    }).then(result=>{
        if(result.length==0) {
            res.send(result)
            console.log('not found')
        }
        else res.redirect('/admin-login-form')
    }).catch(err=>{
        console.log(err.message)
    })
}) //production worthy

app.use('/feedback-submit',(req,res)=>{
    let arr = [1,2,3,4,5,4,3,2,1,2]
    //db.users.find({ name: “Kyle” }, { name: 1, age: 1 })
    // Get all users with the name Kyle but only return their name, age, and _id
    //db.users.find({}, { age: 0 })
    //Get all users and return all columns except for age
})
