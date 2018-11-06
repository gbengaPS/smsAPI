module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  Messages.associate = (models) => {
    Messages.belongsTo(models.users, {
      foreignKey: 'sender',
    });
    Messages.belongsTo(models.users, {
      foreignKey: 'sender',
    });
  };
  return Messages;
};
