function a(callback) {
  callback('name');
}

function x(name) {
  console.log(name);
}

a(x);
