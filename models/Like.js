const {db, DataTypes } = require("../db/connection")

let Like = db.define("like",{
    reactionType: DataTypes.STRING,
    createdAt: DataTypes.STRING
});

module.exports = Like;