const { bulkMessages, bulkUsers } = require('../lib/constants');

module.exports = {
  up: (queryInterface) => {
    queryInterface.bulkInsert('users', bulkUsers).then(() => {
      queryInterface.bulkInsert('messages', bulkMessages);
    });
  },
};
