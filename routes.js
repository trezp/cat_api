const express = require('express');

const router = express.Router();
const records = require('./records');


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

// async function confirmQuoteExists(req, res, next){
//   try {
//     const quote = await records.getOne(req.params.id);
//     if(!quote){
//       res.status(404).json({error: "Quote Not Found"});
//     } else {
//       req.quote = quote; 
//     }
//   } catch(err{
//     next(err);
//   }
// }

/////////////////// GET all quotes 
// 1. data in same file
// const quotes = [
//   {
//     id: 0,
//     quote: "A better quote will go here eventually 1",
//     author: "Author 1",
//     year: 3912
//   },
//   {
//     id: 1,
//     quote: "A better quote will go here eventually 2",
//     author: "Author 2",
//     year: 999
//   },
//   {
//     id: 2,
//     quote: "A better quote will go here eventually 3",
//     author: "Author 3",
//     year: 9999
//   },
// ];
 
// app.get('/api/quotes', (req, res) =>{
//   res.json(quotes);
// });

// 2 After records module is introduced
// app.get('/api/quotes', (req, res) =>{
//   const quotes = records.getAll();
//   res.json(quotes);
// });

// 3 After async is introduced
// app.get('/api/quotes', async (req, res) =>{
//   const quotes = await records.getAll();
//   res.json(quotes);
// });

// 4 After error handling is introduced
// app.get('/cats', async (req, res, next) =>{
//   try {
//     const quotes = await records.getAll();
//     res.json(quotes);
//   } catch(err){
//     next(err);
//   }
// });
// 5 After middleware is introduced
router.get('/', asyncHandler(async (req, res) =>{
  const quotes = await records.getAll();
  res.json(quotes);
}));

//////// GET one cat ////////////
// 1
// app.get('api/quotes/:id', (req, res) => {
//   const quote = quotes.find(quote => quote.id == req.params.id);
//   res.json(quote);
// });

//2 
// app.get('api/quotes/:id', (req, res) => {
//   let quote;
//   setTimeout( ()=>{
//     quote = records.getOne(req.params.id);
//   }, 1000);
//   console.log(quote)
//   res.json(quote);
// });

//2 Async 
// app.get('/api/quotes/:id', async (req, res) => {
//   const quote = await records.getOne(req.params.id);
//   res.json(quote);
// });

// 3 Async try/catch
// app.get('/api/quotes', async (req, res, next) =>{
//   try {
//     const quote = await records.getOne(req.params.id);
  
//     if(!quote){
//       res.status(404).res.json({"error": "Quote not found!"})
//     } else {
//       res.json(quote);
//     }
//   } catch(err){
//     next(err);
//   } 
// });

//4 With async handler 
router.get('/:id', asyncHandler(async (req, res) => {
  const quote = await records.getOne(req.params.id);

  if(!quote){
    res.status(404).res.json({"error": "Quote not found!"})
  } else {
    res.json(quote);
  }
}));

// //GET random quote
router.get('/random', async(req, res, next)=>{
  try {
    const quotes = await records.getAll();
    const quote = await records.getRandom(quotes);
    res.json(quote);
  } catch(err){
    next(err);
  }
});

// POST new quote
router.post('/', async(req,res, next)=>{
  try {
    const quote = await records.create(req.body);
    res.status(201).json(quote);
  } catch(err){
    next(err);
  }
});

// Edit quote
router.put('/:id', async(req,res, next)=>{
  try {
    const quote = await records.getOne(req.params.id);
    await records.edit(quote, req.body);
    res.status(204).end();
  } catch(err){
    next(err);
  }
});

// DELETE quote
router.delete('/:id', async(req,res, next)=>{
  try {
    const quote = await records.getOne(req.params.id);
    await records.deleteRecord(quote);
    res.status(204).end();
  } catch(err){
    next(err);
  }
});

module.exports = router;