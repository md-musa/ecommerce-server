// const { format, transports, createLogger } = require('winston');
// // require('winston-mongodb');

// const logger = createLogger({
//   transports: [
//     new transports.File({
//       filename: 'error.log',
//       level: 'error',
//       format: format.combine(format.timestamp(), format.json()),
//     }),

//     new transports.File({
//       filename: 'combined.log',
//       level: 'info',
//       format: format.combine(format.timestamp(), format.json()),
//     }),

//     // new transports.MongoDB({
//     //   db: process.env.MONGODB_URI,
//     //   level: 'info',
//     //   format: format.combine(format.timestamp(), format.json()),
//     //   options: {
//     //     useNewUrlParser: true,
//     //     useUnifiedTopology: true,
//     //   },
//     // }),
//   ],

//   rejectionHandlers: [new transports.File({ filename: 'rejections.log' })],
//   exceptionHandlers: [new transports.File({ filename: 'exceptions.log' })],
// });

// module.exports = logger;
