const express = require("express");
const ytdl = require("@distube/ytdl-core");
const app = express();

app.use(express.json());

app.get("/download", async (req, res) => {
  res.send("hello");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
