// Importuri pentru modulele necesare
import express from "express";
import path from "path";
import mysql from "mysql";
import cors from "cors";

// Crearea unei instanțe Express
const app = express();

// Specificarea portului pe care serverul va asculta
const port = 1024;

// Crearea unui pool de conexiuni MySQL pentru a gestiona conexiunile la baza de date
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "accounts",
});

// Obținerea unei conexiuni din pool pentru verificare
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Eroare la obținerea conexiunii din pool:", err);
  } else {
    console.log("Conectat la baza de date!");
    connection.release();
  }
});

// Middleware pentru gestionarea cererilor CORS
app.use(cors());

// Middleware pentru a interpreta cererile JSON
app.use(express.json());

// Middleware pentru a interpreta datele din formularele HTML
app.use(express.urlencoded({ extended: true }));

// Ruta pentru obținerea datelor de profil a unui utilizator bazat pe ID
app.get("/profile/:id", (req, res) => {
  const userId = req.params.id;
  pool.query(
    "SELECT id, username, email, nume, prenume, gen, data_nasterii, tara, strada, numar, suplimentar FROM utilizatori WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Error getting user profile data:", err);
        res.status(500).json({
          success: false,
          message: "A apărut o eroare la obținerea datelor de profil.",
        });
      } else {
        if (result.length === 0) {
          console.log("User profile not found.");
          res
            .status(404)
            .json({ success: false, message: "Utilizatorul nu a fost găsit." });
        } else {
          const userProfileData = result[0];
          res.json({
            success: true,
            data: userProfileData,
          });
        }
      }
    }
  );
});

// Ruta pentru înregistrarea unui utilizator
app.post("/register", (req, res) => {
  const { firstName, email, password } = req.body;
  console.log("Register route accessed with data:", {
    firstName,
    email,
    password,
  });
  const checkUserQuery =
    "SELECT COUNT(*) AS count FROM utilizatori WHERE email = ? OR username = ?";
  const checkUserValues = [email, firstName];

  // Obținerea unei conexiuni din pool pentru verificare și înregistrare
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Eroare la obținerea conexiunii din pool:", err);
      res.status(500).json({
        success: false,
        message: "A apărut o eroare la înregistrare.",
      });
      return;
    }

    // Verificarea dacă există deja un utilizator cu aceeași adresă de email sau nume de utilizator
    connection.query(checkUserQuery, checkUserValues, (err, result) => {
      if (err) {
        console.error("Eroare la verificarea utilizatorului:", err);
        res.status(500).json({
          success: false,
          message: "A apărut o eroare la înregistrare.",
        });
        connection.release();
        return;
      }

      if (result[0].count > 0) {
        console.log(
          "Adresa de email sau numele de utilizator există deja în baza de date."
        );
        res.json({
          success: false,
          message:
            "Adresa de email sau numele de utilizator există deja în baza de date.",
        });
      } else {
        console.log("Login query result:", result);

        // Înserarea utilizatorului în baza de date
        const insertUserQuery =
          "INSERT INTO utilizatori (username, email, parola) VALUES (?, ?, ?)";
        const insertUserValues = [firstName, email, password];

        connection.query(insertUserQuery, insertUserValues, (err, result) => {
          connection.release();

          if (err) {
            console.error("Eroare la obținerea datelor de profil:", err);
            res.status(500).json({
              success: false,
              message: "A apărut o eroare la obținerea datelor de profil.",
              error: err.message, // sau altă proprietate relevantă din obiectul de eroare
            });
          } else {
            console.log("Utilizatorul a fost înregistrat cu succes!");
            res.json({
              success: true,
              message: "Înregistrare realizată cu succes!",
            });
          }
        });
      }
    });
  });
});

// Ruta pentru autentificarea unui utilizator
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login route accessed with data:", { email, password });
  const checkUserQuery =
    "SELECT COUNT(*) AS count FROM utilizatori WHERE email = ? AND parola = ?";
  const checkUserValues = [email, password];

  // Obținerea unei conexiuni din pool pentru autentificare
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Eroare la obținerea conexiunii din pool:", err);
      res.status(500).json({
        success: false,
        message: "A apărut o eroare la autentificare.",
      });
      return;
    }

    // Verificarea existenței utilizatorului în baza de date
    connection.query(checkUserQuery, checkUserValues, (err, result) => {
      connection.release();

      if (err) {
        console.error("Eroare la autentificare:", err);
        res.status(500).json({
          success: false,
          message: "A apărut o eroare la autentificare.",
        });
        return;
      }

      if (result[0].count > 0) {
        const getUserDataQuery =
          "SELECT id, username, email FROM utilizatori WHERE email = ? AND parola = ?";
        const getUserDataValues = [email, password];

        // Obținerea datelor utilizatorului autentificat
        connection.query(
          getUserDataQuery,
          getUserDataValues,
          (err, userDataResult) => {
            if (err) {
              console.error("Eroare la obținerea datelor utilizatorului:", err);
              res.status(500).json({
                success: false,
                message: "A apărut o eroare la autentificare.",
              });
              return;
            }
            if (userDataResult.length === 0) {
              console.error("Utilizatorul nu a fost găsit în baza de date.");
              res.status(404).json({
                success: false,
                message: "Utilizatorul nu a fost găsit.",
              });
            } else {
              const userData = userDataResult[0];
              res.json({
                success: true,
                message: "Autentificare reușită!",
                user: userData,
              });
            }
          }
        );
      } else {
        console.log("Registration query result:", result);
        res.json({
          success: false,
          message: "Email sau parolă greșită sau utilizatorul nu există.",
        });
      }
    });
  });
});

// Obținerea directorului curent
const currentDir = path.resolve();

// Specificarea directorului de construire pentru fișiere statice
const buildDir = path.join(currentDir, "../build");

// Servirea fișierelor statice din directorul de construire
app.use(express.static(buildDir));

// Ruta pentru gestionarea tuturor celorlalte cereri, returnând fișierul index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(buildDir, "index.html"));
});

// Pornirea serverului la portul specificat
app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});

// Ruta pentru actualizarea datelor de profil a unui utilizator bazat pe ID
app.put("/profile/:id", (req, res) => {
  const userId = req.params.id;
  const updatedProfileData = req.body;

  pool.query(
    "UPDATE utilizatori SET username = ?, email = ?, nume = ?, prenume = ?, gen = ?, data_nasterii = ?, tara = ?, strada = ?, numar = ?, suplimentar = ? WHERE id = ?",
    [
      updatedProfileData.username,
      updatedProfileData.email,
      updatedProfileData.nume,
      updatedProfileData.prenume,
      updatedProfileData.gen,
      updatedProfileData.data_nasterii,
      updatedProfileData.tara,
      updatedProfileData.strada,
      updatedProfileData.numar,
      updatedProfileData.suplimentar,
      userId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating user profile data:", err);
        res.status(500).json({
          success: false,
          message: "A apărut o eroare la actualizarea datelor de profil.",
        });
      } else {
        console.log("User profile updated successfully.");
        res.json({
          success: true,
          message: "Datele de profil au fost actualizate cu succes!",
        });
      }
    }
  );
});
