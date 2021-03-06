const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  mail: {type: String, unique:true},
  puntuation: Number,
  role: {type: String, enum: ["anunciante", "cliente"]},
  description: String,
  status: {type:String, enum:["Pending Confirmation", "Active"], default:"Pending Confirmation"},
  confirmationCode:String,
  imgPath: {type: String, default: 'https://res.cloudinary.com/drlexgkiu/image/upload/v1544976860/avatar_2x.png'}, 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
