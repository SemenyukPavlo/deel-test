const { Op } = require('sequelize');
const { Job, Contract, Profile, sequelize } = require('./../../models');
const { contractProfileQuery } = require('./../contracts/contracts.helper');

const unpaid = async (req, res) => {
  const jobs = await Job.findAll({
    where: {
      paid: {
        [Op.not]: true,
      },
    },
    include: [{
      model: Contract,
      where: contractProfileQuery(req.profile),
    }],
  });

  res.json(jobs);
};

const pay = async (req, res) => {
  const job = await Job.findOne({
    where: {
      id: req.params.jobId,
      paid: {
        [Op.not]: true,
      },
    },
    include: [{
      model: Contract,
      include: [{
        as: 'Client',
        model: Profile,
      }, {
        as: 'Contractor',
        model: Profile,
      }],
    }],
  });

  if (!job) return res.sendStatus(404);

  if (job.price > job.Contract.Client.balance) return res.status(403).send('Not enough money');

  const transaction = await sequelize.transaction();

  try {
    await Job.update({
      paid: true,
    }, {
      where: {
        id: job.id,
      },
      transaction,
    });

    await Profile.update({
      balance: job.Contract.Client.balance - job.price,
    }, {
      where: {
        id: job.Contract.ClientId,
      },
      transaction,
    });

    await Profile.update({
      balance: job.Contract.Contractor.balance + job.price,
    }, {
      where: {
        id: job.Contract.ContractorId,
      },
      transaction,
    });

    await transaction.commit();
  } catch (e) {
    await transaction.rollback();

    throw e;
  }

  res.send('ok');
};

module.exports = {
  unpaid,
  pay,
};
