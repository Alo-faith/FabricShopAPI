const Shop = require("./Shop");
const Fabric = require("./Fabric");
const User = require("./User");

//  A shop has many fabics

Shop.hasMany(Fabric, { as: "fabrics", foreignKey: "shopId", allowNull: false });

Fabric.belongsTo(Shop, { as: "shop" });

User.hasOne(Shop, { foreignKey: "userId" });

Shop.belongsTo(User, { as: "user", foreignKey: "userId" });

module.exports = {
  Shop,
  Fabric,
  User,
};
