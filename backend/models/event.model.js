import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Type Vip, VVIP etc
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, default: 0 },
  ticketsSold: { type: Number, default: 0, min: 0 },
  quantitySelected: { type: Number, default: 0 }
});


const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // This references the User model
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  cat: { type: String, required: true },
  venue: { type: String, required: true },
  state: { type: String, required: true },
  startdate: { type: Date, require: true },
  enddate: { type: Date, required: false },
  starttime: { type: String, required: true },
  endtime: { type: String, required: false },
  image: { type: String, required: true },
  ticket: [ticketSchema],
  showRemainingTickets: { type: Boolean, default: false },
  showOrganizerDetails: { type: Boolean, default: false }
 }, {
  timestamps: true // created at, updated at
})

const Event = mongoose.model('Event', eventSchema);

export default Event;