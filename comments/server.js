const express = require("express");
const app = express();
const cors = require("cors");
const { randomBytes } = require("crypto");
const PORT = 8001;
const axios = require("axios");

app.use(cors());
app.use(express.json());
let commentsByPostId = {
  //   123: {
  //     id: "712631726",
  //     content: "Nice post.",
  //   },
};

//get all coments associated with post
app.get("/posts/:id/comments", (req, res) => {
  let id = req.params.id;
  let comments = commentsByPostId[id] || [];
  res.status(200).json(comments);
});

//add a comment associated with post
app.post("/posts/:id/comments", async (req, res) => {
  let id = req.params.id;
  let commentId = randomBytes(4).toString("hex");
  let commentsArray = commentsByPostId[id] || [];
  commentsArray.push({
    id: commentId,
    content: req.body.content,
    status: "pending",
  });
  commentsByPostId[id] = commentsArray;
  await axios.post("http://eventbus-service:8005/events", {
    type: "comment_created",
    id: commentId,
    content: req.body.content,
    postId: id,
    status: "pending  ",
  });
  res.status(200).json(commentsArray);
});

app.post("/events", (req, res) => {
  console.log("Event received: " + req.body);
  res.send({});
});

app.listen(PORT, console.log(`Comments service running at ${PORT}`));
