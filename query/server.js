const express = require("express");
const app = express();
const cors = require("cors");
// const { randomBytes } = require("crypto");/
const PORT = 8002;

app.use(cors());
app.use(express.json());
let posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  let event = req.body;
  console.log("Event received: " + event);
  if (event["type"] === "post_created") {
    let { id, title } = event;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (event["type"] === "comment_created") {
    let { id, content, postId } = event;
    let commentArray = posts[postId].comments;
    commentArray.push({
      id,
      content,
    });
    posts[postId].comments = commentArray;
  }
  console.log(posts);
  res.send({});
});

app.listen(PORT, console.log(`Query service running at ${PORT}`));
