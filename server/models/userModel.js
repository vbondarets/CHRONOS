const db = require('./db')

class User {
    constructor(login,email,full_name,password,avatar,role) {
        this.login = login
        this.email = email
        this.full_name = full_name
        this.password = password
        this.avatar = avatar
        this.role = role
    }
    create() {
        return db.execute(`INSERT INTO users (login, email, password,full_name,photo,role) VALUES ('${this.login}','${this.email}','${this.password}','${this.full_name}','${this.avatar}','${this.role}');`)
    }
    getUserbyLoginMail(login,email) {
        return db.execute(`SELECT * FROM users WHERE login="${login}" AND email="${email};"`)
    }
    getUserbyid(id) {
        return db.execute(`SELECT * FROM users WHERE id=${id};`)
    }
    getUserbyLogin(login) {
        return db.execute(`SELECT * FROM users WHERE login="${login}";`)
    }
    getUserbyLoginpass(login) {
        return db.execute(`SELECT * FROM users WHERE login="${login}";`).then(resp=>{
            if(resp[0].length > 0){
                return resp[0];
            }
            else{
                return "NOT FOUND";
            }
            })
            .catch(err =>{
                console.log(err);
                return "NOT FOUND";
            
            })
    }
    getUserbyMail(email) {
        return db.execute(`SELECT * FROM users WHERE login="${email}";`)
    }
    getAllUsers() {
        return db.execute('SELECT * FROM users')
    }
    deleteUser(id) {
        return db.execute(`DELETE FROM users WHERE id=${id};`)
    }
    updatebyID(id) {
        return db.execute(`UPDATE users SET login='${this.login}', email='${this.email}', password='${this.password}', full_name='${this.full_name}', photo='${this.avatar}', role='${this.role}' WHERE id='${id}'`)
    }
    updateAvatar(photo,id) {
        return db.execute(`UPDATE users set photo="${photo}" WHERE id=${id};`)
    }
    
}

module.exports = User