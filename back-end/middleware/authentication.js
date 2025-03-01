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


        }const userID = decoded.userID;
        console.log(userID,emailID);

        req.body.userID = userID;
        next();
    }else{
        res.send("Login please");
    }
}
    