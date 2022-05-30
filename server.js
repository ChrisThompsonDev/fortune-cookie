const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

let fortuneText = [`The fortune you seek is in another cookie.`, `A closed mouth gathers no feet.`, `A conclusion is simply the place where you got tired of thinking.`, `A cynic is only a frustrated optimist.`, `A foolish man listens to his heart. A wise man listens to cookies.`, `You will die alone and poorly dressed.`, `A fanatic is one who can't change his mind, and won't change the subject.`, `If you look back, you’ll soon be going that way.`, `You will live long enough to open many fortune cookies.`, `An alien of some sort will be appearing to you shortly.`]

const server = http.createServer((req, res) => {
  const readWrite = (file, contentType) => {
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
        res.write(data);
        res.end();
    })
  }//Page Load Function
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  switch (page) {
    case '/':
      readWrite('index.html', 'text/html')
      break
    case '/api':
      if ('cookie' in params){
        if(params['cookie']== 'fortune'){
          res.writeHead(200, {'Content-Type': 'application/json'})
          const fortuneReturn = fortuneText[Math.floor(Math.random() * 10)]
          const objToJson = {
            cookie: fortuneReturn
          }
          res.end(JSON.stringify(objToJson));
        }
          
      }
      break
    case '/css/style.css':
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
      break
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript')
      break
    default:
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
      break
  }
});
server.listen(8000);