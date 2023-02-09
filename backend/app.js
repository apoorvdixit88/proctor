
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// const userData = [
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     testInvitationCode: 'ABC123'
//   },
//   {
//     id: 2,
//     name: 'Jane Doe',
//     email: 'jane.doe@example.com',
//     testInvitationCode: 'DEF456'
//   }
// ];

app.use(express.json({extended:false}))
app.use(cors())

app.post('/api/userdata', (req, res) => {
  // res.json(userData);
  console.log(req.body);
  const img = req.body.image;
  var base64Data = img.replace(/^data:image\/png;base64,/, "");
console.log(base64Data);
require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
  console.log(err);
});
  res.send('userData');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});












// --------------------------------------------------------------------DUMMY ABOVE


// const express = require('express');
// const User = require('./models/User');

// const app = express();

// app.use(express.json());

// app.post('/proctoring', async (req, res) => {
//   const { name, email, code } = req.body;
//   const user = new User({ name, email, code });
  
//   try {
//     await user.save();
//     res.send({ message: 'User information saved successfully' });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// app.listen(3001, () => {
//   console.log('Server listen on port 3000');
// });







// const express = require('express');
// const mongoose = require('mongoose');
// const proctoringRouter = require('./routes/proctoring');

// const app = express();

// mongoose.connect(
//   'mongodb://localhost:27017/proctoring-extension',
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (error) => {
//     if (error) {
//       console.error(error.message);
//       process.exit(1);
//     }
    
//     console.log('Connected to MongoDB.');
//   },
// );

// app.use(express.json());
// app.use('/proctoring', proctoringRouter);

// app.listen(3000, () => {
//   console.log('Server started on http://localhost:3000');
// });
