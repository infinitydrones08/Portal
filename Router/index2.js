// const express=require('express')
// const router=express.Router();
// // server.js
// const bodyParser = require("body-parser");
// const cookieParser = require('cookie-parser')

// //const { generateUploadURL } = require('C:\Users\suhana\Desktop\Infinity-Drones-Pilot-Portal-main\s3.js');
// const controller2=require('../s3.js')


// //const jwt=require("jsonwebtoken");
// router.use(express.static('front'));
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));






// router.post('/insertnewprofile', async (req, res) => {
//   const file = req.body.file; 
  
//   const { url } = await controller2.generateUploadURL();
//   console.log(url);

  
//   await fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": file.type 
//     },
//     body: file
//   });

  
//   res.redirect('/profile');
// });






// router.get('/profile', (req, res) => {
  
//   const imageUrl = "";

  
//   res.render(path.join(__dirname, 'views', 'profile.ejs'), { imageUrl });
// });
// module.exports=router;




// router.get('/insertnewprofile', async (req, res) => {
//     try {
      
//       const email = req.cookies.email;
  
      
//       const { url } = await generateUploadURL(); 
  
      
//       res.render('insertnewprofile', { url, email });
//     } catch (err) {
//       console.error('An error occurred:', err);
//       res.status(500).send('An error occurred');
//     }
//   });
  
// module.exports=router;
// // Start the server
// //app.listen(8080, () => console.log("listening on port 8080"));
