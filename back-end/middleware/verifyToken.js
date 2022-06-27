const jwt = require('jsonwebtoken');

//MIDDLEWARE Function
module.exports = function (req , res , next) {
    const token = req.header('Authorization').split(' ')[1];
    if(!token) return res.status(401).send("Access Denied");
    
    try {
        const verified = jwt.verify(token,process.env.SECRET_TOKEN1);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token');
    }
}