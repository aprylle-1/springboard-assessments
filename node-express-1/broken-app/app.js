// const express = require('express');
// let axios = require('axios');
// var app = express();

// app.post('/', function(req, res, next) {
//   try {
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch {
//     next(err);
//   }
// });

// app.listen(3000);

const express = require('express');
const axios = require('axios');

const app = express()

app.use(express.json());

app.post('/', function(req, res, next){
  try{
    let results = []
    req.body.developers.forEach(d =>{
      let resp = axios.get(`https://api.github.com/users/${d}`)
      results.push(resp)
      })
    Promise.all(results).then(responses=>{
      let results = []
      /*Loops through all the responses and creates the object. Object created is then pushed to the results array*/
      for (let resp of responses){
        console.log(resp.data)
        results.push({name: resp.data.name, bio: resp.data.bio})
      }
      return res.send(results)
    })
  }
  catch(error){
    next(err)
  }
})

app.use((err, req, res, next)=>{
  return res.send(err)
})

app.listen(3000, ()=>{
  console.log(`App running on port 3000`)
})

