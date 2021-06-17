const { Contract } = require('./../../models');
const { contractProfileQuery } = require('./contracts.helper');

const get = async (req, res) => {
  const { id } = req.params;

  const contract = await Contract.findOne({
    where: {
      ...contractProfileQuery(req.profile),
      id,
    },
  });

  if (!contract) return res.sendStatus(404);

  res.json(contract);
};

const list = async (req, res) => {
  const contracts = await Contract.findAll({
    where: contractProfileQuery(req.profile),
  });

  res.json(contracts);
};

module.exports = {
  get,
  list,
};
