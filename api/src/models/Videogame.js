const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID, // ALFA-NUMERICO: ASD181D-SAD1811-ASD181
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4 // ME GENERA EL UUID AUTOMATICAMENTE.
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },{ freezeTableName: true, timestamps: false });
};
