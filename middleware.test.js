function use(...arg) {
  arg.forEach((middleware, i) => middleware(arg[i + 1]));

  const count = 0;
  arg[0]('request', arg[1]);
}

use(logger, () => console.log('auth'));

function logger(req, next) {
  console.log(req);
  next();
}
