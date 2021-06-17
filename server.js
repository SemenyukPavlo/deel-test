const { port } = require('config');

const app = require('./app/app');
require('./models');

app().listen(port, () => console.log(`Express App Listening on port ${port}`)); // eslint-disable-line no-console
