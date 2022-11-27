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

    createCalendar(title, description, user_id, color) {
        return db.execute(`INSERT INTO calendar (title, author_id, description, color) VALUES ('${title}', '${user_id}', '${description}', '${color}')`)
    }
    shareCalendar(calendar_id, user_id) {
        return db.execute(`INSERT INTO calendar_users (calendar_id, user_id) VALUES ('${calendar_id}','${user_id}')`)
    } 
    updateCalendar(title, id) {
        return db.execute(`UPDATE calendar SET title='${title}' WHERE id=${id}`)
    }
    getCalendarAuthor(id) {
        return db.execute(`SELECT author_id FROM calendar where id=${id}`)
    }
    deleteUserFromCalendar(id ,calendar_id){
        return db.execute(`DELETE FROM calendar_users where user_id=${id} AND calendar_id = ${calendar_id}`)
    }
}

module.exports = new Calendar()