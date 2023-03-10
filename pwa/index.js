const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(8000, () => console.log("Server is running on Port 8000"));

//require ('sqlite3');
const db = new sqlite3.Database("db.sqlite", (err) => {
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
  `CREATE TABLE Preguntas (id INTEGER PRIMARY KEY AUTOINCREMENT, clave text , pregunta text, respuesta_u integer)`,
  (err) => {
    if (err) {
      // console.log(err)
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