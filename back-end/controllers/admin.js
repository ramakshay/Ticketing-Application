const User = require('../model/user');

exports.getUsers = async (req,res) => {
    var users = await User.find();
    res.status(200).json({msg:"Users data fetched",users: users});
}

exports.changeRole = async (req,res) => {
    //check for user
    const user = await User.findOne({_id : req.body._id});
    if(!user) return res.status(400).send("User not found");

    //Edit the role
    User.findByIdAndUpdate( req.body._id, { role: req.body.role }, {new: true},
    function (err, docs) {
        if (err){
            res.status(400).send(err)
        }
        res.status(200).json({updatedUser: docs, msg : "User role updated succesfully"})
    });
}