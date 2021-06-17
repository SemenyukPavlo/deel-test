const { Op } = require('sequelize');
const { Job, Contract, Profile } = require('./../../models');

const deposit = async (req, res) => {
  const { params, body } = req;

  const jobs = await Job.findAll({
    where: {
      paid: {
        [Op.not]: true,
      },
    },
    attributes: ['price'],
    include: [{
      model: Contract,
      where: {
        status: 'in_progress',
        ClientId: params.userId,
      },
    }],
  });

  const totalPrice = jobs.reduce((sum, { price }) => sum += price, 0); // eslint-disable-line

  if (body.sum > (totalPrice * 0.25)) return res.status(403).send('More than 25%');

  const profile = await Profile.findByPk(params.userId);
  const balance = +profile.balance + +body.sum;

  await Profile.update({
    balance,
  }, {
    where: {
      id: profile.id,
    },
  });

  res.send(`Balance: ${balance}`);
};

module.exports = {
  deposit,
};
