const { end } = require('./db')
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

    getLatestEventForUser(user_id) {
        return db.execute(`SELECT * FROM event_users
                            LEFT JOIN event ON event_users.event_id = event.id
                            WHERE event_users.user_id = ${user_id} LIMIT 5`)
    }
    createEvent(title, author_id, description, type, color, calendar_id, start_at, end_at) {
        return db.execute(`INSERT INTO event (title, author_id,description, type, color, calendar_id, start_at, end_at) 
                            VALUES ('${title}','${author_id}','${description}','${type}','${color}','${calendar_id}', '${start_at}', '${end_at}');`)
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
    updateEventTime(start_at, end_at, event_id) {
        return db.execute(`UPDATE event SET start_At='${start_at.split('T')[0] + " " + start_at.split('T')[1].split(':')[0] + ":" + start_at.split('T')[1].split(':')[1]}', end_At='${end_at.split('T')[0] + " " + end_at.split('T')[1].split(':')[0] + ":" + (parseInt(end_at.split('T')[1].split(':')[1]) + 5)}' WHERE id=${event_id}`)
    }
    deleteUserFromEvent(user_id, event_id) {
        return db.execute(`DELETE FROM event_users WHERE user_id = ${user_id} AND event_id = ${event_id}` )
    }
}

module.exports = new EventModel()