const express = require("express");
const app = express();
const cors = require("cors");
const { randomBytes } = require("crypto");
const PORT = 8000;
const axios = require("axios");

app.use(cors());
app.use(express.json());
let posts = {};

//get all posts
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

//add a post
app.post("/post", async (req, res) => {
  let id = randomBytes(4).toString("hex");
  posts[id] = {
    id: id,
    title: req.body.title,
  };
  console.log(posts[id]);
  await axios.post("http://localhost:8005/events", {
    type: "post_created",
    id,
    title: req.body.title,
  });
  res.status(200).send(posts[id]);
});
app.post("/events", (req, res) => {
  console.log("Event received: " + req.body);
  res.send({});
});

app.listen(PORT, console.log(`Post service running at ${PORT}`));
