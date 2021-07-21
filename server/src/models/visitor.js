module.exports = function (sequelize, DataTypes) {
  const visitor = sequelize.define(
    "visitor",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      visitor_name: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      underscored: true,
    }
  );

  return visitor;
};
