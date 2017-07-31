const Sequelize = require('sequelize');
const config = require('../config');

// defining the mysql database
const db = new Sequelize ({
    host: config.DB.HOST,
    username: config.DB.USERNAME,
    database: config.DB.NAME,
    password: config.DB.PASSWORD,
    dialect: 'mysql',
    charset: 'utf8'
});

// creating Posts model for storing all posts' info
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

// it saves the posts fetched from the FB Api into the database
// and returns all posts from the database in order of their number of likes and shares
function storeAnsFetchPosts(posts) {
    let arr = [];
    // saving each post one by one in databse
    for(let post of posts){
        arr.push(addPost(post));
    }
    return Promise.all(arr).then(function () {
        // returns the posts in order of likes.chares
        return Posts.findAll({
            order: [
                ['likes', 'DESC'],
                ['shares', 'DESC']
            ]
        });
    });
}

// function to save a single post in the database
function addPost(post) {
    // if particular post does not exist in db, then it creates a new one
    // otherwise returns the existing posts
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

// Configures the database
db.sync({force:true}).then( () => {
    console.log('Database Configured');
});

module.exports = {
    storeAnsFetchPosts
};