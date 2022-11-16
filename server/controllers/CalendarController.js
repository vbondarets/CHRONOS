const Calendar = require('../models/CalendarModel')
const db = require('../models/db')
const jwt = require('jsonwebtoken')
const message = require("nodemailer");
const e = require('express')

class CalendarController {
    async getAllCalendars(req, res) {
        await Calendar.getAllCalendar().then(resp => {
            if (resp[0].length > 0) {
                return res.status(200).json({ message: "Take all calendars", result: resp[0] })

            }
            else {
                return res.status(404).json({ message: "There are no calendars" })
            }
        }).catch(err => { return res.status(404).json({ Eror: err.message }) })
    }

    async createCalendar(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id
        const { title } = req.body
        let calendar_id;
        if (!title || title.length > 50) {
            return res.status(404).json({ message: "Check your title" })
        }
        else {
            await db.execute(`SELECT * FROM calendar WHERE title='${title}'`).then(resp => {
                if (resp[0].length > 0) {
                    return res.status(404).json({ message: "There are also calendar with this title" })
                }
                else {
                    // console.log(title, decoded_id)
                    Calendar.createCalendar(title, decoded_id).then(resp => {
                        if (resp[0].affectedRows > 0) {
                            calendar_id = resp[0].insertId
                            db.execute(`INSERT INTO calendar_users (calendar_id, user_id) VALUES ('${calendar_id}','${decoded_id}')`).then(resp => {
                                if (resp[0].affectedRows > 0) {
                                    return res.status(200).json({ message: "Calendar was created", result: resp[0] })
                                }
                                else {
                                    return res.status(404).json({ message: "Something went wrong when create calendar" })
                                }
                            }).catch(err => { return res.status(404).json({ Eror: err.message }) })
                        }
                        else {
                            return res.status(404).json({ message: "Something went wrong when create calendar" })
                        }
                    }).catch(err => { return res.status(404).json({ Error: err.message }) })
                }
            }).catch(err => {
                console.log(err)
                return res.status(404).json({ Error: err.message })
            })
        }
    }
    async shareCalendar(req, res) {
        const { calendar_id } = req.params
        const { user_id } = req.body
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        console.log(calendar_id)
        const decoded_id = decoded.id
        await db.execute(`SELECT * FROM calendar WHERE id = ${calendar_id} AND author_id=${decoded_id}`).then(resp => {
            if (resp[0].length > 0) {
                db.execute(`SELECT * FROM calendar_users WHERE calendar_id = ${calendar_id} AND user_id=${user_id}`).then(resp => {
                    if (resp[0].length > 0) {
                        return res.status(400).json({ message: "You already share calendar with this user" })
                    }
                    else {
                        // const token = jwtGenerator(user_id, calendar_id)
                        const token = jwt.sign(
                            { user_id: user_id, calendar_id: calendar_id },
                            'KHPI',
                            { expiresIn: '12h' }
                        );
                        db.execute(`SELECT email FROM users WHERE id=${user_id}`).then(result => {
                            const email = result[0][0].email;
                            
                            var transporter = message.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'eestfoo@gmail.com',
                                    pass: 'dxwcxeojfjkoyjuz'
                                }
                            });
                            
                            var mailOptions = {
                                from: 'chronos.ucode',
                                to: email,
                                subject: 'Calendar sharing',
                                text: `Somebody share calendar for u\nClick on this link: "http://localhost:3000/share/${token}"`
                            };
                            
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                    return res.status(200).json({message:"Confiramtion was sent"})
                                }
                            }); 
                            res.status(200).json({ message: "Email was sent", share_token: token })

                        })
                    }
                }).catch(err => { return res.status(404).json({ Eror: err.message }) })
            }
            else {
                return res.status(404).json({ message: "Not your calendar" })
            }
        })
    }
    async shareCalendarToUser(req, res) {
        const { token } = req.params;
        let decoded;
        try {
            decoded = jwt.verify(token, 'KHPI');
        }
        catch (err) {
            return res.status(409).json({ Error: "Token forbiden\n" + err })
        }
        if (decoded) {
            db.execute(`SELECT * FROM calendar_users WHERE calendar_id = ${decoded.calendar_id} AND user_id=${decoded.user_id}`).then(result => {
                if (result[0].length > 0) {
                    return res.status(409).json({ message: "You allready got this calendar" })
                }
                else {
                    Calendar.shareCalendar(decoded.calendar_id, decoded.user_id).then(resp => {
                        if (resp[0].affectedRows > 0) {
                            return res.status(200).json({ message: "You share your calendar", result: resp[0] })
                        }
                        else {
                            return res.status(404).json({ message: "Something went wrong when share calendar" })
                        }
                    }).catch(err => { return res.status(404).json({ Eror: err.message }) })
                }

            })
        }
        else {
            return res.status(500).json({ Error: "Unknown error \n" + err.message })
        }

    }

    async getCalendarById(req, res) {
        const { user_id } = req.params

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id

        if (user_id != decoded_id) {
            return res.status(404).json({message:'It`s not your calendars'})
        }
        if (!user_id) {
            return res.status(404).json({ message: "Something went wrong" })
        }
        else {
            await Calendar.getCalendar(user_id).then(resp => {
                if (resp[0].length > 0) {
                    return res.status(200).json({ message: "Take all calendars", result: resp[0] })
    
                }
                else {
                    return res.status(404).json({ message: "There are no calendars" })
                }
            })
        }
    }
    async deleteUserFromCalendar(req, res) {
        const { user_id } = req.params
        const { calendar_id } = req.body
        if (!user_id) {
            return res.status(404).json({ message: "Something went wrong" })
        }
        await Calendar.getCalendarAuthor(calendar_id).then(resp => {
            if (resp[0].length > 0) {
                const author_id = resp[0];
                if (user_id !== author_id) {
                    Calendar.deleteUserFromCalendar(user_id).then(result => {
                        if (result[0].length > 0) {
                            return res.status(200).json({ message: "User deleted", result: result[0] })

                        }
                        else {
                            return res.status(500).json({ message: "Something went wrong" })
                        }
                    })
                }
                else {
                    return res.status(403).json({ message: "Can't delete author from calendar" })
                }
            }
            else {
                return res.status(404).json({ message: "Can't found author" })
            }
        })
    }
}

module.exports = new CalendarController() 