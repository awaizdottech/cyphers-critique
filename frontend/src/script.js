const express = require('express')
// const mongoose = require('mongoose')
// const { db } = require('./models/login.js')
const app = express()
// const lecturer = require('./models/data-entry.js')

// setting view engine
app.set('view engine','ejs')
app.set('views','html')


// setting server
app.listen(3001)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//connecting to databases
const dburi = 'mongodb+srv://AWAIZ:ALPHA25742@data.o7tmfv0.mongodb.net/data?retryWrites=true&w=majority'
// mongoose.connect(dburi)


// requesting forms
app.get('/data-entry-form',(req,res)=>{
    res.render('data-entry-form')
})
app.get('/student-login-form',(req,res)=>{
    res.render('student-login-form')
})
app.get('/admin-login-form',(req,res)=>{
    res.render('admin-login-form')
})
app.get('/feedback-form',(req,res)=>{
    res.render('feedback-form')
})


// sending form submits
app.use('/data-entry-submit',(req,res)=>{
    const data = new lecturer(req.body)
    data.save().then(result=>{
        // res.redirect('/data-entry-form')
        res.send(result)
    })
    .catch(err=>{
        console.log(err.message)
        console.log(req.body)
    })})
// app.post('/student-login-submit',(req,res)=>{
//     // const student = new studentModel(req.body)
//     console.log(student)
//     student.save().then(result=>{
//         res.redirect('/student-login-form')
//     }).catch(err=>{
//         console.log(err)
//     })
// })
// app.post('/admin-login-submit',(req,res)=>{
//     const admin = new adminModel(req.body)
//     admin.save().then(result=>{
//         res.redirect('/admin-login-form')
//     }).catch(err=>{
//         console.log(err)
//     })
// })
app.use('/form-submit',(req,res)=>{
    res.send(req.body)
})