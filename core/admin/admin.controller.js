const { Op } = require('sequelize');
const { Job, Contract, Profile, sequelize } = require('./../../models');

const bestProfession = async (req, res) => {
  const { start, end } = req.query;
  const queryParams = [start && { paymentDate: { [Op.gte]: new Date(start) } }, end && { paymentDate: { [Op.lte]: new Date(end) } }].filter(i => i);

  const profile = await Job.findOne({
    where: {
      [Op.and]: [{
        paid: true,
      }, ...queryParams],
    },
    include: [{
      model: Contract,
      include: [{
        as: 'Contractor',
        model: Profile,
      }],
    }],
    attributes: [
      'Contract.Contractor.profession',
      [sequelize.fn('sum', sequelize.col('price')), 'totalPrice'],
    ],
    group: ['Contract.Contractor.profession'],
    order: [[sequelize.fn('sum', sequelize.col('price')), 'desc']],
    raw: true,
  });

  res.send(profile.profession);
};

const bestClients = async (req, res) => {
  const { start, end, limit = 2 } = req.query;
  const queryParams = [start && { paymentDate: { [Op.gte]: new Date(start) } }, end && { paymentDate: { [Op.lte]: new Date(end) } }].filter(i => i);

  const clients = await Job.findAll({
    where: {
      [Op.and]: [{
        paid: true,
      }, ...queryParams],
    },
    include: [{
      model: Contract,
      include: [{
        as: 'Client',
        model: Profile,
      }],
    }],
    attributes: [
      'Contract.Client.id',
      [sequelize.fn('sum', sequelize.col('price')), 'paid'],
      [sequelize.literal("firstName || ' ' || lastName"), 'fullName'],
    ],
    group: ['Contract.Client.id'],
    order: [[sequelize.fn('sum', sequelize.col('price')), 'desc']],
    raw: true,
    limit,
  });

  res.send(clients.map(({ id, paid, fullName }) => ({ id, paid, fullName })));
};

module.exports = {
  bestProfession,
  bestClients,
};
