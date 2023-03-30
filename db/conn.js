const mysql = require("mysql2/promise");

async function getConnection() {
  const connection = await mysql.createConnection({
    namedPlaceholders: true,
    host: "paridhi2023mysqldb1.ckscrgb0xpar.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "Rabai123",
    port: 3306,
    database: "portalSchema",
  });
  const createTablemrd = `CREATE TABLE IF NOT EXISTS mrd (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL, Roll VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, College VARCHAR(255) NOT NULL
  )`;
  const createTablerd = `CREATE TABLE IF NOT EXISTS rd (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Domain VARCHAR(255) NOT NULL, event VARCHAR(255) NOT NULL, gid1 INT(11) NOT NULL, gid2 INT(11) DEFAULT NULL, gid3 INT(11) DEFAULT NULL, gid4 INT(11) DEFAULT NULL, gid5 INT(11) DEFAULT NULL, phone VARCHAR(255) NOT NULL, played BOOLEAN NOT NULL DEFAULT false,
    UNIQUE KEY unique_gids_per_event (event, gid1, gid2, gid3, gid4, gid5)
  )`;
  await connection.execute(createTablemrd);
  await connection.execute(createTablerd);
  return connection;
}

module.exports = {
  getConnection,
};
