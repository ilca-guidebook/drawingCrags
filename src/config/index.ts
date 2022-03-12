let _config;

try {
  if (process.env.REACT_APP_ENV) {
    _config = require(`./config.${process.env.REACT_APP_ENV}.json`);
  } else {
    _config = require(`./config.${process.env.NODE_ENV}.json`);
  }
} catch (error) {
  console.warn('problem loading config', error);
}

const config = {
  testValue: _config.testValue,
};

export default config;
