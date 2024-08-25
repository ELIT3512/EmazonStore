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
    seller: {
            type:Schema.Types.ObjectId,
            ref: "User",
            default:null
    },buyer:{
        type:Schema.Types.ObjectId,
        ref: "User",
        default:null
    }
    

});

module.exports = mongoose.model('Prodcut', productSchema);