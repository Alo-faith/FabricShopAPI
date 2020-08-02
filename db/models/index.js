const Shop = require("./Shop");
const Fabric = require("./Fabric");

//  A shop has many fabics

Shop.hasMany(Fabric, { as: "fabrics", foreignKey: "shopId", allowNull: false });

Fabric.belongsTo(Shop, { as: "shop" });
module.exports = {
  Shop,
  Fabric,
};
