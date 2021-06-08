const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');

var bodyParser = require('body-parser')
const { request } = require('express')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// Middlewares
app.use(cors());
var bankrefs = [
  {
    "id" : "1234",
    "ref1" : "qqw"
  }
]
var sms = []
app.get('/bankref', (req, res) => {
  res.send(bankrefs)
})
app.post('/bankref', (req, res) => {
  var bankref = request.body
  if(!bankref || bankref.text == ""){
    res.status(500).send({error: "Your bankref must have text"})
  } else {
    bankrefs.push(bankref)
    res.status(200).send(bankref)
  }
})
app.get('/sms', (req, res) => {
  res.send(sms)
})
app.post('/sms', (req, res) => {
  var data = request.body
  if(!data || data.text == ""){
    res.status(500).send({error: "Your sms must not be blank"})
  } else {
    bankrefs.push(data)
    res.status(200).send(data)
  }
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, (error) => {
    console.log(`Listening on port ${port}`);
  });