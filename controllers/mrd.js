// controllers/users.js

const { getConnection } = require('../db/conn');

const addmrd = async (req, res) => {
    const { name, roll, phone, email, college } = req.body;
    if (req.body.validation === "megarain130012") {
        try {
            const connection = await getConnection();

            const sql = 'INSERT INTO mrd (name, roll, phone, email, college) VALUES (?, ?, ?, ?, ?)';

            const [result] = await connection.execute(sql, [name, roll, phone, email, college]);

            const userId = result.insertId;

            res.json("Your GID is:" + userId);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }else{
        res.status(404).json("Access denied");
    }
}


















module.exports = { addmrd };

