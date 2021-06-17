const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => Profile.init(sequelize, DataTypes);

class Profile extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2)
      },
      type: {
        type: Sequelize.ENUM('client', 'contractor')
      }
    }, {
      sequelize,
      modelName: 'Profile'
    });

    return Profile;
  }
}
