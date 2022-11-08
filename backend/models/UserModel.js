const Model = require('./model');
const pool = require('./db');

class User extends Model {
    constructor(fullName, login, email, password, role, profileImg, rating, id) {
        super('user');
        this.fullName = fullName;
        this.login = login;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profileImg = profileImg;
        this.rating = rating;
        this.id = id;
    }
    getAll() {
        return pool.execute(`SELECT * FROM user`)
            .then(res => {
                if (res[0].length > 0) {
                    return res[0];
                } else {
                    return "NOT FOUND";
                }
            })
            .catch(err => {
                console.error(err);
                return err;
            });
    }
    getUserById(id) {
        return pool.execute(`SELECT * FROM user WHERE id=${id}`)
            .then(res => {
                if (res[0].length > 0) {
                    return res[0];
                }
                else {
                    return "NOT FOUND";
                }
            })
            .catch(err => {
                console.log(err);
                return "NOT FOUND";
            });
    }
    async create() {
        return pool.execute(`INSERT INTO user (fullName, login, email, password, role, profileImg) VALUES (?, ?, ?, ?, ?, ?)`, [this.fullName, this.login, this.email, this.password, this.role, this.profileImg])
            .then(res => {
                this.id = res[0].insertId;
                console.log("User Created");
                return "Created";
            })
            .catch(err => {
                console.log(err);
                return err.message;
            });
    }
    changeAvatar(id, profileImg) {
        return pool.execute(`UPDATE user SET profileImg=${profileImg} WHERE id=${id}`)
            .then(res => {
                this.id = res[0].insertId;
                console.log("Img changed");
                return "Changed";
            })
            .catch(err => {
                console.log(err);
                return err.message;
            });
    }
    updateRating(destinationId, rating) {
        return pool.execute(`UPDATE user SET rating=${rating} WHERE id=${destinationId}`)
            .then(res => {
                this.id = res[0].insertId;
                // console.log("Rating updated");
                return "Updated";
            })
            .catch(err => {
                console.log(err);
                return err.message;
            });
    }
    changeUserById(id) {
        // console.log(this.password);
        if (this.profileImg != "text") {
            const password = this.password;
            return pool.execute(`UPDATE user SET fullName='${this.fullName}',  login='${this.login}', email='${this.email}', password='${password}', role='${this.role}', rating=${this.rating} WHERE id=${id}`)
                .then(res => {
                    // this.id = res[0].insertId;
                    console.log("User changed");
                    if (res[0].changedRows === 0) {
                        return "ID not found";
                    }
                    return "Changed";
                })
                .catch(err => {
                    console.log(err);
                    return err.message;
                });
        }
        const password = this.password;
        return pool.execute(`UPDATE user SET fullName='${this.fullName}', login='${this.login}', email='${this.email}', password='${password}', role='${this.role}', rating=${this.rating} WHERE id=${id}`)
            .then(res => {
                // this.id = res[0].insertId;
                console.log("User changed");
                if (res[0].changedRows === 0) {
                    return "ID not found";
                }
                return "Changed";
            })
            .catch(err => {
                console.log(err);
                return err.message;
            });
    }
    deleteUserById(id) {
        return pool.execute(`DELETE FROM user WHERE id=${id}`)
            .then(res => {
                this.id = res[0].insertId;
                console.log("User deleted");
                return "Deleted";
            })
            .catch(err => {
                console.log(err);
                return err.message;
            });
    }
    async find(id, login, email) {
        if (id) {
            return pool.execute(`SELECT * FROM user WHERE id=${id}`)
                .then(res => {
                    if (res[0].length > 0) {
                        return res[0];
                    }
                    else {
                        return "NOT FOUND";
                    }
                })
                .catch(err => {
                    console.log(err);
                    return "NOT FOUND";
                });
        }
        else if (login) {
            console.log("tut");
            return pool.execute(`SELECT * FROM user WHERE login="${login}"`)
                .then(res => {
                    if (res[0].length > 0) {
                        return res[0];
                    }
                    else {
                        return "NOT FOUND";
                    }
                })
                .catch(err => {
                    console.log(err);
                    return "NOT FOUND";
                });
        }
        else if (email) {
            return pool.execute(`SELECT * FROM user WHERE email="${email}"`)
                .then(res => {
                    if (res[0].length > 0) {
                        return res[0];
                    }
                    else {
                        return "NOT FOUND";
                    }
                })
                .catch(err => {
                    console.log(err);
                    return "NOT FOUND";
                });
        }
    }
    resetPassword(id, password) {
        return pool.execute(`UPDATE user SET password='${password}' WHERE id=${id}`)
            .then(res => {
                this.id = res[0].insertId;
                console.log("Password reseted");
                return "Reseted";
            })
            .catch(err => {
                console.log(err);
                return err.message;
            });
    }
}
module.exports = User;