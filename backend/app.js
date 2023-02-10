const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const path = require("path");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const User = require("./models/user");
const { uploadFile } = require("./s3");
const Image = require("./models/image");

require("./db");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

app.post("/api/userdata", async (req, res) => {
  // res.json(userData);
  const { name, email, code } = req.body;
  const user = new User({ name, email, code });
  await user.save();
  // console.log(userData)
  // const img = req.body.image;
  // var base64Data = img.replace(/^data:image\/png;base64,/, "");
  // console.log(base64Data);
  // require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
  //   console.log(err);
  // });
  res.send(user);
});

app.post("/api/userimage", async (req, res) => {
  // console.log(req.body);
  // console.log(req.body.image);
  const { image, id } = req.body;
  const user = await User.findById(id);
  if (!user) res.status(400).send("Invalid user.");

  var base64Data = image.replace(/^data:image\/png;base64,/, "");
  require("fs").writeFile(
    "out.png",
    base64Data,
    "base64",
    async function (err) {
      if (!err) {
        const result = await uploadFile("out.png");
        await unlinkFile("out.png");
        const image = new Image({ url: result.Location });
        await image.save();
        user.images.unshift(image._id);
        await user.save();
      }
    }
  );

  res.send("img");
});

app.get("/api/getUser/:id", async (req, res) => {
  const email = req.params.id;
  console.log("r");
  try {
    const user = await User.findOne({ email }).populate("images").exec();
    console.log(user);
    // console.log(user);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }
});

app.get("/api/getAll", async (req, res) => {
  const email = req.params.id;
  console.log("r");
  try {
    const user = await User.find().populate("images").exec();
    console.log(user);
    // console.log(user);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
