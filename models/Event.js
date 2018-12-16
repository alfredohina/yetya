const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  id_user_anunciante: String,
  // location: { type: { type: String }, coordinates: [Number], default: ['2,5'] },
  hasLocation:Boolean,
  rating: Number,
  description: String,
  capacity:Number,
  reserved: [{ id_cliente: String, isCoomed: false}],
  date: Date,
  price: Number,
  imgPath: String,
  eventImage: {type: String, default: 'https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg'},
  category: {type: String, enum:["street", "cultural", "gastronomy", "other"] },
   
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});




eventSchema.index({ location: '2dsphere' });


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
