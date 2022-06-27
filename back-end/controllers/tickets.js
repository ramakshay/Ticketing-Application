const Ticket = require('../model/ticket');

exports.getTickets = async (req,res) =>{
    if(req.query.id){
      var ticketId = req.query.id;
      var tickets =  await Ticket.findById(ticketId);
      res.status(200).json({tickets: tickets, msg : "Ticket fetched succesfully" });
    }
    else {
      var tickets =  await Ticket.find();
      res.status(200).json({tickets: tickets, msg : "Tickets fetched succesfully" });
    }
      
  }

exports.addTickets = async (req,res) => {
    //Creating new ticket
    const ticket = new Ticket({
      ticketId : req.body.ticketId,
      ticketName : req.body.ticketName,
      description : req.body.description,
      status : req.body.status
    });
    try {
      const savedTicket = await ticket.save();
      res.status(200).send({ticket : ticket._id});
    }
    catch(err) {
        res.status(400).send(err);
    }
}

exports.getTicketsByID = async (req,res) =>{
    var ticketId = req.params.id;
    var tickets =  await Ticket.findById(ticketId);
    res.status(200).json({tickets: tickets, msg : "Ticket fetched succesfully" });
  }