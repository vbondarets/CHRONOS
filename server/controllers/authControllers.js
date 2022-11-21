const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const db = require('../models/db')
const message = require("nodemailer")
const User = require('../models/userModel')
const check = require('../midleware/checkUserinfo')
const moment = require('moment')
const holidatapi = require('holidayapi')
const axios = require('axios')

function jwtGenerator(id, login, email, role){
    const token = jwt.sign(
        {id: id, login: login, email: email, role: role}, 
        process.env.SECRETKEY,
        {expiresIn: '12h'}
    );
    return token;
}
async function createNationalCalendar(events, login, user_id, country) {
    return await db.execute(`INSERT INTO calendar (title, description, author_id) VALUES ('National Calendar ${login}', 'National calendar of ${country}','${user_id}')`).then(resp => {
        if (resp[0].affectedRows > 0) {
            const calendar_id = resp[0].insertId
            db.execute(`INSERT INTO calendar_users (user_id, calendar_id) VALUES ('${user_id}', '${calendar_id}')`).then (resp => {
                if (resp[0].affectedRows > 0) {
                    for (let index = 0; index < events.length; index++) {
                         db.execute(`INSERT INTO event (title, description, color, type, start_At, end_At, author_id, calendar_id)
                                     VALUES ("${events[index].name}", "${events[index].name}", 'blue', 'reminder', 
                                    '${moment(events[index].date).add(1, 'year').format('YYYY-MM-DD HH:mm')}',
                                    '${moment(events[index].date).add(1, 'year').add(5, 'minute').format('YYYY-MM-DD HH:mm')}', 
                                    '${user_id}', '${calendar_id}')`).then(resp => {
                                        if (resp[0].affectedRows > 0) {
                                            db.execute(`INSERT INTO event_users (user_id, event_id, calendar_id) VALUES ('${user_id}','${resp[0].insertId}', '${calendar_id}')`)
                                        }
                                    })
                    }
                }
            })
        }
    })
}


class Authentication {
    async register(req,res) {
        // console.log("LOX");
        const Check = new check()
        const {login, email, full_name, password} = req.body
        if (!login || !email || !full_name || !password) {
            return res.status(404).json({message:"Please fill all information"})
        }
        const true_email =Check.checkEmail(email)
        const true_login = Check.checkLogin(login)
        const true_full = Check.checkFull_name(full_name)
        const hashed = await bcrypt.hash(password,10)
        const user = new User()
        const key = '95f64d70-ba88-407c-bde4-209a2fe935e4'
        let countrycode = await axios.get('https://extreme-ip-lookup.com/json/?key=awe7Q4z4MM6zY58o7et3')
        const holidayApi = new holidatapi.HolidayAPI({ key });
        const holidays = await holidayApi.holidays({
            country: countrycode.data.countryCode,
            year: '2021',
        })
        if (!true_email||!true_full||!true_login) {return res.status(404).json({message:"Fill required fields in right way"})}
        else {
            // console.log("L");
            user.getAllUsers().then(resp=> {
                if(resp[0].length===0) {
                    const hashedPassword = bcrypt.hash(password.toString(),10)
                    console.log(hashedPassword);
                    db.execute(`INSERT INTO users (login, password, email, full_name, role,photo) VALUES ('${login}','${hashed}','${email}','${full_name}','admin','admin.png');`).then(resp=> {
                        if(resp[0].affectedRows>0) {
                            const token = jwtGenerator(resp[0].insertId, login, email, 'admin');
                            return res.status(200).json({message:"You were succesfully registered",result:token})}
                        else {return res.status(404).json({message:"Registration failed"})}
                        
                    }).catch(err=>{return res.status(404).json({Eror:err.message})})
                }
                else {
                    db.execute(`INSERT INTO users (login, email, full_name, password, role, photo) VALUES ('${login}','${email}','${full_name}','${hashed}','user','user.png');` ).then(resp=> {
                            if(resp[0].affectedRows>0) {
                                const token = jwtGenerator(resp[0].insertId, login, email, 'user');
                                let id = resp[0].insertId
                                db.execute(`INSERT INTO calendar (title, author_id, description) VALUES ('${login} Calendar', '${resp[0].insertId}','${login} main calendar')`).then(resp => {
                                    if (resp[0].affectedRows > 0) {
                                        db.execute(`INSERT INTO calendar_users (calendar_id, user_id) VALUES ('${resp[0].insertId}', '${id}')`).then(resp => {
                                            if (resp[0].affectedRows > 0) {
                                                const token = jwtGenerator(resp[0].insertId, login, email, 'user');
                                                createNationalCalendar(holidays.holidays, login, id, countrycode.data.country)
                                                return res.status(200).json({message:'You were successfully registered', token:token})
                                            }
                                            else {return res.status(404).json({message:"Registration failed"})}
                                        })
                                    }
                                    else {return res.status(404).json({message:"Registration failed"})}
                                })
                                return res.status(200).json({message:"You were succesfully registered",result:token})}
                            else {return res.status(404).json({message:"Registration failed"})}
                        }).catch(err=>{return res.status(404).json({Eror:err.message})})
                }
            }).catch(err=>{return res.status(404).json({Eror:err.message})})
        }
    }
    async login(req,res) {
        
        const {email, login,password} = req.body
        if(!login || !password || !email) {return res.status(404).json({message:"Check all required fields"})}
        let user = new User()
        console.log(req.body);
        user.getUserbyLoginpass(login).then(resp=> {
            if(resp=='NOT FOUND') {return res.status(404).json({message:"No user with this login and mail"})}
            else {
                console.log("LOX");
                user = resp[0]
                console.log(resp[0].password);
                const compare = bcrypt.compareSync(password,user.password)
                console.log(compare);
                if (!compare) {return res.status(404).json({message:"Check your password"})}
                else {
                    const token = jwtGenerator(user.id,user.login,user.email,user.role)
                    console.log("login");
                    return res.status(200).json({message:"You were successfully loged in",token:token})
                }
            }
        }).catch(err=>{return res.status(404).json({Eror:err.message})})
        
    }
    async logout(req,res) {
        res.status(200).json({token:"Logout"})
    }
    async resetPassword (req, res) {
        console.log("LOX");
        const Check = new check()
        const {email} = req.body
        await db.execute(`SELECT * FROM users WHERE email="${email}";`).then(resp=> {
            if (resp[0].length==0) {return res.status(404).json({message:"This email isn`t used"})}
            else {
                const token = jwt.sign({
                    email:email
                },process.env.SECRETKEY,{expiresIn: '2h'})
                var transporter = message.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'eestfoo@gmail.com',
                        pass: 'dxwcxeojfjkoyjuz'
                    }
                });
                
                var mailOptions = {
                    from: 'eestfoo@gmail.com',
                    to: email,
                    subject: 'Reset Password',
                    text:`Click on this link: "http://localhost:3000/password-reset/${token}"`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                }); 
                res.status(200).json({message: "Email was sent"})
            }
        }).catch(err=>{return res.status(404).json({Eror:err.message})})
        
    }
    async confirm(req,res) {
        console.log("LOX");
        const {confirm_token} = req.params
        const {password} = req.body
        if (!password || !confirm_token) {res.status(404).json({message:"Paste token and new password!"})}
        const decode = jwt.verify(confirm_token,process.env.SECRETKEY)
        const email = decode.email
        const Check = new check()
        const true_email = Check.checkEmail(email)
        const hash = await bcrypt.hash(password,10)
        await db.execute(`UPDATE users SET password="${hash}" WHERE email="${true_email}"`).then(resp=> {
            if(resp[0].affectedRows>0) {return res.status(200).json({message:"Your password was changed"})}
            else {return res.status(404).json({message:"Something went wrong"})}
        }).catch(err=>{return res.status(404).json({Eror:err.message})})
        
    }
}

module.exports = Authentication