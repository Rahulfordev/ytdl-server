const express = require("express");
const ytdl = require("@distube/ytdl-core");
const app = express();

app.use(express.json());

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).json({ error: "Invalid or missing YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(videoURL, {
      requestOptions: {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      },
    });

    const title = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, "_");
    res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);

    ytdl(videoURL, { format: "mp4" }).pipe(res);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to download video" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
