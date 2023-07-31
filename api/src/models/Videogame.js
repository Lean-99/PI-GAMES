const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogames', {
    id: {
      type: DataTypes.UUID, // ALFA-NUMERICO: ASD181D-SAD1811-ASD181
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4 // ME GENERA EL UUID AUTOMATICAMENTE.
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [5,20],
          msg: 'The name must have a minimum of 5 and a maximum of 10 characters'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
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
      type: DataTypes.STRING,
      allowNull: false 
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },{ freezeTableName: true, timestamps: false });
};
