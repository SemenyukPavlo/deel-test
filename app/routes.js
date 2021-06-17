const { getProfile } = require('./../middlewares/getProfile');

const contracts = require('./../core/contracts/contracts.router');
const jobs = require('./../core/jobs/jobs.router');
const balances = require('./../core/balances/balances.router');
const admin = require('./../core/admin/admin.router');


module.exports = (app) => {
  app.use(getProfile);

  app.use('/contracts', contracts);
  app.use('/jobs', jobs);
  app.use('/balances', balances);
  app.use('/admin', admin);


  //
  // GET /admin/best-profession?start=<date>&end=<date> - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
  //
  //   GET /admin/best-clients?start=<date>&end=<date>&limit=<integer> - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
};
