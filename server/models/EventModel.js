const e = require('express')
const db = require('./db')

class EventModel {
    getAllEvent (){
        return db.execute(`SELECT * FROM event`)
    }
    async checkEvent(event_id,author_id) {
        return await db.execute(`SELECT * FROM event 
                            LEFT JOIN users ON event.author_id = users.id
                            WHERE event.id=${event_id} AND event.author_id=${author_id}`).then(resp => {
            if (resp[0].length === 1) {
                return resp[0]
            }
            else {
                return "Something went wrong"
            }
        })
    }
    getEventByCalendar (calendar_id, user_id) {
        return db.execute(`SELECT * FROM event_users
                            LEFT JOIN event ON event_users.event_id = event.id
                            WHERE event_users.calendar_id=${calendar_id};`)
    }
    createEvent(title, author_id, description, type, color, calendar_id, time) {
        return db.execute(`INSERT INTO event (title, author_id,description, type, color, calendar_id, time) 
                            VALUES ('${title}','${author_id}','${description}','${type}','${color}','${calendar_id}', '${time}');`)
    }
    shareEventForuser(event_id, user_id, calendar_id) {
        return db.execute(`INSERT INTO event_users (event_id, user_id, calendar_id) VALUES ('${event_id}','${user_id}', '${calendar_id}')`)
    }
    
    updateEventTitle(title, event_id) {
        return db.execute(`UPDATE event SET title='${title}' WHERE id=${event_id}`)
    }
    updateEventDescription(description, event_id) {
        return db.execute(`UPDATE event SET description='${description}' WHERE id=${event_id}`)
    }
    updateEventColor(color, event_id) {
        return db.execute(`UPDATE event SET color='${color}' WHERE id=${event_id}`)
    }
    updateEventType(type, event_id) {
        return db.execute(`UPDATE event SET type='${type}' WHERE id=${event_id}`)
    }
}

module.exports = new EventModel()