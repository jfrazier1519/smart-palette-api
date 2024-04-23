const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const imageController = require("./src/controllers/image");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/palette", (req, res) => {
  imageController.handleAPICall(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
