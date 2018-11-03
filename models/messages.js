const Sequelize = require('sequelize');

module.exports = class Messages extends Sequelize.Model {
  static fields() {
    return {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      receiver: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
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
    Messages.belongsTo(models.Users, {
      as: 'receiverId',
      foreignKey: 'receiverId',
    });
    Messages.belongsTo(models.Users, {
      as: 'senderId',
      foreignKey: 'senderId',
    });
  }
};
