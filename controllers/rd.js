const { getConnection } = require('../db/conn');

const addrd = async (req, res) => {
    const Domain = req.body.Domain || undefined;
    const event = req.body.event || undefined;
    const gid1 = req.body.gid1 || undefined;
    const gid2 = req.body.gid2 || undefined || null;
    const gid3 = req.body.gid3 || null;
    const gid4 = req.body.gid4 || null;
    const gid5 = req.body.gid5 || null;
    const phone = req.body.phone || undefined;

    try {
        const connection = await getConnection();
        if (event === 'combos') {
            const sqlInsert = 'INSERT INTO rd (Domain,event,gid1,gid2,gid3,gid4,gid5,phone) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const sqlSelect = 'SELECT gid1, gid2, gid3, gid4, gid5 FROM rd WHERE event = ?';
            const sqlParams = [gid1, gid2, gid3, gid4, gid5, phone, event];
            connection.query(sqlSelect, [event], (err, result) => {
                if (err) throw err;

                const arr = [];
                result.forEach(row => {
                    if (row.gid1) arr.push(row.gid1);
                    if (row.gid2) arr.push(row.gid2);
                    if (row.gid3) arr.push(row.gid3);
                    if (row.gid4) arr.push(row.gid4);
                    if (row.gid5) arr.push(row.gid5);
                });

                connection.query(sqlInsert, sqlParams, (err, result) => {
                    connection.release();

                    if (err) {
                        console.error(err);
                        res.status(500).send('Error inserting record');
                        return;
                    }

                    const lastId = result.insertId;
                    const responseText = `Your TID for ${event} is ${lastId}`;

                    if (arr.includes(gid1) || arr.includes(gid2) || arr.includes(gid3) || arr.includes(gid4) || arr.includes(gid5)) {
                        res.send(`${responseText}<br>GID already exists in this event`);
                    } else {
                        res.send(responseText);
                    }
                });
            });
        } else {
            let checkDuplicationSql = 'SELECT gid1, gid2, gid3, gid4, gid5 FROM rd WHERE event = ? AND (';
            let params = [event];
            let fees = [];
            const gids = [gid1, gid2, gid3, gid4, gid5].filter(gid => gid);
            checkDuplicationSql += gids.map(gid => `gid1 IN (?)`).join(' OR ') + ' OR ';
            checkDuplicationSql += gids.map(gid => `gid2 IN (?)`).join(' OR ') + ' OR ';
            checkDuplicationSql += gids.map(gid => `gid3 IN (?)`).join(' OR ') + ' OR ';
            checkDuplicationSql += gids.map(gid => `gid4 IN (?)`).join(' OR ') + ' OR ';
            checkDuplicationSql += gids.map(gid => `gid5 IN (?)`).join(' OR ');
            params.push(...gids, ...gids, ...gids, ...gids, ...gids);

            checkDuplicationSql += ') AND event = ?';
            params.push(event);

            const [duplicateRows] = await connection.execute(checkDuplicationSql, params);
            console.log(duplicateRows);
            if (duplicateRows.length > 0) {
                res.status(400).json({ error: 'Record already exists', duplicateRows });
                return;
            }


            const sql = 'INSERT INTO rd (Domain, event, gid1, gid2, gid3, gid4, gid5, phone) VALUES (?,?,?,?,?,?,?,?)';
            const values = [Domain, event, gid1, gid2, gid3, gid4, gid5, phone];

            const [result] = await connection.execute(sql, values.map((val) => val === undefined ? null : val));
            var msg = fees.map((fee) => fee === event);
            const userId = result.insertId;

            res.json("Your TID is:" + userId + " " + msg);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }


};

module.exports = { addrd };