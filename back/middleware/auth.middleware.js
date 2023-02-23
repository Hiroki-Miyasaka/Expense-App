import dotenv from "dotenv";
import {verifyToken, isTokenExpired} from "../service/jwt.service.js";
import redisClient from "../service/redis.service.js";

dotenv.config();

const auth = async (req, res, next) => {

    const token = req.headers.authorization;

    const redisToken = await redisClient.get(token);
    

    if(!redisToken){
        return res.status(400).json({
            status: "fail",
            message: "Unauthorized!"
        })
    }else{
        try{
            const decoded = verifyToken(token);

            if(isTokenExpired(token)){
                await redisClient.del(token);
                return res.status(401).json({
                    status: "fail",
                    message: "Unauthorized!"
                })
            }
            // console.log(decoded);
            req.user = decoded.id;
            next();
        }catch(err){
            return res.status(500).json({
                status: "fail",
                message: "Unauthorized!"
            })
        }
    }
}

export default auth;