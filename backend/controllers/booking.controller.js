import Booking from "../models/booking.model.js";
import Event from "../models/event.model.js";

export const booking = async (req, res) => {
  
  try {
    const { eventId, purchaser, ticketOwner } = req.body;

    // Validate and fetch the event
    const event = await Event.findById(eventId);
    console.log(event)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if there are enough tickets available for each type requested
    const availableTickets = event.ticket.reduce((acc, ticket) => {
      acc[ticket.name] = ticket;
      return acc;
    }, {});

    console.log(availableTickets)

    const bookingsData = ticketOwner.map(owner => {
      const ticket = availableTickets[owner.ticketType];

      if (!ticket || ticket.quantity <= 0) {
        throw new Error(`Ticket type ${owner.ticketType} is not available`);
      }

      // Reduce quantity in memory; we will save it back to the event later
      ticket.quantity -= 1;

      return {
        eventId,
        fullname: owner.fullName,
        email: owner.email,
        phoneNo: owner.phone,
        ticketType: owner.ticketType,
      };
    });

    // Create the booking entries in the database
    const bookings = await Booking.insertMany(bookingsData);

    // Update the event tickets with new quantities
    await event.save();

    res.status(201).json({
      message: 'Booking created successfully',
      purchaser,
      bookings
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating booking' });
  }
}