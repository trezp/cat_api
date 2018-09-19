const fs = require('fs');
const data = require('./data.json');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

function save(){
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function getAll(){
  return data.cats;
}

async function getOne(id){
  return data.cats.find(cat => cat.id == id);
}

async function create(body) {
  const record = {
    id: generateRandomId(),
    name: body.name,
    type: body.type,
    age: body.age,
    votes: 0 
  }
  data.cats.push(record);
  await save(); 
  return record; 
}

async function edit(record, body){
  record.name = body.name;
  record.type = body.type;
  record.age = body.age;
  return save();
}

async function deleteOne(record){
  data.cats = data.cats.filter(cat => cat.id != record.id);
  return save();
}

async function voteUp(answer){
  answer.votes += 1; 
  return save();
}

async function voteDown(answer){
  answer.votes -= 1; 
  return save();
}



module.exports = {
  getAll,
  getOne, 
  create, 
  edit, 
  deleteOne,
  voteUp,
  voteDown,
}
