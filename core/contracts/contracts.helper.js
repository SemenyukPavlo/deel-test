const { Op } = require('sequelize');

const contractProfileQuery = profile => ({
  [Op.or]: [{
    ContractorId: profile.id,
  }, {
    ClientId: profile.id,
  }],
});

module.exports = {
  contractProfileQuery,
};
