const { DataTypes, Model } = require("sequelize");
const db = require("../db");
//   slug
const SequelizeSlugify = require("sequelize-slugify");

class Shop extends Model {}

Shop.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize: db,
  }
);
SequelizeSlugify.slugifyModel(Shop, {
  source: ["name"],
});
module.exports = Shop;
