const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    likes: {
        type: Map,
        of: Boolean,
      },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    })

const Post = mongoose.model('Post', postSchema)
module.exports = Post;
