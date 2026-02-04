const mongoose = require('mongoose');
const BannerSchema = new mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    alt:{
        type:String
    },
    description:{
        type:String
    }
},{timestamps:true});
const Banners = mongoose.model("Banners",BannerSchema);
module.exports = Banners