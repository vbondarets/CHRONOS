const ApiError = require("../error/ApiError");
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secureConfig = require('../secureConfig.json');
const uuid = require('uuid');
const path = require('path');

function jwtGenerator(id, login, email, role) {
    const token = jwt.sign(
        { id: id, login: login, email: email, role: role },
        secureConfig.SECRET_KEY,
        { expiresIn: '12h' }
    );
    return token;
}

class AuthController {
    async registration(req, res, next) {
        console.log("test")
        let { login, email, password, role, fullName } = req.body;
        // const { profileImg } = req.files;
        // let fileName = uuid.v4() + ".jpg";
        // profileImg.mv(path.resolve(__dirname, "..", "static", fileName));
        let fileName = 'default.png';
        if (!login || !email || !password || !fullName || !fileName) {
            return next(ApiError.conflict('Missing Data'));
        }
        if (!role) {
            role = "USER";
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(fullName, login, email, hashedPassword, role, fileName);
        user.create().then(resp => {
            if (resp != "Created") {
                const error = resp.indexOf('login') != -1 ? 'login' : 'email';
                const secError = resp.indexOf('fullName') != -1 ? 'Full Name' : 'Unknown field';
                
                if(secError === 'Full Name'){
                    return next(ApiError.conflict(secError + ' already exist'));
                }
                return next(ApiError.conflict(error + ' already exist'));
            }
            else if (resp == "Created") {
                const token = jwtGenerator(user.id, user.login, user.email, user.role);
                return res.json({ resp: "Created", token: token });
            }
            else {
                return next(ApiError.internal('Unknown err: ' + resp));
            }
        });
    }
    async login(req, res, next) {
        const { id, login, email, password } = req.body;
        let user = new User();
        user.find(id, login, email).then(resp => {
            if (resp == 'NOT FOUND') {
                return next(ApiError.badRequest(resp));
            }
            else if (resp) {
                user = resp[0];
                let comparePassword = bcrypt.compareSync(password, user.password)
                if (!comparePassword) {
                    return next(ApiError.conflict('Incorrect password'));
                }
                const token = jwtGenerator(user.id, user.login, user.email, user.role);
                return res.json({ token: token });
            }
            else {
                // console.log(resp);
                return next(ApiError.internal('Unknown error'));
            }
        });
    }
    async logout(req, res, next) {
        let token = "aboba";
        return res.json({ token: token });
    };
    async resetPassword(req, res, next) {
        let { id, login, email } = req.body;
        const user = new User();
        user.find(id, login, email).then(resp => {
            if (resp == 'NOT FOUND') {
                return next(ApiError.badRequest(resp));
            }
            else {
                console.log(resp)
                const token = jwt.sign(
                    { id: resp[0].id, login: resp[0].login, email: resp[0].email, role: resp[0].role},
                    secureConfig.SECRET_KEY_FOR_EMAIL,
                    { expiresIn: '12h' }
                );
                const link = req.protocol + '://' + req.get('host') + req.originalUrl + "/" + token;
                // console.log(link)
                //otravka email po sgenerirovannoy ssilke
            }
        });
    };
    async resetPasswordAuntification(req, res, next) {
        let { token } = req.params;
        let { password } = req.body;
        try {
            const decoded = jwt.verify(token, secureConfig.SECRET_KEY_FOR_EMAIL);
            const user = new User();
            let { id, login, email } = decoded;
            // console.log(decoded.id);
            user.find(id, login, email).then(resp => {
                if (resp == 'NOT FOUND') {
                    return next(ApiError.badRequest(resp));
                }
                else {
                    const hashedPassword = bcrypt.hash(password, 10);
                    user.resetPassword(id, hashedPassword).then(resp => {
                        if (resp == 'Reseted') {
                            return res.json({ res: "Reseted" });;
                        }
                        else {
                            console.log(resp);
                            return next(ApiError.internal('Unknown error'));
                        }
                    });
                }
            });
        }
        catch(err){
            return next(ApiError.forbiden('Acces deny'));
        }
        

    };

}

module.exports = new AuthController();