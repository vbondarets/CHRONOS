const db = require('./db')

class EventModel {
    getAllEvent (){
        return db.execute(`SELECT * FROM event`)
    }
    getEventByCalendar (calendar_id) {
        return db.execute(`SELECT * FROM event WHERE calendar_id=${calendar_id};`)
    }
    createEvent(title, description, type, color, calendar_id) {
        return db.execute(`INSERT INTO event (title, description, type, color, calendar_id) 
                            VALUES ('${title}','${description}','${type}','${color}','${calendar_id}');`)
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