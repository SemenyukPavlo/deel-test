module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const errData = err.data || err;
  const isSequelize = (err.name || '').toLowerCase().includes('sequelize');

  let message = err.message || errData.message || errData;

  if (isSequelize) {
    const sequilizeErrors = (err.errors || [err]).map(error => error.message);
    message = sequilizeErrors.join(', ');
  }

  console.log(err, 'Server error'); // eslint-disable-line no-console
  res.status(err.status || 500);
  res.send(message);
  res.end();
};
