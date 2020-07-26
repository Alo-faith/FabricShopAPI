const { DataTypes, Model } = require("sequelize");
const db = require("../db");
//   slug
const SequelizeSlugify = require("sequelize-slugify");

class Fabric extends Model {}

Fabric.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize: db,
  }
);
SequelizeSlugify.slugifyModel(Fabric, {
  source: ["name"],
});
module.exports = Fabric;
