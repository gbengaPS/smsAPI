const now = new Date();
exports.user = { name: 'gbenga', phoneNumber: '08099223457' };
exports.secondUser = { name: 'Washington', phoneNumber: '911' };
exports.message = { receiver: '911', message: 'hello world' };
exports.internalErrorMessage = 'Your request has made our server behave in an unusual way';

exports.bulkUsers = [
  {
    name: 'Mark',
    phoneNumber: '09099234781',
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Jenny',
    phoneNumber: '08022334564',
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Brighton',
    phoneNumber: '08064553212',
    createdAt: now,
    updatedAt: now,
  },
];
exports.bulkMessages = [
  {
    receiver: '08022334564',
    message: 'hello there',
    sender: '09099234781',
    createdAt: now,
    updatedAt: now,
  },
  {
    receiver: '09099234781',
    message: 'hello there',
    sender: '08022334564',
    createdAt: now,
    updatedAt: now,
  },
  {
    receiver: '08064553212',
    message: 'This is another message',
    sender: '08022334564',
    createdAt: now,
    updatedAt: now,
  },
];
