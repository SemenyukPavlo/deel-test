const Sequelize = require('sequelize');
const profile = require('./profile')
const contract = require('./contract')
const job = require('./job')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

const Profile = profile(sequelize, Sequelize.DataTypes);
const Contract = contract(sequelize, Sequelize.DataTypes);
const Job = job(sequelize, Sequelize.DataTypes);

Profile.hasMany(Contract, {as :'Contractor',foreignKey:'ContractorId'})
Contract.belongsTo(Profile, {as: 'Contractor'})
Profile.hasMany(Contract, {as : 'Client', foreignKey:'ClientId'})
Contract.belongsTo(Profile, {as: 'Client'})
Contract.hasMany(Job)
Job.belongsTo(Contract)

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job
};
