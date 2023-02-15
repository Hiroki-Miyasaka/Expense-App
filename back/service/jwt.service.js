import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let jwtToken = {};

export const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {espiresIn: process.env.JWT_EXPIRES_IN});
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const isTokenExpired = (token) => {
    const decode = jwt.decode(token);

    if(decode.exp < Date.now() / 1000){
        return true;
    }
    return false;
}

