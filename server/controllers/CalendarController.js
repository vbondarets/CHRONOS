const Calendar = require('../models/CalendarModel')
const db = require('../models/db')
const jwt = require('jsonwebtoken')

class CalendarController {
    async getAllCalendars (req,res) {
        await Calendar.getAllCalendar().then(resp => {
            if (resp[0].length > 0) {
                return res.status(200).json({message:"Take all calendars", result: resp[0]})
            
            }
            else {
                return res.status(404).json({message:"There are no calendars"})
            }
        }).catch( err =>{return res.status(404).json({Eror:err.message})})
    }
    async createCalendar(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id
        const {title} = req.body
        let calendar_id
        if (!title || title.length>50) {
            return res.status(404).json({message: "Check your title"})
        }
        else {
            await db.execute(`SELECT * FROM calendar WHERE title='${title}'`).then (resp=> {
                if (resp[0].length > 0) {
                    return res.status(404).json({message:"There are also calendar with this title"})
                }
                else {
                    Calendar.createCalendar(title, decoded_id).then(resp => {
                        if (resp[0].affectedRows > 0) {
                            calendar_id = resp[0].insertId
                            db.execute(`INSERT INTO calendar_users (calendar_id, user_id) VALUES ('${calendar_id}','${decoded_id}')`).then(resp => {
                                if (resp[0].affectedRows> 0) {
                                    return res.status(200).json({message:"Calendar was created", result: resp[0]})
                                }
                                else {
                                    return res.status(404).json({message:"Something went wrong when create calendar"})
                                }
                            }).catch( err =>{return res.status(404).json({Eror:err.message})})
                        }
                        else {
                            return res.status(404).json({message:"Something went wrong when create calendar"})
                        }
                    }).catch( err =>{return res.status(404).json({Eror:err.message})})
                }
            }).catch( err =>{return res.status(404).json({Eror:err.message})})
        }
        
    }
}

module.exports = new CalendarController()