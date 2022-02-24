const dotenv = require('dotenv');

const mongoose = require('mongoose');

// Handle sync ErrorsExceptions and exit the process
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT REJECTION! Shutting Down ...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB_PASS = process.env.DATABASE_PASSWORD;

const DB = process.env.DATABASE.replace('<PASSWORD>', DB_PASS);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connected succesfully');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting Down ...');
  server.close(() => process.exit(1));
});

// CUSTOM MIDDLEWARE
// const App2 = () => {
//   const req = { type: 'request', params: [] };
//   const res = { type: 'response' };

//   const middlewares = [];

//   const use = (fn) => middlewares.push(fn);

//   const runMiddlewares = (index) => {
//     const count = middlewares.length;
//     if (index < count)
//       middlewares[index].apply(null, [
//         req,
//         res,
//         (err) => {
//           if (err) console.log();
//           runMiddlewares(index + 1);
//         },
//       ]);
//   };

//   const get = (path, fn) => {
//     runMiddlewares(0);
//     fn.apply(null, [req, res]);
//   };

//   return { get, use };
// };

// const app2 = App2();

// app2.use((req, res, next) => {
//   req.params.id = 5;
//   console.log(req, 'Middleware 1');
//   next();
// });

// app2.use((req, res, next) => {
//   req.params.id = 5;
//   console.log(req, 'Middleware 2');
//   next();
// });

// app2.use((req, res, next) => {
//   req.params.id = 5;
//   console.log(req, 'Middleware 3!');
//   next();
// });

// app2.get('/', (req, res) => {
//   console.log('GET FUNCTION!!!');
// });

// const reverse = (str) => [...str].map(l => l).join('') === str;

// console.log(reverse('adda'));
