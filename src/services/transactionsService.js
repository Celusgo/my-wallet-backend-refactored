import { newTransaction, transactionsHistory } from "../repositories/transactionsRepository.js";
import jwt from "jsonwebtoken";

async function confirmHistory(token, type) {
    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }

    const events = transactionsHistory(user.id);

    return (type === 'list') ? events : (type === 'create') ? user.id : "";
};

async function confirmTransaction(value, type, id){
    if (!['INCOME', 'OUTCOME'].includes(type)) {
        return null;
    }
  
    if (value < 0) {
        return null;
    }
  
    await newTransaction(id, value, type);
}

export { confirmHistory, confirmTransaction };