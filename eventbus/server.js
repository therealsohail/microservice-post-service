const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = 8005;

app.use(cors());
app.use(express.json());

let posts = {};
app.post("/events", async (req, res) => {
  let event = req.body;

  await axios.post("http://localhost:8000/events", event);
  await axios.post("http://localhost:8001/events", event);
  await axios.post("http://localhost:8002/events", event);

  res.send({
    message: "requests sent",
  });
});

app.listen(PORT, console.log(`Event bus running on ${PORT}`));
