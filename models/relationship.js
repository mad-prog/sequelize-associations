const dbConnection = require("../config/db");
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

const loadModels = () => {
  User.hasMany(Post, {
    foreignKey: {
      allowNull: false,
    },
  });

  User.hasMany(Comment, {
    foreignKey: {
      allowNull: false,
    },
  });

  Post.belongsTo(User);
  Post.hasMany(Comment, {
    foreignKey: {
      allowNull: false,
    },
  });
  Comment.belongsTo(User);
  Comment.belongsTo(Post);

  //to empty all tables
  // dbConnection
  //   .sync({ force: true })
  //   .then(() => console.log("All models loaded"));

  dbConnection.sync().then(() => console.log("All models loaded"));
};

module.exports = loadModels;
