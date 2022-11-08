const db = require('./db')

class Calendar {
    getCalendar(user_id) {
        return db.execute(`SELECT * FROM calendar_users 
                            LEFT JOIN calendar on calendar_users.calendar_id = calendar.id 
                            WHERE calendar_users.user_id=${user_id};`)
    }
    getAllCalendar() {
        return db.execute(`SELECT * FROM calendar;`)
    }

    createCalendar(title, user_id) {
        return db.execute(`INSERT INTO calendar (title, user_id) VALUES ('${title}', '${user_id}')`)
    }
    shareCalendar(calendar_id, user_id) {
        return db.execute(`INSERT INTO calendar_users (calendar_id, user_id) VALUES ('${calendar_id}','${user_id}')`)
    } 
    updateCalendar(title, id) {
        return db.execute(`UPDATE calendar SET title='${title}' WHERE id=${id}`)
    }
}

module.exports = new Calendar()