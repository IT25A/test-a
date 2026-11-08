const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
//const cors = require("cors");

// The database file lives in a volume (see app.it25a.yml), so it survives updates.
const dbPath = process.env.DB_PATH ?? "/data/entries.db";
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new DatabaseSync(dbPath);
db.exec(`CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);

const app = express();
const port = 3001;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/greeting", (_, res) => {
  res.json({ message: "Hello, welcome to the app!" });
});

app.post("/form", (req, res) => {
  const { name, email } = req.body;
  db.prepare("INSERT INTO entries (name, email) VALUES (?, ?)").run(String(name ?? ""), String(email ?? ""));
  res.json({ message: `Saved: Name - ${name}, Email - ${email}` });
});

// Newest first.
app.get("/entries", (_, res) => {
  res.json(db.prepare("SELECT id, name, email, created_at FROM entries ORDER BY id DESC LIMIT 100").all());
});

app.get("/headers", (req, res) => {
  const name = req.get("It25a-Name");
  res.json({
    user: req.get("It25a-User") ?? null,
    name: name ? decodeURIComponent(name) : null, // the name is URL-encoded
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});