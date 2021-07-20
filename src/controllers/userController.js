import { completeRegistry, authenticateSignIn } from "../services/userService.js";

async function signUp(req, res){
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password) return res.sendStatus(400);

        const complete = await completeRegistry(email, password, name);

        if(complete === null) return res.sendStatus(409);

        res.sendStatus(201);
    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
};

async function signIn(req, res){
    try{
        const {email, password } = req.body;

        if(!email || !password) return res.sendStatus(400);

        const token = await authenticateSignIn(email, password);

        if(token === null) return res.sendStatus(401);

        res.send({
            token
        });
    }catch(err){
        console.error(err);
        restart.sendStatus(500);
    }
};

export {signUp, signIn};