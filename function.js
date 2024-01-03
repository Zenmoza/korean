const path = require('path');
const fs = require('fs');
const _post = JSON.parse(fs.readFileSync('./database/index.json'));
const post = JSON.parse(fs.readFileSync('./database/home.json'));
const _series = JSON.parse(fs.readFileSync('./database/series.json'))
const _episode = JSON.parse(fs.readFileSync('./database/episode.json'))
const seris = JSON.parse(fs.readFileSync('./database/seris.json'))
const createSeries = (id) => {
  const obj = {}
  obj.id = id
  seris.push(obj)
  fs.writeFileSync(`./database/seris.json`, JSON.stringify(seris))
  return 200
}
const createHome = (id, info, drama) => {
  const obj = {}
   obj.id = id
   obj.title = drama.title
   obj.thumb = info.poster
   obj.episode = drama.episode
   obj.rating = info.details.score
   let country = info.details.country
    let negara = ''
    if(country === 'China'){
      negara += 'China'
    } 
    if(country === 'South Korea'){
      negara += 'Korea'
    }
    if(country === 'Indonesia'){
      negara += 'Indonesia'
    }
    if(country === 'Jepang'){
      negara += 'Jepang'
    }
obj.negara = negara
  post.push(obj)
  fs.writeFileSync('./database/home.json', JSON.stringify(post))
   return 200
}
const addPost = (id, info, drama) => {
   const obj = {}
  const eps = {}
   obj.title = info.title
obj.thumb = info.poster
obj.sinopsis = drama.sinopsis
obj.details = info.details
let country = info.details.country
let episode = drama.episode
obj.type = info.details.type
obj.episode = drama.episode
obj.duration = info.details.duration
obj.score = info.details.score
obj.titleku = drama.title
obj.stream = drama.stream
obj.list = drama.list
obj.next = drama.next
obj.download_name = drama.download.nama
obj.download_kualitas = drama.download.kualitas
obj.download_url = drama.download.url
let negara = ''
if(country === 'China'){
  negara += 'China'
} 
if(country === 'South Korea'){
  negara += 'Korea'
}
if(country === 'Indonesia'){
  negara += 'Indonesia'
}
if(country === 'Japan'){
  negara += 'Jepang'
}
obj.negara = negara
eps.episode = drama.episode
const _myEpisode = JSON.parse(fs.readFileSync(`./database/post/${id}/episode.json`))
   _post.push(obj)
  _myEpisode.push(eps)
   fs.writeFileSync(`./database/post/${id}/episode.json`, JSON.stringify(_myEpisode))
   fs.writeFileSync(`./database/post/${id}/${episode}.json`, JSON.stringify(_post))
  
  return 200
}
const createPost = (id, info, drama, iniDownload) => {
  const ser = {}
  const eps = {}
  ser.title = info.title
ser.title = info.title
ser.thumb = info.poster
ser.sinopsis = drama.sinopsis
ser.details = info.details
ser.type = info.details.type
ser.episodes = info.details.episodes
ser.duration = info.details.duration
ser.score = info.details.score
  const obj = {}
   obj.title = info.title
obj.thumb = info.poster
obj.sinopsis = info.synopsis
obj.details = info.details
let country = info.details.country
let episode = drama.episode
obj.type = info.details.type
obj.episode = drama.episode
obj.duration = info.details.duration
obj.score = info.details.score
obj.titleku = drama.title
obj.stream = drama.stream
obj.list = drama.list
obj.next = drama.next
obj.download_name = drama.download.nama
obj.download_kualitas = drama.download.kualitas
obj.download_url = iniDownload
let negara = ''
if(country === 'China'){
  negara += 'China'
} 
if(country === 'South Korea'){
  negara += 'Korea'
}
if(country === 'Indonesia'){
  negara += 'Indonesia'
}
if(country === 'Japan'){
  negara += 'Jepang'
}
ser.negara = negara
obj.negara = negara
   eps.episode = drama.episode
  _episode.push(eps)
  _series.push(ser)
  _post.push(obj)
  fs.mkdirSync(`./database/post/${id}`)
  fs.writeFileSync(`./database/post/${id}/index.json`, JSON.stringify(_series))
   fs.writeFileSync(`./database/post/${id}/episode.json`, JSON.stringify(_episode))
  fs.writeFileSync(`./database/post/${id}/${episode}.json`, JSON.stringify(_post))
  

};


module.exports = {
  createSeries,
  createHome,
  addPost,
  createPost
}