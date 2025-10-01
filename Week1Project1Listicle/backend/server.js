import express from "express"
import tracks from "./data/data.js"
import cors from "cors";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const PORT = 3000;
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend")));

// Route: homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Route: get all tracks
app.get("/tracks", (req, res) => {
  res.json(tracks);
});

app.get("/tracks/:id", (req, res) => {
    const {id} = req.params;
    const track = tracks.find((track) => {return track.id==id})
    res.json(track);
})

app.get("/track/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/tracks.html"));
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});