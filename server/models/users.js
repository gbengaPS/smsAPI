const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model {
  static fields() {
    return {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    };
  }

  static associate(models) {
    Users.hasMany(models.Messages, {
      foreignKey: 'receiver',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Users.hasMany(models.Messages, {
      foreignKey: 'sender',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
};
