// Imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
// Creates a new Mongoose Schema with two properties
const BlogSchema = new Schema({
    title: { type: String, required: true}, // title property is a string and required
    article: { type: String, required: true},
    published: { type: Date, required: true}, 
    featured: { type: Boolean, required: true},
    // authorId: { type: Schema.Types.ObjectId, required: true}, 
    author: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Blog', BlogSchema);
