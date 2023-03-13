const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const sqlite = require ('sqlite3').verbose();

app.use(express.static(path.join(__dirname, "public")));

app.listen(8000, () => console.log("Server is running on Port 8000"));


const db = new sqlite.Database("db.sqlite3", (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
  }
});

var preguntas = [
  {   
      clave:"R",
      pregunta:"De tipo práctico que impliquen la manipulación de herramientas, instrumentos, máquinas y equipo",
      respuesta_u:0
  },
  {
      clave: 'I',
      pregunta:'De tipo científico tales como, elaboración de proyectos de investigación, lectura de revistas especializadas, resolución de problemas de las ciencias puras (física, biología, química o matemática)',
      respuesta_u:0
  }

];

db.run(
  `CREATE TABLE IF NOT EXISTS Preguntas (id INTEGER PRIMARY KEY AUTOINCREMENT, clave TEXT , pregunta TEXT, respuesta_u INTEGER)`,
  (err) => {
    if (err) {
      console.log(err + 'Ya existe');
      // Table already created
    } else {
      // Table just created, creating some rows
      var insert = "INSERT INTO Preguntas (clave, pregunta, respuesta_u) VALUES (?,?,?)";
      preguntas.map((pregunta) => {
        db.run(insert, [
          `${pregunta.clave}`,
          `${pregunta.pregunta}`,
          `${pregunta.respuesta_u}`,
        ]);
      });
    }
  }
);

//ENRUTAMIENTO
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/perfil", function (req, res) {
  res.sendFile(path.join(__dirname, "public/perfil.html"));
});