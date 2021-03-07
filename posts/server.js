const express = require("express");
const app = express();
const cors = require("cors");
const { randomBytes } = require("crypto");
const PORT = 8000;

app.use(cors());
app.use(express.json());
let posts = {};

//get all posts
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

//add a post
app.post("/post", (req, res) => {
  let id = randomBytes(4).toString("hex");
  console.log(id);
  posts[id] = {
    id: id,
    title: req.body.title,
  };
  res.status(200).send(posts[id]);
});

app.listen(PORT, console.log(`Server running at ${PORT}`));
