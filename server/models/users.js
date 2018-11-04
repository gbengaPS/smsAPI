module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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

  Users.associate = (models) => {
    Users.hasMany(models.messages, {
      foreignKey: 'receiver',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Users.hasMany(models.messages, {
      foreignKey: 'sender',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Users;
};
