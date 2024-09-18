const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description: {
            type: String,
            required: true,
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    PostTime: { // New PostTime field
        type: Date,
        default: Date.now // Automatically set to current date and time when a new product is created
    },
    owner: {
            type:Schema.Types.ObjectId,
            ref: "User",
            default:null
    },buyer:{
        type:Schema.Types.ObjectId,
        ref: "User",
        default:null
    }
    

});

module.exports = mongoose.model('Product', productSchema);