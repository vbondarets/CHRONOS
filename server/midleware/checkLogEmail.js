const db = require('../models/db')

class Check {
    async checklogin(login) {
        const result = await db.execute(`SELECT * FROM user WHERE login="${login}"`)
        if (result.length === 0) {return login}
        return false
    }
    async checkEmail(email) {
        const result = await db.execute(`SELECT * FROM user WHERE email="${email}"`)
        if (result.length === 0) {return email}
        return false 
    }
}

module.exports = Check