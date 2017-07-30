const Sequelize = require('sequelize');
const config = require('../config');

const db = new Sequelize ({
    host: config.DB.HOST,
    username: config.DB.USERNAME,
    database: config.DB.NAME,
    password: config.DB.PASSWORD,
    dialect: 'mysql',
    charset: 'utf8'
});

const Posts = db.define('posts', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postId: Sequelize.DataTypes.STRING,
    content: Sequelize.DataTypes.STRING(10005),
    created: Sequelize.DataTypes.DATEONLY,
    likes: Sequelize.DataTypes.INTEGER,
    shares: Sequelize.DataTypes.INTEGER,
    story: Sequelize.DataTypes.STRING
});

function storeAnsFetchPosts(posts) {
    let arr = [];
    for(let post of posts){
        arr.push(addPost(post));
    }
    return Promise.all(arr).then(function () {
        return Posts.findAll({
            order: [
                ['likes', 'DESC'],
                ['shares', 'DESC']
            ]
        });
    });
}

function addPost(post) {
    return Posts.findOrCreate({
        where: {
            postId: post.id
        },
        defaults: {
            postId: post.id,
                content: (post.message.length >= 10000) ? post.message.substring(0,10000) : post.message,
            likes: ((post.likes) ? post.likes.data.length : 0),
            shares: ((post.shares) ? post.shares.count : 0),
            created: post.created_time,
            story: post.story || 'CSI NSIT'
        }
    });
}

function removeAllPosts() {
    return Posts.destroy({
        where: {}
    });
}

db.sync({force:true}).then( () => {
    console.log('Database Configured');
});

module.exports = {
    storeAnsFetchPosts, removeAllPosts
};