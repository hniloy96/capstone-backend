const mongoose = require('mongoose')

//a schema for creating interaction data
const interactionSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
      },
    lastname: {
        type: String,
        required: true,
      },
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  post:{
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true
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

const Interaction = mongoose.model('Interaction', interactionSchema)
module.exports = Interaction;
