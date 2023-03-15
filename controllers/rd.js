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
        const checkDuplicationSql = 'SELECT * FROM rd WHERE (event = ? AND (gid1 = ? OR gid2 = ? OR gid3 = ? OR gid4 = ? OR gid5 = ?)) OR (gid1 = ? AND gid2 = ? AND gid3 = ? AND gid4 = ? AND gid5 = ?)';
        const [duplicateRows] = await connection.execute(checkDuplicationSql, [event, gid1, gid2, gid3, gid4, gid5]);
        if (duplicateRows.length > 0) {
            res.status(400).json({ error: 'Record already exists' });
            return;
        }

        const sql = 'INSERT INTO rd (Domain, event, gid1, gid2, gid3, gid4, gid5, phone) VALUES (?,?,?,?,?,?,?,?)';

        const values = [Domain, event, gid1, gid2, gid3, gid4, gid5, phone];

        const [result] = await connection.execute(sql, values.map((val) => val === undefined ? null : val));

        const userId = result.insertId;

        res.json("Your TID is:" + userId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addrd };