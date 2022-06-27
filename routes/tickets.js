//dependencies
const router = require('express').Router();
const verify = require('../middleware/verifyToken');
const Ticket = require('../model/ticket');
const ticketController = require('../controllers/tickets');

// Fetch tickets
router.get("/", verify , ticketController.getTickets);

//Fetch ticket by ID
router.get("/:id", verify , ticketController.getTicketsByID);

// Adding new Ticket
router.post("/create",verify, ticketController.addTickets);

module.exports = router;