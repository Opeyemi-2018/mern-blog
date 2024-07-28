import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    username: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
},  { timestamps: true }) 

export let User = mongoose.model('User', userSchema)