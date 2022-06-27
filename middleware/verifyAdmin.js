const jwt = require('jsonwebtoken');

//MIDDLEWARE Function
module.exports = function (req , res , next) {
    const token = req.header('Authorization').split(' ')[1];
    if(!token) return res.status(401).send("Access Denied");
    
    try {
        const verified = jwt.verify(token,process.env.SECRET_TOKEN1);
        req.user = verified;
        const decodedJwt = jwt.decode(token, { complete: true });
        if(decodedJwt.payload.role != "admin"){
            return res.status(400).send('Not an admin user')
        }
        next();
    }
    catch(err){
        res.status(400).send('Invalid token');
    }
}