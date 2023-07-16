import express from 'express';
import path from 'path';
import mysql from 'mysql';

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'accounts',
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Eroare la obținerea conexiunii din pool:', err);
  } else {
    console.log('Conectat la baza de date!');
    connection.release(); // Eliberare conexiune înapoi în pool
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const { firstName, email, password } = req.body;

  const sql = 'INSERT INTO utilizatori (nume, email, parola) VALUES (?, ?, ?)';
  const values = [firstName, email, password];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Eroare la obținerea conexiunii din pool:', err);
      res.status(500).json({ success: false, message: 'A apărut o eroare la înregistrare.' });
      return;
    }

    connection.query(sql, values, (err, result) => {
      connection.release(); // Eliberare conexiune înapoi în pool

      if (err) {
        console.error('Eroare la înregistrarea utilizatorului:', err);
        res.status(500).json({ success: false, message: 'A apărut o eroare la înregistrare.' });
      } else {
        console.log('Utilizatorul a fost înregistrat cu succes!');
        res.json({ success: true, message: 'Înregistrare realizată cu succes!' });
      }
    });
  });
});

// Obține calea către directorul curent (directoriul în care se află server.js)
const currentDir = path.resolve();

// Calea către directorul "build" în funcție de locația server.js
const buildDir = path.join(currentDir, '../build');

// Serve static files from the 'build' directory
app.use(express.static(buildDir));
// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
