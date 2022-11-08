require('dotenv').config()
const {Sequelize, DataTypes} =require('sequelize')

const sequelize = new Sequelize(
    process.env.name || 'usof',
    process.env.user || 'idashchenk',
    process.env.password || 'securepass',
    {
        host: process.env.host || 'localhost',
        dialect:'mysql'
    }
)

sequelize.authenticate().then(()=> {
    console.log('Connection has been established succesfully')
}).catch (err=> {console.error(err.message)})

const Resources = {}

Resources.user = sequelize.define('user', {
    id : {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    login: {
        type:DataTypes.STRING(15),
        allowNull:false,
        unique:true
    },
    email: {
        type: DataTypes.STRING(20),
        allowNull:false,
        unique:true
    },
    full_name: {
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true
    },
    password: {
        type: DataTypes.STRING(75),
        unique:true,
        allowNull:false
    },
    photo: {
        type: DataTypes.STRING(256),
        allowNull:false,
        defaultValue:"public/avatar/avatar.png"
    },
    role: {
        type:DataTypes.ENUM('admin','user'),
        allowNull:false,
        defaultValue:'user'
    }
},
{
    timestamps:false
})

Resources.category = sequelize.define('category', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title: {
        type: DataTypes.STRING(256),
        allowNull:false,
        unique:true
    }
}, {timestamps:false})

Resources.post = sequelize.define('post', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:Resources.user,
            key:'id',
        }
    },
    title: {
        type:DataTypes.STRING(100),
        allowNull:false
    },
    info: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    time: {
        type: DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
},{timestamps:false})


Resources.comment = sequelize.define('comment', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:Resources.user,
            key:'id',
        }
    },
    content: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    post_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Resources.post,
            key:'id',
        }
    },
    time: {
        type: DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
}, {timestamps:false})


Resources.avatar = sequelize.define('avatar', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:Resources.user,
            key:'id',
        }
    },
    file: {
        type: DataTypes.STRING(256),
        allowNull:false,
        defaultValue:'avatar.png'
    },
    size: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    path: {
        type:DataTypes.STRING(256),
        allowNull:false,
        defaultValue:"public/avatar/avatar.png"
    }
}, {timestamps:false})


Resources.post_category = sequelize.define('post_category', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    post_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Resources.post,
            key:'id',
        }
    },
    category_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:Resources.category,
            key:"id",
        }
    }
}, {timestamps:false})


Resources.likepost = sequelize.define('likepost', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    post_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Resources.post,
            key:'id',
        }
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:Resources.user,
            key:'id',
        }
    },
    time: {
        type: DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
}, {timestamps:false})


Resources.likecomment = sequelize.define('likecomment', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:Resources.user,
            key:'id',
        }
    },
    comment_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:Resources.comment,
            key:'id',
        }
    },
    time: {
        type: DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
}, {timestamps:false})


sequelize.sync().then(() => {
    console.log('Book table created successfully!')
}).catch((error) => {
    console.error('Unable to create table : ', error)
})


module.exports = { sequelize, Resources}