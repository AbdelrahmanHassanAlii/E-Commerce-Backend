const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose.connect(process.env.DB_URL)
        .then((conn) =>{
            console.log(`DB Connected: ${conn.connection.host}`)
        })
        .catch((err) => {
            console.error(`DB ERROR: ${err}`);
            process.exit(1);
        });
};

module.exports = dbConnection;