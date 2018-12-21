const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  id_user_anunciante: String,
  location: { type: { type: String }, coordinates: [Number] },
  hasLocation:Boolean,
  rating: Number,
  description: String,
  capacity:Number,
  reserved: [{ id_cliente: String }],
  date: Date,
  price: Number,
  imgPath: {type: String, default: 'https://res.cloudinary.com/drlexgkiu/image/upload/v1544979115/defaultevent.png'},
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
