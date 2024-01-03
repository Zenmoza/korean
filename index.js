const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const sdk = require('api')('@telegram-bot-sdk/v2.0#8hz4kq6s9i74');
const app = express()
const func = require('./function')
const base = require('./base')
const myHomepage = JSON.parse(fs.readFileSync('./database/seris.json'));

app.get('/ping',async(req,res)=>{

  sdk.sendmessage({
    text: 'Required',
    parse_mode: 'Optional',
    disable_web_page_preview: false,
    disable_notification: false,
    reply_to_message_id: 1133658666
  }, {
    token: '1160887233:AAHWSJ5o04vISO0KIUrQ6-GTFaMRhNx9ES4',
    'user-agent': 'Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)'
  })
    .then(({ data }) => rconsole.log(data))
    .catch(err => console.error(err));
  res.send(200)
})
app.get('/', async(req,res)=>{
  res.send({status: 200})
})
app.get('/api/post/:id/:episode', async(req,res)=>{
 const id = req.params.id
 const episode = req.params.episode
 const data = JSON.parse(fs.readFileSync(`./database/post/${id}/${episode}.json`))
  res.send(data[0])
})
app.get('/api/seris', async(req,res)=>{
  const data = JSON.parse(fs.readFileSync(`./database/seris.json`))
  res.send(data)
})
app.get('/api/series/:id', async(req,res)=>{
  const id = req.params.id
  const info = JSON.parse(fs.readFileSync(`./database/post/${id}/index.json`))
  const episode = JSON.parse(fs.readFileSync(`./database/post/${id}/episode.json`))
  const obj = {}
  obj.info = info[0]
  obj.episode = episode.reverse()
  res.send(obj)
})
app.get('/api/home', async(req,res)=>{
   const datas = JSON.parse(fs.readFileSync(`./database/home.json`))
  let data = datas.reverse()
   res.send(data)
})
app.get('/add', async(req,res)=>{
  var id = req.query.id
  var url = req.query.url
  let status = false
   Object.keys(myHomepage).forEach((i) => {
    if (myHomepage[i].id === id) {
      status = true
    }
  })
  if (status === false) {
    console.log('Belum Ada Series')
  let e = await axios.get(base.server + 'api/oppa?url=' + url)
  let t = await axios.get(base.info + '/id/' + id);
  let drama = e.data
  let downurl = drama.download.url
  let info = t.data.data
  let d = await axios.get(`https://shurl.eu.org/api/safe?url=${downurl}`)
  let iniDownload = d.data.result
    console.log(iniDownload)
  func.createSeries(id)
  func.createHome(id, info, drama)
  func.createPost(id, info, drama, iniDownload)
  res.send({status: 200, message: "Sukses Bang!"})
    } else {
    console.log("Sudah Ada Series")
     let e = await axios.get(base.server + 'api/oppa?url=' + url)
  let t = await axios.get(base.info + '/id/' + id);
  let drama = e.data
  let info = t.data.data
  func.createHome(id, info, drama)
  func.addPost(id, info, drama)
res.send({status: 200, message: "Sukses Bang!"})
    }
})

app.use('*', async (req, res) => {
    res.status(404).send('404');
});
app.listen(80)