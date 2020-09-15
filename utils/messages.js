const moment = require('moment');

function formatMessage(name, text) {
  return {
    name,
    text,
    time: moment().format('h:m:s a'),
  };
}

module.exports = formatMessage;
