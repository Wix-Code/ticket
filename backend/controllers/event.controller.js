import Event from "../models/event.model.js";
import User from "../models/user.model.js";



export const createEvent = async (req,res) => {
    
  try {

    //CREATE AN EVENT

    const event = new Event(req.body);
    await event.save();
    return res.status(200).send({ success: true, message: "event created", data: event});

  } catch (error) {
    console.log(error)
    return res.status(400).send({ success: false, message: "event not created", data: error})
  }
}

export const getEvents = async (req,res) => {

  const { state, sort, date } = req.query;

  let filter = {};
  let sortOption = {};

  // Filter by state if provided
  if (state) {
    filter.state = state;
  }

  // Set up date filters based on the 'date' parameter
  const currentDate = new Date();

  if (date === 'today') {
    filter.startdate = {
      $gte: new Date(currentDate.setHours(0, 0, 0, 0)),
      $lt: new Date(currentDate.setHours(23, 59, 59, 999))
    };
  } else if (date === 'tomorrow') {
    const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));
    filter.startdate = {
      $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
      $lt: new Date(tomorrow.setHours(23, 59, 59, 999))
    };
  } else if (date === 'next-week') {
    const nextWeekStart = new Date(currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay())));

    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
    filter.startdate = {
      $gte: new Date(nextWeekStart.setHours(0, 0, 0, 0)),
      $lt: new Date(nextWeekEnd.setHours(23, 59, 59, 999))
    };
  }

  // Sorting option: newest or oldest
  if (sort === 'newest') {
    sortOption.createdAt = -1; // Sort by newest
  } else if (sort === 'oldest') {
    sortOption.createdAt = 1; // Sort by oldest
  }

  
  try {

    //GET ALL EVENTS 

    const events = await Event.find(filter).sort(sortOption)
    res.status(200).send({ success: true, message: events})
    
  } catch (error) {
    res.status(500).send({ success: false, error: error})
  }
}

export const getSinglePage = async (req,res) => {

  const id = req.params.id
  try {
   const single = await Event.findById(id).populate('userId');

   console.log(single.ticket)
   res.status(200).send({success: true, message: single})
  } catch (error) {
   console.log(error);
   res.status(500).send({ success: false, error: error})
  }
}

export const getUsersEvents = async (req,res) => {

  const userId = req.params.id
  try {
    const user = await Event.find({userId: userId}).populate('userId').exec();

    res.status(200).send({success: true, message: user})

   
  } catch (error) {
   console.log(error)
   res.status(500).send({ success: false, error: error})
  }
}

export const deleteEvent = async (req,res) => {

  const post = await Event.findById(req.params.id)
  if(!post){
    return res.status(404).send({ success: false, message: "Event not found"})
  }

  if(String(req.user.id) !== String(post.userId)){
    return res.status(403).send({ success: false, message: "You are not authorized to delete this event"})
  }
  try {

    await Event.findByIdAndDelete(req.params.id)
    return res.status(200).send({ success: true, message: "Event deleted"})
   
  } catch (error) {
   console.log(error)
   return res.status(500).send({ success: false, error: error})
  }
}

export const updateEvent = async (req,res) => {

  const post = await Event.findById(req.params.id)
  if(!post){
    return res.status(404).send({ success: false, message: "Event not found"})
  }
  if(req.user.id !== post.userId.toString()){
    return res.status(403).send({ success: false, message: "You are not authorized to update this event"})
  }
  try {
    const update = await Event.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true,
   })
   console.log(update)
   return res.status(200).send({ success: true, message: "Event updated", data: update})
  } catch (error) {
   console.log(error)
   return res.status(500).send({ success: false, error: error})
  }
}

export const buyTicket = async (req,res) => {

  const {eventId, itemId } = req.body

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ success: false, message: 'Invalid eventId format' });
  }


  const user = await User.findById(eventId).populate('event')

  console.log(user)

  try {
   
  } catch (error) {
   console.log(error);
   res.status(500).send({ success: false, error: error})
  }
}

export const selectTicket = async (req,res) => {

  const { ticketType } = req.body;
  const {id} = req.params

  try {
    const event = await Event.findById(id);
    console.log(event)

    if (!event) {
      return res.status(404).send({ success: false, message: 'Event not found' });
    }

    const ticket = event.ticket.find(t => t.ticketType === ticketType);
    console.log(ticket)


    if (!ticket) {
      return res.status(404).send({ success: false, message: 'Ticket type not found' });
    }

    // Increase the ticket quantity
    if(ticket.quantity > 0){
    ticket.quantitySelected += 1;
    ticket.quantity -= 1

    await event.save();

    return res.status(200).send({ success: true, message: 'Ticket selected', data: event });
    } else {
      return res.status(404).send({ success: false, message: 'Tickets sold out' });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Error selecting ticket', error });
  }
}

export const deSelectTicket = async (req,res) => {

  const {id} = req.params
  const { ticketType } = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const ticket = event.ticket.find(t => t.ticketType === ticketType);

    if (!ticket) {
      return res.status(404).send({ success: false, message: 'Ticket type not found' });
    }

    // Increase the ticket quantity
    if(ticket.quantity > 0){
    ticket.quantitySelected -= 1;
    ticket.quantity += 1;
    await event.save();

    return res.status(200).send({ success: true, message: 'Ticket deselected', data: event });
    } else {
      return res.status(404).send({ success: false, message: 'Tickets sold out' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Error deselecting ticket', error });
  }
}