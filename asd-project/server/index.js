const express = require ('express');
const cors = require ('cors');
const { Client } = require ('pg');

// Create a database client object with the credentials.
const db = new Client({
  user: "uqjuvgsfwzolla",
  password: "d0af2ee08b80c516f1a9499f8b485aacf7d15b31dfbc2fe91bc4b50696f5dcfd",
  host: "ec2-99-81-16-126.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "ddds5c3o6shtq6",
  ssl: { rejectUnauthorized: false }
});

// Connect to the database.
db.connect();

// Create a server.
const app = express();

// Just trust me bro. Use this.
app.use(cors());
app.use(express.json());

// Login route.
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM accounts WHERE email = $1 AND password = $2";
    const response = await db.query(query, [email, password]);
    res.json({ authenticated: response.rowCount > 0 });
  }
  catch (err) {
    console.error(err);
    res.json({ authenticated: false });
  }
});

// Register route.
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "INSERT INTO accounts (email, password) VALUES ($1, $2)";
    await db.query(query, [email, password]);
    res.json({ success: true });
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// Cards route.
app.post('/api/cards', async (req, res) => {
  const { user } = req.body;
  try {
    const query = "SELECT * FROM cards WHERE email = $1";
    const cards = await db.query(query, [user]);
    res.json({ cards: cards.rows });
  }
  catch (err) {
    console.error(err);
    res.end();
  }
});

// Stations route.
app.get('/api/stations', async (req, res) => {
  try {
    const query = "SELECT * FROM stations";
    const stations = await db.query(query);
    res.json({ stations: stations.rows });
  }
  catch (err) {
    console.error(err);
    res.end();
  }
});

// RecordTrip route.
app.post('/api/record-trip', async (req, res) => {
  const { card, fromStation, toStation } = req.body;
  try {
    const query = "INSERT INTO cardtrips (cardnumber, fromstation, tostation, date_time) VALUES ($1, $2, $3, timeofday())";
    await db.query(query, [card, fromStation, toStation]);
    res.json({ success: true });
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});


app.listen(8000);