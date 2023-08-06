const {db, DataTypes} = require("../db/connection")
let User = db.define("user", {
    username : DataTypes.STRING,
    email: DataTypes.STRING
});


module.exports = User;