const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => Contract.init(sequelize, DataTypes);

class Contract extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      terms: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('new', 'in_progress', 'terminated')
      }
    }, {
      sequelize,
      modelName: 'Contract'
    });

    return Contract;
  }
}
