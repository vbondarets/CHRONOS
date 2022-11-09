const User = require('../models/userModel')
require("dotenv").config()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const db = require('../models/db')
const uuid = require('uuid');
const path = require('path');



function jwtGenerator(id, login, email, role){
    const token = jwt.sign(
        {id: id, login: login, email: email, role: role}, 
        process.env.SECRETKEY,
        {expiresIn: '12h'}
    );
    return token;
}
class UserController {
    async createUser(req,res) {
        console.log("LOX");
        let {login,email,full_name,password,role} = req.body
        let {photo} =req.files
        if (!photo) {photo = 'avatar.png'}
        if (!login||!email||!full_name||!password) {return res.status(404).json({message:"Fill all required fields"})}
        else {
            const hashedpassword = await bcrypt.hash(password,10)
            console.log(hashedpassword);
            console.log(email);
            if (!role) {role = 'user'}
            let avatar = uuid.v4()+ ".jpg";
            photo.mv(`./public/avatar/${avatar}`);
            const userCreated = new User(login,email,full_name,hashedpassword,avatar,role)
            userCreated.create().then(resp=> {
                if (resp[0].affectedRows>0) {
                
                    const token = jwtGenerator(userCreated.id, userCreated.login, userCreated.email, userCreated.role);
                    return res.status(200).json({message:"User created", result:resp[0],token:token})
                }
                else {return res.status(404).json({message:"User isnt created"})}
                
            }).catch(err=>{ return res.status(404).json({message:err.message})})
        }
        
    }
    async getUsers(req,res) {
        console.log("LOX");
        return await db.execute(`SELECT * from users`).then(response=> {
            if(response[0].length>0) {return res.status(200).json({message:"Take your users",result:response[0]})}
            else {return res.status(404).json({message:"U cant :("})}
        })
    }
    async getUserbyID(req,res) {
        const {user_id} = req.params
        console.log(user_id);
        const user = new User()
        user.getUserbyid(user_id).then(response=> {
            if(response!='NOT FOUND') {
                return res.status(200).json({
                    message:"Take your user",
                    result:response[0]
                })
            }
            else {
                return res.status(404).json({
                    message:"User not found"
                })
            }
        }).catch(err=>{return res.status(404).json({Eror:err.message})})
        
    }
    async updateAvatar(req,res) {
        console.log("LOX");
        let {id} = req.body
        const {photo} = req.files
        console.log(photo);
        if (!photo) {return res.status(404).json({message:"Upload new photo"})}
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id
        const decoded_role = decoded.role
        console.log(decoded_id)
        if (decoded_id == id || decoded_role=='admin') {
            const user = new User()
            let avatar = uuid.v4()+ ".jpg";
            photo.mv(`./public/avatar/${avatar}`);
            user.updateAvatar(avatar,id).then(resp=> {
                if (resp[0].affectedRows>0) {
                    db.execute(`INSERT INTO avatars (file,size,path,user_id) VALUES("${avatar}","${photo.size}","./public/avatar/${avatar}",'${id}')`).then(resp=> {
                        if (resp[0].affectedRows>0) {return res.status(200).json({message:"Ava was updated", result:resp[0]})}
                        else {return res.status(404).json({message:"Ava want update"})}
                    })
                    
                }
                else {return res.status(404).json({message:"Ava want update"})}
            }).catch(err=>{return res.status(404).json({Eror:err.message})})
        }
        else {
            return res.status(404).json({message:"It's not your account bruh"})
        }
        
       
    }
    async updateUserData(req,res) {
        console.log("LOX");
        let {login,email,full_name,password,avatar,role} = req.body
        let {user_id} = req.params
        // console.log(login);
        // console.log(email);
        // console.log(full_name);
        // console.log(password);
        // console.log(role)
        // console.log(avatar);
        // console.log(id);
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id
        const decoded_role = decoded.role
        if (decoded_id==user_id || decoded_role == 'admin') {
            if (login) {
                db.execute(`UPDATE users SET login='${login}' WHERE id=${user_id}`).then(resp=> {
                    if (resp[0].affectedRows>0) {return res.status(200).json({message:"Login was updated", result:resp[0]})}
                    else {return res.status(404).json({message:"Login wasnt update"})}
                }).catch(err=>{return res.status(404).json({Eror:err.message})})
            }
            if (email) {
                db.execute(`UPDATE users SET email='${email}' WHERE id=${user_id}`).then(resp=> {
                    if (resp[0].affectedRows>0) {return res.status(200).json({message:"Email was updated", result:resp[0]})}
                    else {return res.status(404).json({message:"email wasnt update"})}
                }).catch(err=>{return res.status(404).json({Eror:err.message})})
            }
            if (full_name) {
                db.execute(`UPDATE users SET full_name='${full_name}' WHERE id=${user_id}`).then(resp=> {
                    if (resp[0].affectedRows>0) {return res.status(200).json({message:"Full name was updated", result:resp[0]})}
                    else {return res.status(404).json({message:"Full name wasnt update"})}
                }).catch(err=>{return res.status(404).json({Eror:err.message})})
            }
            if (password) {
                const hashedPassword = await bcrypt.hash(password,10)
                db.execute(`UPDATE users SET password='${hashedPassword}' WHERE id=${user_id}`).then(resp=> {
                    if (resp[0].affectedRows>0) {return res.status(200).json({message:"Password was updated", result:resp[0]})}
                    else {return res.status(404).json({message:"Passwrod wasnt update"})}
                }).catch(err=>{return res.status(404).json({Eror:err.message})})
            }
            if (role) {
                
                db.execute(`UPDATE users SET role='${role}' WHERE id=${user_id}`).then(resp=> {
                    if (resp[0].affectedRows>0) {return res.status(200).json({message:"Role was updated", result:resp[0]})}
                    else {return res.status(404).json({message:"Role wasnt update"})}
                }).catch(err=>{return res.status(404).json({Eror:err.message})})
            }
            if (avatar) {
                db.execute(`UPDATE users SET photo='${avatar}' WHERE id=${user_id}`).then(resp=> {
                    if (resp[0].affectedRows>0) {return res.status(200).json({message:"Role was updated", result:resp[0]})}
                    else {return res.status(404).json({message:"Photo wasnt update"})}
                }).catch(err=>{return res.status(404).json({Eror:err.message})})
            }
            
        }
        else {
            return res.status(404).json({message:"It's not your account bruh or you arent admin"})
        }
        
    }

    async getRating (req, res) {
        const {user_id} = req.params
        await db.execute(`SELECT * from likeposts where direction_id=${user_id}`).then(resp=> {
            if (resp[0].length > 0) {
                return res.status(200).json({result:resp[0]})
            }
            else {
                return res.status(404).json({message:"Something went wrong bro"})
            }
        })
    }

    async deleteUserr(req,res) {
        console.log("LOX");
        const {user_id} = req.params
        console.log(user_id);
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI')
        const decoded_id = decoded.id
        const decoded_role = decoded.role
        if (decoded_id==user_id || decoded_role == 'admin') {
            const user = new User()
            user.deleteUser(user_id).then(response=> {
                if(response[0].affectedRows>0) {return res.status(200).json({message:"User was deleted", result:response[0]})}
                else {return res.status(404).json({message:"Something went wrong"})}
            }).catch(err=>{ return res.status(404).json({message:err.message})})
        }
        else {return res.status(404).json({message:"It's not your account bruh or you arent admin"})}
    }
}
module.exports = new UserController()