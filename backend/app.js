const express = require('express');
const User = require('./models/User');

const app = express();

app.use(express.json());

app.post('/proctoring', async (req, res) => {
  const { name, email, code } = req.body;
  const user = new User({ name, email, code });
  
  try {
    await user.save();
    res.send({ message: 'User information saved successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server listen on port 3000');
});







const express = require('express');
const mongoose = require('mongoose');
const proctoringRouter = require('./routes/proctoring');

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/proctoring-extension',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.error(error.message);
      process.exit(1);
    }
    
    console.log('Connected to MongoDB.');
  },
);

app.use(express.json());
app.use('/proctoring', proctoringRouter);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
