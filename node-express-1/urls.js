const axios = require('axios')
const { createCipheriv } = require('crypto')
const fs = require('fs')
const process = require('process')


function writeUrls(path){
    fs.readFile(path, 'utf8', (err, data)=>{
        const urls = data.split('\n')
        for (let url of urls){
            try{
                axios.get(url)
                .then(resp=>{
                    let hostname = url.split("/")[2]
                    fs.writeFile(`${hostname}.txt`, resp.data, {flag : "a", encoding: "utf8"}, err=>{
                        if(err){
                            console.log(err)
                        }
                        console.log(`Wrote to ${hostname}`)
                    })
                })
                .catch((err)=>{
                    console.log(`Couldn't download ${url}`)
                })
            }
            catch(err){
                console.log(err)
            }
        }
    })
}

writeUrls(process.argv[2])