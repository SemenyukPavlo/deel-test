const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => Job.init(sequelize, DataTypes);

class Job extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      paid: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      paymentDate: {
        type: Sequelize.DATE
      }
    }, {
      sequelize,
      modelName: 'Job'
    });

    return Job;
  }
}
