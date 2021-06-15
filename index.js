const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

let bankrefs = []

let postSMS = []

//GET POST DELETE BankRef
app.get('/bankref', (req, res) => {
  res.send(bankrefs)
})
app.post('/bankref', (req, res) => {
  var bankref = req.body
  if(!bankref || bankref.text == ""){
    res.status(500).send({error: "Your bankref must have text"})
  } else {
    bankrefs.push(bankref)
    res.status(200).send(bankref)
  }
})
app.delete('/bankref', (req, res) => {
  bankrefs = []
  res.send(bankrefs)
})


//GET POST DELETE SMS
app.get('/sms', (req, res) => {
  res.send(postSMS)
})
app.post('/sms', (req, res) => {
  var data = req.body
  if(!data || data.text == ""){
    res.status(500).send({error: "Your sms must not be blank"})
  } else {
    postSMS.push(data)
    res.status(200).send(data)
  }
})
app.delete('/sms', (req, res) => {
  postSMS = []
  res.send(postSMS)
})

//Get localhost:5000
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, (error) => {
    console.log(`Listening on port ${port}`);
  });