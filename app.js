const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore'); // No need to import FieldValue anymore

// Initialize Firebase Admin SDK
const serviceAccount = require('./key.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  console.log("Request received at / (signup)");
  res.render('signup');
});

app.get('/login', (req, res) => {
  console.log("Request received at /login");
  res.render('login');
});

app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Create a user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Save user details in Firestore without createdAt field
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
    });
    res.render("output");
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user.');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate user using Firebase Authentication Admin SDK
    const userRecord = await admin.auth().getUserByEmail(email);

    if (userRecord) {
      const userRef = db.collection('users').doc(userRecord.uid);
      const doc = await userRef.get();

      if (doc.exists) {
        res.render('output');
      } else {
        res.status(401).send('User not found in Firestore.');
      }
    } else {
      res.status(401).send('Authentication failed.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in.');
  }
});


app.get('/movie', (req, res) => {
    res.render('movie', { apiKey: '55c60744' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
