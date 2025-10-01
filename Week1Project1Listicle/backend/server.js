import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./data/db.js"; // import PostgreSQL pool

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend")));

// Route: homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Route: get all tracks
app.get("/tracks", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Tracks"');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Route: get a single track by ID (JSON)
app.get("/tracks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM "Tracks" WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Track not found");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Route: track page HTML
app.get("/track/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/tracks.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
