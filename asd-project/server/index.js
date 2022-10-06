const express = require ('express');
const cors = require ('cors');
const { Client } = require ('pg');

// Create a database client object with the credentials.
const db = new Client({
  user: "dunquhfohtsoge",
  password: "4a810e8f623bb4bc78942bed9d250144f3c46a5fa931d58422babe620cd62dc7",
  host: "ec2-99-81-68-240.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d1mbmm9l6o2l02",
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

// Admin Login route.
app.post('/api/admin-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM adminaccounts WHERE email = $1 AND password = $2";
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

// Add Card route.
app.post('/api/addCard', async (req, res) => {
  const { cardNum, cardName, user} = req.body;
  try {
    const query = "INSERT INTO cards (cardnumber, cardname, balance, email) VALUES ($1, $2, '0', $3)";
    await db.query(query, [cardNum, cardName, user]);
    res.json({ success: true });
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

//Get Accounts.
app.get('/api/accounts', async (req, res) => {
  try {
    const query = "SELECT * FROM accounts";
    const accounts = await db.query(query);
    res.json({ accounts: accounts.rows });
  }
  catch (err) {
    console.error(err);
    res.end();
  }
});

//Get all cards... temporary 
app.get('/api/getCards', async (req, res) => {
  try {
    const query = "SELECT * FROM cards";
    const cards = await db.query(query);
    res.json({ cards: cards.rows });
  }
  catch (err) {
    console.error(err);
    res.end();
  }
});

//Delete account route.
app.post('/api/delete-accounts', async (req, res) => {
  const {user} = req.body;
  try {
    const query = "DELETE FROM accounts where email = $1";
    const accounts = await db.query(query, [user]);
    res.json({ accounts: accounts.rows });
  }
  catch (err) {
    console.error(err);
    res.end();
  }
});

//Delete user cards route.
app.post('/api/delete-user-cards', async (req, res) => {
  const {user} = req.body;
  try {
    const query = "DELETE FROM cards where email = $1";
    const cards = await db.query(query, [user]);
    res.json({ cards: cards.rows });
  }
  catch (err) {
    console.error(err);
    res.end();
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

//allcards route
app.post('/api/allcards', async (req, res) => {
  try {
    const query = "SELECT * FROM cards";
    const cards = await db.query(query);
    res.json({ allcards: cards.rows});
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
  const { card, fromStation, toStation, price } = req.body;
  try {
    const balancequery = "SELECT balance FROM cards WHERE cardnumber = $1";
    const balances = await db.query(balancequery, [card]);
    const newBalance = balances.rows[0].balance - price;
    const query = "INSERT INTO cardtrips (cardnumber, fromstation, tostation, date_time, balance, price) VALUES ($1, $2, $3, timeofday(), $4, $5)";
    await db.query(query, [card, fromStation, toStation, newBalance, price]);
    const updatequery = "UPDATE cards SET balance = $1 WHERE cardnumber = $2";
    await db.query(updatequery, [newBalance, card]);
    res.json({ success: true });
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// GetPrice route.
app.post('/api/get-price', async (req, res) => {
  const { fromStation, toStation } = req.body;
  try {
    const query = "SELECT id FROM stations WHERE stationname = $1 OR stationname = $2";
    const ids = await db.query(query, [fromStation, toStation]);
    if (ids.rowCount == 2) {
      const distance = ids.rows[1].id - ids.rows[0].id;
      for (let i = rates.length - 1; i >= 0; i--) {
        if (rates[i].minDistance <= distance) {
          return res.json({ price: rates[i].rate });
        }
      }
    }
    else {
      res.json({ price: 0});
    }
    
  }
  catch (err) {
    console.error(err);
    res.end();
  }
});

// TripHistory route.
app.post('/api/trip-history', async (req, res) => {
  const { card } = req.body;
  try {
    const query = "SELECT cardnumber, fromstation, tostation, date_time, balance, price FROM cardtrips WHERE cardnumber = $1";
    const trips = await db.query(query, [card]);
    res.json({ trips: trips.rows });
  }
  catch (err) {
    console.error(err);
    res.end();
  }
});

// Lost-Stolen-Card route.
app.post('/api/loststolencard', async (req, res) => {
  const { card } = req.body;
  try {
    const query = "SELECT cardnumber FROM cards WHERE cardnumber = $1";
    const success = await db.query(query, [card]);
    res.json({ successs: success.rows });
  }
  catch (err) {
    console.error(err);
    res.end();
  }
});

// Update Password route.
app.post('/api/update-password', async (req, res) => {
  const { user, password } = req.body;
  try {
    const query = "UPDATE accounts SET password = $2 WHERE email = $1";
    await db.query(query, [user, password]);
    res.json({ success: true });
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// Deactivate route.
app.post('/api/deactivate-card', async (req, res) => {
  const {card} = req.body;
  try {
    const query = "UPDATE cards SET deactivated = true WHERE cardnumber = $1";
    await db.query(query, [card])
    res.json({ success: true });
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});
//Stolen Card route
app.post('/api/loststolen-card', async (req, res) => {
  const {card} = req.body;
  try {
    const query = "UPDATE cards SET lost = true WHERE cardnumber = $1";
    await db.query(query, [card])
    res.json({ success: true });
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// SaveTrip route.
app.post('/api/save-trip', async (req, res) => {
  const { card, fromStation, toStation} = req.body;
  try {
    const query = "INSERT INTO trips(cardnumber, fromstation, tostation, datetime) VALUES ($1, $2, $3, $4)";
    await db.query(query, [card, fromStation, toStation, new Date()]);
    res.json({ success: true });
  }
  catch (err) {
    console.error("err", err);
    res.json({ success: false });
  }
});

// SavedTrip route.
app.post('/api/saved-trip', async (req, res) => {
  const { card } = req.body;
  try {
    const query = "SELECT cardnumber, fromstation, tostation FROM trips WHERE cardnumber = $1";
    const saved = await db.query(query, [card]);
    res.json({ saved: saved.rows });
  }
  catch (err) {
    console.error(err);
    res.end();
  }
});

// Opal Card Fares July 2022.
const rates = [
  { minDistance: 0, rate: 3.79 },
  { minDistance: 10, rate: 4.71 },
  { minDistance: 20, rate: 5.42 },
  { minDistance: 35, rate: 7.24 },
  { minDistance: 65, rate: 9.31 }
]

app.listen(8000);