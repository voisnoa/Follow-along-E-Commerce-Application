const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log(process.env.SECRET_KEY) 

const authentication = (req, res, next) => {

    const token = req.headers?.authorization?.split(" ")[1]; //what is the ? for 


    if(token){
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if(decoded){
            const emailID = decoded.email;
            req.body.email = emailID;
            const userID = decoded.userID;
            req.body.userID = userID;

            console.log(userID,emailID);
            next();
        }
        else{
            res.status(401).send("Invalid Token");
        }
        
    }else{
        res.status(401).send("Login please");
    }
}

module.exports = authentication;
    