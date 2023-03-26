const mysql = require('mysql2');

const getConnection = mysql.createConnection({
    namedPlaceholders: true,
    host: 'localhost',
    user: 'root',
    password: 'I live@malda7321011911',
    database: 'test'
});

exports.getData = (req, res) => {
    const {event} = req.body;
    
    console.log(event);
    const query = 'SELECT * FROM rd WHERE event =? and played=0';
    console.log(getConnection.execute(query,[event]));
    const [rows]=getConnection.execute(query,[event]);
    getConnection.query(query, [event], (error, results) => {
        if (error) throw error;
        console.log(typeof(results));
        res.setHeader('Content-Type', 'application/json');
        if(rows.length>0){
            const html=`<table>`;
            while(rows > 0){
                html+=`<tr><form method='POST' action='mark.js'><td>${results.id}</td><td><input type='text' name='id'></td><td><button type='submit'>mark</button></td></form></tr>`;
            }
            html+=`</table>`;
        }
        res.json(html);
    });
};

// Update data in MySQL database
exports.updateData = (req, res) => {
    const { id } = req.body;
    
    const query = `UPDATE rd SET played=1 WHERE id=${id}`;
    getConnection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
};