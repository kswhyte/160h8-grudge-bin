const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');
// console.log(shortid.generate());

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 1111);
app.locals.title = '160h8 Grudge Bin';

app.locals.grudges = {}

app.get('/', (req, res) => {
  res.redirect('/grudges')
})

app.get('/grudges', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
