const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:{type:String},
    author:{type:String},
    subject:{type:String}, 
    article:{type:String}
});

module.exports = mongoose.model('Blog', BlogSchema);