const mysql = require('mysql2');

const getConnection = mysql.createConnection({
    namedPlaceholders: true,
    host: 'localhost',
    user: 'root',
    password: 'I live@malda7321011911',
    database: 'test'
});

exports.getData = (req, res) => {
    const { event } = req.query;
    const query = `SELECT * FROM rd WHERE event='${event}'`;
    getConnection.query(query, (error, results) => {
        if (error) throw error;
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(results));
    });
};

// Update data in MySQL database
exports.updateData = (req, res) => {
    const { id } = req.params;
    const { played } = req.body;
    const query = `UPDATE rd SET played=${played} WHERE id=${id}`;
    getConnection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
};