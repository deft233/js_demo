const fs = require('fs');
const { resolve } = require('path');
// fs.readFile('../resourse/content.txt',function(err,data){
//     if(err) throw err;
//     console.log(data.toString())
// }) 
const p = new Promise((resolve,reject)=>{
    fs.readFile('../resourse/cont1ent.txt',function(err,data){
        if(err) reject(err);
        else resolve(data);
    }) 
})
p.then(value=>{
    console.log(value.toString())
},reason=>{
    console.log(reason);
})
