import connection from '../database.js';

async function findExistingMail(email){
    const request = await connection.query(
        `SELECT * FROM "users" WHERE "email" = $1`,
        [email]
    );
    return request.rows[0];
};

async function newUser(name, email, hashedPassword){
    await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );   
}

export {findExistingMail, newUser};