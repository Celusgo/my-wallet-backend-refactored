import { confirmHistory, confirmTransaction } from "../services/transactionsService.js";

async function newTransaction(req, res){
    try{
        const authorization = req.headers.authorization || "";

        const token = authorization.split('Bearer ')[1];

        if (!token) return res.sendStatus(401);

        const id = await confirmHistory(token, 'new');
        
        if (id===null) return res.sendStatus(401);

        const { value, type } = req.body;

        if(!value || !type) return res.sendStatus(400);

        const authenticate = await confirmTransaction(value, type, id);
        
        if(authenticate === null) return res.sendStatus(400);

        res.sendStatus(201);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
};

async function transactionsList(req, res){
    try {
        const authorization = req.headers.authorization || "";

        const token = authorization.split('Bearer ')[1];

        if (!token) return res.sendStatus(401);
    
        const events = await confirmHistory(token, 'history');

        if(events === null) return res.sendStatus(401);
    
        res.send(events);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
};

async function transactionsSum(req, res){
    try {
        const authorization = req.headers.authorization || "";
        
        const token = authorization.split('Bearer ')[1];

        if (!token) return res.sendStatus(401);
    
        const events = await confirmHistory(token, 'list');

        if(events === null) return res.sendStatus(401);
    
        const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
    
        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export { newTransaction, transactionsList, transactionsSum };
