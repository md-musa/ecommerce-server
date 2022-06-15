const http = require('http');

function express() {
  function server(req, res) {
    get(req, res);
  }
  function get(url, callback) {}
  function listen(port, callback) {
    http.createServer(server).listen(port, callback);
  }
  return { get, listen };
}

const app = express();
app.get('/', (req, res) => {
  console.log(req);
});

app.listen(5000, () => console.log('server is listening'));
