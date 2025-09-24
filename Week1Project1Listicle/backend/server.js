import express from "express"
import tracks from "./data/data.js"
import cors from "cors";
const app = express()

const PORT = 3000;

app.use(cors());

// Route: homepage
app.get("/", (req, res) => {
  res.send("Welcome to My Phonk Playlist API 🎵");
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});