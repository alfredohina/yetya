const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  username: {type:Schema.Types.ObjectId, ref:'User'},
  id_user_cliente:  {type:Schema.Types.ObjectId, ref:'User'},
  id_event:  {type:Schema.Types.ObjectId, ref:'Event'},
  rating: Number,
  description: String,
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
