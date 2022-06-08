 require('dotenv').config();
 const app =require('./app')
const database =require('./database/db')
//port Number
 const port =process.env.PORT || 5000

// Handling uncaught Exception
  process.on("uncaughtException",(err) =>{
      console.log(`Error: ${err.message}`);
      console.log(`Shutting down the server for Handling uncaught Exception`);
  })


 // create server
 const server =app.listen(port, () => {
     console.log(`server is working on http://localhost:${port}/`);
 });


// Unhandled promise rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() =>{
        process.exit(1);
    });
});




