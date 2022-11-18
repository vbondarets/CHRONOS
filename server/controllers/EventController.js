const Event = require('../models/EventModel')
const jwt = require('jsonwebtoken')
const db = require('../models/db')
const message = require("nodemailer")
const userModel = require('../models/userModel')
const e = require('express')
require('dotenv').config()

function jwtGenerator(event_id, direction_id, author_id){
    const token = jwt.sign(
        {event_id: event_id, direction_id: direction_id, author_id: author_id}, 
        process.env.SECRETKEY,
        {expiresIn: '12h'}
    );
    return token;
}

class Event_Controller {
    async getEventsByCalendarId(req, res) {
        const {calendar_id} = req.params
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id
        await db.execute(`SELECT * FROM calendar_users WHERE user_id=${decoded_id} AND calendar_id=${calendar_id}`).then( resp => {
            if (resp[0].length > 0) {
                Event.getEventByCalendar(calendar_id,decoded_id).then( resp => {
                    if (resp[0].length > 0) {
                        return res.status(200).json({message:"Take all events",result:resp[0]})
                    }   
                    else {
                        return res.status(404).json({message:"You havent events on this calendar :("})
                    }
                })
            }
            else {
                return res.status(404).json({message:"You haven't rights for this calendar"})
            }
        })
    }
    
    async createEvent(req, res) {
        const {title, description, type, color,time} = req.body
        const {calendar_id} = req.params
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id
        if (!title || !description || !type || !color || !time) {
            return res.status(404).json({message: "Fill all required fields"})
        }
        await db.execute(`SELECT * FROM calendar_users WHERE calendar_id = ${calendar_id} AND user_id = ${decoded_id}`).then( resp => {
            if (resp[0].length === 0) {
                return res.status(404).json({message:"It`s not your calendar"})
            }
            else {
                db.execute(`SELECT * FROM event WHERE title = "${title}"`).then( resp => {
                    if (resp[0].length > 0) {
                        return res.status(404).json({message: "Event with this title already created"})
                    }
                    else {
                        Event.createEvent(title, decoded_id, description, type, color, calendar_id,time).then( resp => {
                            if (resp[0].affectedRows > 0) {
                                db.execute(`INSERT INTO event_users (calendar_id, user_id, event_id) 
                                            VALUES('${calendar_id}', '${decoded_id}', '${resp[0].insertId}')`).then(resp => {
                                                if (resp[0].affectedRows > 0) {
                                                    return res.status(200).json({message:"Event was created", result:resp[0]})
                                                }
                                                else {
                                                    return res.status(404).json({message:"Something went wrong"})
                                                }
                                            })
                            }
                            else {
                                return res.status(404).json({message:"Something went wrong"})
                            }
                        })
                    }
                })
            }
        })
    }

    async getNewestEventsByUser_id (req, res) {
        const {user_id} = req.params
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id
        console.log(decoded_id);
        if (decoded_id == user_id) {
            await Event.getLatestEventForUser(user_id).then(resp => {
                if (resp[0].length > 0) {
                    return res.status(200).json({message:"Take your events", result:resp[0]})
                }
                else {
                    return res.status(200).json({message:"You havent events yet"})
                }
            })
        }
        else {
            return res.status(404).json({message:"Something went wrong"})
        }
    }

    async shareEvent(req,res) {
        const {event_id} = req.params
        const {user_id} = req.body
        

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id

        const User = new userModel()
        
        
        await Event.checkEvent(event_id, decoded_id).then( resp => {
            if (resp === "Something went wrong") {
                return res.status(404).json({message:"It's not your event"})
            }
            else {
                User.getUserbyid(user_id).then(resp => {
                    if (resp == 'NOT FOUND') {
                        return res.status(404).json({message:"Something went wrong"})
                    }
                    else {
                        const token = jwtGenerator(event_id,user_id,decoded_id)
                        var transporter = message.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'eestfoo@gmail.com',
                                pass: 'dxwcxeojfjkoyjuz'
                            }
                        });
                        
                        var mailOptions = {
                            from: 'eestfoo@gmail.com',
                            to: resp[0].email,
                            subject: 'Share event',
                            text:`Dear ${resp[0].full_name}, 
                                User, ${decoded.login} wanna share with you event.
                                If u wanna to take this event, please click on this link "http://localhost:3000/event/share/confirm/${token}"`
                        };
                        
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                            console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                                return res.status(200).json({message:"Confiramtion was sent"})
                            }
                        }); 
                    }
                })
                
            }
        })
    }
    async submitSharing(req,res) {
        const {token} = req.params
        const {calendar_id} = req.body
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')

        const tokenn = req.headers.authorization.split(' ')[1];
        const decodedd = jwt.verify(tokenn, process.env.SECRETKEY || 'KHPI')
        
        console.log(decodedd);
        console.log(decoded);
        if (decoded.direction_id.toString() == decodedd.id.toString()) {
            await Event.checkEvent(decoded.event_id, decoded.author_id).then( resp => {
                if (resp === "Something went wrong") {
                    return res.status(404).json({message:"It's not your event"})
                }
                else {
                    Event.shareEventForuser(decoded.event_id, decoded.direction_id, calendar_id).then( resp => {
                        if (resp[0].affectedRows > 0) {
                            return res.status(200).json({message:"Event was shared", result:resp[0]})
                        }
                        else {
                            return res.status(404).json({message:"Something went wrong"})
                        }
                    })
                }
            })
        }
        else {
            return res.status(404).json({message:"Its not for you"})
        }
    }

    async UpdateEvent(req,res) {
        const {title, description, color, type} = req.body
        const {event_id, calendar_id} = req.params
        
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id

        await db.execute(`SELECT * from event WHERE author_id = ${decoded_id} AND id=${event_id} AND calendar_id = ${calendar_id}`).then(resp => {
            if (resp[0].length === 1) {
                if (title) {
                    Event.updateEventTitle(title, event_id).then(resp => {
                        if (resp[0].affectedRows > 0) {
                            return res.status(200).json({message:"Title was updated", result:resp[0]})
                        }
                        else {
                            return res.status(404).json({message:"Something went wrong"})
                        }
                    })
                }
                if (description) {
                    Event.updateEventDescription(description,event_id).then(resp => {
                        if (resp[0].affectedRows > 0) {
                            return res.status(200).json({message:"Description was updated", result:resp[0]})
                        }
                        else {
                            return res.status(404).json({message:"Something went wrong"})
                        }
                    })
                }
                if (type) {
                    Event.updateEventType(type, event_id).then(resp => {
                        if (resp[0].affectedRows > 0) {
                            return res.status(200).json({message:"Type was updated", result:resp[0]})
                        }
                        else {
                            return res.status(404).json({message:"Something went wrong"})
                        }
                    })
                }
                if (color) {
                    Event.updateEventColor(color,event_id).then(resp => {
                        if (resp[0].affectedRows > 0) {
                            return res.status(200).json({message:"Color was updated", result:resp[0]})
                        }
                        else {
                            return res.status(404).json({message:"Something went wrong"})
                        }
                    })
                }
            }
            else {
                return res.status(404).json({message:"Its not your event"})
            }
        })
    }
    
    async DeleteEvent (req,res) {
        const {event_id, calendar_id} = req.params
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id

        await db.execute(`SELECT * from event WHERE author_id = ${decoded_id} AND id=${event_id} AND calendar_id = ${calendar_id}`).then(resp => {
            if (resp[0].length === 1) {
                db.execute(`DELETE FROM event_users WHERE event_id = ${event_id}`).then(resp => {
                    if (resp[0].affectedRows > 0) {
                        db.execute(`DELETE FROM event WHERE author_id = ${decoded_id} AND id=${event_id} AND calendar_id = ${calendar_id} `).then(resp => {
                            if (resp[0].affectedRows > 0) {
                                return res.status(200).json({message:"Event was deleted"})
                            }
                            else {
                                return res.status(404).json({message:"Something went wrong"})
                            }
                        })
                    }
                    else {
                        db.execute(`DELETE FROM event WHERE author_id = ${decoded_id} AND id=${event_id} AND calendar_id = ${calendar_id} `).then(resp => {
                            if (resp[0].affectedRows > 0) {
                                return res.status(200).json({message:"Event was deleted"})
                            }
                            else {
                                return res.status(404).json({message:"Something went wrong"})
                            }
                        })
                    }
                })
            }
            else {
                return res.status(404).json({message:"Its not your event"})
            }
        })
    }

    async DeleteUserFromSharingEvent(req, res) {
        const {user_id, event_id} = req.params

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id

        if(decoded_id == user_id) {
            return res.status(404).json({message:"You cant delete access from yours event"})
        }
        else {
            await db.execute(`SELECT * FROM event WHERE id = ${event_id} AND author_id = ${decoded_id}`).then( resp => {
                if (resp[0].length > 0 ) {
                    db.execute(`SELECT * FROM event_users WHERE user_id = ${user_id} AND event_id = ${event_id}`).then( resp => {
                        if (resp[0].length > 0) {
                            Event.deleteUserFromEvent(user_id, event_id).then( resp => {
                                if (resp[0].affectedRows > 0) {
                                    return res.status(200).json({message:"You delete user", result: resp[0]})
                                }
                                else {
                                    return res.status(404).json({message:"Something went wrong"})
                                }
                            })
                        }
                        else {
                            return res.status(404).json({message:"You dont share this event with this user"})
                        }
                    })
                }
                else {
                    return res.status(404).json({message:"Its not your event"})
                }
            })
        }
    }
}

module.exports = new Event_Controller()