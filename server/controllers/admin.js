const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroSequelize = require('admin-bro-sequelizejs');
const {sequelize, Resources} = require('../models/sequalize')

AdminBro.registerAdapter(AdminBroSequelize)

const adminBro = new AdminBro ({
  Databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
        resource: Resources.user,
        options: {
            properties: {
                login: {
                  type: 'string',
                  isTitle: true  
                },
                password: {
                    type: 'string',
                    isVisible: {
                      list: true, edit: true, filter: false, show: true,
                    }
                },
                profile_picture: {
                    type: 'string',
                    isVisible: {
                      list: false, edit: true, filter: false, show: true,
                    }
                }
            }
        }
    },
    Resources.post,
    Resources.category,
    Resources.comment,
    Resources.avatar,
    Resources.likecomment,
    Resources.likepost,
    Resources.post_category
    
]
})


const adminRouter = AdminBroExpress.buildRouter (adminBro)

module.exports = { adminRouter, adminBro }