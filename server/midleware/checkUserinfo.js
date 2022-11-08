class checkingInfo {
    checkLogin(login) {
        if(login.length<4 || login.length > 20) {return false}
        return login
    }
    checkPassword(password) {
        if (password.length<8 || password.length>20) {return false}
        if (!/^[a-zA-Z0-9]+$/.test(password)) {return false}
        if (!/[0-9]/.test(password)) {return false}
        return password
    }
    checkFull_name(full_name) {
        const arr = full_name.split(' ')
        if (arr.length != 2) {return false}
        
        return full_name
    }
    checkRole(role) {
        if(role === 'user' || role==='admin') {return role}
        return false
    }
    checkEmail(email) {
        if (email.includes('.com') || email.includes('.ua') || !email.includes(' ')) {return email}
        return false
    }
}

module.exports = checkingInfo