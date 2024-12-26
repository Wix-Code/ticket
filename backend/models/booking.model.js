import mongoose from 'mongoose';

const ticketOwnerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  ticketType: { type: String, required: true }, 
  //price: { type: Number, required: true },      // Price of the ticket for this owner
});

const bookingSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event',  // This references the User model
    required: true
  },
  purchaser: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
  },
  ticketOwner: [ticketOwnerSchema]
}, {
  timestamps: true // created at, updated at
})

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;