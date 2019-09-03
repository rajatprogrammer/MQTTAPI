'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Mqtt', {
    id: {
      type:  DataTypes.INTEGER ,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  },{
    timestamps: true, 
    underscored: true,
    freezeTableName:true,
    tableName:'mqtts'
    
  });
};
