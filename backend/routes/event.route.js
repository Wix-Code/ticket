import express from 'express'

import { getEvents, createEvent, deleteEvent, updateEvent, getSinglePage, getUsersEvents, buyTicket, selectTicket, deSelectTicket } from "../controllers/event.controller.js";
import { verify } from "../components/verifyToken.js"


const router = express.Router()

// POSTING PRODUCTS
router.post("/", verify, createEvent);

// DELETING PRODUCTS
router.delete("/:id", verify, deleteEvent);

// UPDATE PRODUCTS
router.post("/:id", verify, updateEvent);

// GET ALL PRODUCTS
router.get("/", getEvents);

// BUY TICKET
router.post("/buy", verify, buyTicket);


// GET SINGLE EVENT
router.get("/:id", getSinglePage)

// GET ALL PRODUCTS
router.get("/:id/posts", getUsersEvents);

// SELECT TICKET
router.post("/:id/increase", selectTicket);

// DESELECT TICKET
router.post("/:id/decrease", deSelectTicket);


export default router