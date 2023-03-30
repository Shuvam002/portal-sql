const { getConnection } = require("../db/conn");

const addrd = async (req, res) => {
  const Domain = req.body.Domain || undefined;
  const event = req.body.event || undefined;
  const gid1 = req.body.gid1 || undefined;
  const gid2 = req.body.gid2 || undefined || null;
  const gid3 = req.body.gid3 || null;
  const gid4 = req.body.gid4 || null;
  const gid5 = req.body.gid5 || null;
  const phone = req.body.phone || undefined;
  if(req.body.validation==="megard130012") {
  try {
    const connection = await getConnection();

    let checkDuplicationSql =
      "SELECT gid1, gid2, gid3, gid4, gid5 FROM rd WHERE event = ? AND (";
    let params = [event];
    let fees = {
        "coding-crusade":150,
        "novice-knockout":100,
        "code-blitz":40,
        "line-seeker":200,
        "maze-runner":200,
        "gladiators-arena":500,
        "robo-clasico":300,
        "ragnarok":250,
        "supernova":250,
        "devils-eye":60,
        "mecha-arcade":60,
        "fifa":70,
        "nfs":70,
        "electro-levina":60,
        "luminos-chase":40,
        "chess":40,
        "classic-crossover":60,
        "darts":40,
        "portraiture":40,
        "table-tennis":40,
        "memo-clips":40,
        "carrom":80,
        "cadstorm":40,
        "mega-arch":150,
        "setubandhan":90,
        "track-o-treasure":80
    };
    const gids = [gid1, gid2, gid3, gid4, gid5].filter((gid) => gid);
    checkDuplicationSql +=
      gids.map((gid) => `gid1 IN (?)`).join(" OR ") + " OR ";
    checkDuplicationSql +=
      gids.map((gid) => `gid2 IN (?)`).join(" OR ") + " OR ";
    checkDuplicationSql +=
      gids.map((gid) => `gid3 IN (?)`).join(" OR ") + " OR ";
    checkDuplicationSql +=
      gids.map((gid) => `gid4 IN (?)`).join(" OR ") + " OR ";
    checkDuplicationSql += gids.map((gid) => `gid5 IN (?)`).join(" OR ");
    params.push(...gids, ...gids, ...gids, ...gids, ...gids);

    checkDuplicationSql += ") AND event = ?";
    params.push(event);

    const [duplicateRows] = await connection.execute(
      checkDuplicationSql,
      params
    );
    console.log(duplicateRows);
    if (duplicateRows.length > 0) {
      res.status(400).json({ error: "Record already exists", duplicateRows,event:event });
      return;
    }

    const sql =
      "INSERT INTO rd (Domain, event, gid1, gid2, gid3, gid4, gid5, phone) VALUES (?,?,?,?,?,?,?,?)";
    const values = [Domain, event, gid1, gid2, gid3, gid4, gid5, phone];

    const [result] = await connection.execute(
      sql,
      values.map((val) => (val === undefined ? null : val))
    );
    
    const userId = result.insertId;

    res.json("Your TID is:" + userId + " " + "Please pay: "+fees[event]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}else{
  res.status(400).json("access_denied");
}
};

module.exports = { addrd };
