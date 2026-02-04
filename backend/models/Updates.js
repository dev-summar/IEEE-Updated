const mongoose = require("mongoose")
const updateSchema = new mongoose.Schema({
    title: {type: String},
    image: {type:String, required: true},
})
module.exports = mongoose.model('Updates', updateSchema);