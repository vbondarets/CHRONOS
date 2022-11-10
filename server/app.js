require('dotenv').config()
const express = require("express")
const path = require('path')
const cors = require('cors')
const cookie = require('cookie-parser')
const {adminRouter, adminBro} = require('./controllers/admin');
const fileUpload = require('express-fileupload');
const port = process.env.port||3001
const sql = require('./models/db')
const host = process.env.host||'127.0.0.1'
const app =  express()
app.use(cors({
    origin:true,
    credentials:true
}));
// app.use(session({
//     secret: 'secret',
//     key: 'user',
//     resave: false,
//     saveUninitialized: true,
   
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//         httpOnly: true,
//         secure: false
//     }
// }));


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`public`));
app.use(cookie())
app.use(fileUpload())
app.use(require('./routers/index'))
app.use(adminBro.options.rootPath, adminRouter);
const start = async()=>{
    try {

        app.listen(port,host,()=>{
            console.log(`Server running at http://${host}:${port}`)
        }
        )      
    }
    catch(e) {
        console.log(e);
    }
}
start()

