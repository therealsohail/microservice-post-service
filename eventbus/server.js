const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = 8005;

app.use(cors());
app.use(express.json());

let posts = {};
app.post("/events", async (req, res) => {
  try {
    let event = req.body;
    console.log("here");
    await axios.post("http://post-service:8000/events", event);
    await axios.post("http://comment-service:8001/events", event);
    await axios.post("http://query-service:8002/events", event);

    res.send({
      message: "requests sent",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, console.log(`Event bus running on ${PORT}`));
