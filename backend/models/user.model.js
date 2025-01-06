import mongoose from 'mongoose';


const userTickets = new mongoose.Schema({
  userTicket: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Event',  // This references the User model
      
    },
  name: { type: String, required: true },// Type Vip, VVIP etc
    //quantity: { type: Number, required: true, min: 0 },
  price: { type: Number  },
  //ticketsSold: { type: Number, default: 0, min: 0 },
  quantitySelected: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  question: { type: String, required: true },
  cart: [userTickets],
  email: { type: String, required: true, unique: true },
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;