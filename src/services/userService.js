import { findExistingMail, newUser } from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function completeRegistry(email, name, password){
    const existingUserWithGivenEmail = await findExistingMail(email);

    if (existingUserWithGivenEmail) return null;

    const hashedPassword = bcrypt.hashSync(password, 12);

    await newUser(name, email, hashedPassword);
}

async function authenticateSignIn(email, password){
    const registeredUser = await findExistingMail(email);

    if(!registeredUser || !bcrypt.compareSync(password, registeredUser.password)) return null;

    const token = jwt.sign({
        id: registeredUser.id
    }, process.env.JWT_SECRET);

    return token;
}

export {completeRegistry, authenticateSignIn};