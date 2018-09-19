const express = require('express');
const records = require('./records');

const app = express();

app.use(express.json()); 

//////////// HELPER  FUNCTIONS
function asyncHandler(middleware){
  return async (req, res, next)=>{
    try {
      await middleware(req,res, next);
    } catch(err){
      next(err);
    }
  };
}

// async function confirmCatExists(req, res, next){
//   try {
//     const cat = await records.getOne(req.params.id);
//     if(!cat){
//       res.status(404).json({error: "Cat Not Found"});
//     } else {
//       req.cat = cat; 
//     }
//   } catch(err{
//     next(err);
//   }
// }

/////////////////// GET all cats 
// 1 
const cats = [
  {
    id: 0,
    name: "Captain Sharpwhiskers",
    type: "American Shorthair",
    age: 9,
    votes: 0 
  },
  {
    id: 1,
    name: "Rascal",
    type: "American Shorthair",
    age: 7,
    votes: 0
  },
  {
    id: 2,
    name: "Mr. Bigface",
    type: "black",
    age: 3,
    votes: 0
  },
];
 
// app.get('/cats', (req, res) =>{
//   res.json(cats);
// });

//2 
// app.get('/cats', (req, res) =>{
//   const cats = records.getAllCats();
//   res.json(cats);
// });

//3
// app.get('/cats', async (req, res) =>{
//   const cats = await records.getAllCats();
//   res.json(cats);
// });

//4
// app.get('/cats', async (req, res, next) =>{
//   try {
//     const cats = await records.getAllCats();
//     res.json(cats);
//   } catch(err){
//     next(err);
//   }
// });

app.get('/cats', asyncHandler(async (req, res) =>{
    const cats = await records.getAll();
    res.json(cats);
}));

//////// GET one cat ////////////

app.get('/cats/:id', (req, res) => {
  const cat = cats.find(cat => cat.id == req.params.id);
  res.json(cat);
});
//1
// app.get('/cats/:id', (req, res) => {
//   const cat = records.getOne(req.params.id);
//   res.json(cat);
// });

//2 Async 
// app.get('/cats/:id', async (req, res) => {
//   const cat = await records.getOne(req.params.id);
//   res.json(cat);
// });

// //3 Async try/catch
// app.get('/cats', async (req, res, next) =>{
//   try {
//     const cat = await records.getOne(req.params.id);
  
//     if(!cat){
//       res.status(404).res.json({"error": "Cat not found!"})
//     } else {
//       res.json(cat);
//     }
//   } catch(err){
//     next(err);
//   } 
// });

// //4 With async handler 
// app.get('/cats/:id', asyncHandler(async (req, res) => {
//   const cat = await records.getOne(req.params.id);

//   if(!cat){
//     res.status(404).res.json({"error": "Cat not found!"})
//   } else {
//     res.json(cat);
//   }
// }));




app.listen(3000, () => console.log('Example app listening on port 3000!'));