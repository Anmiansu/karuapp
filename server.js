import express from "express"; // modulo express para crear el servidor
import { pool } from "./db.js"; 

const app = express(); // creamos una instancia del modulo express

const PORT = 3000; // creamos la constante PORT para definir el puerto del servidor

// definimos la ruta raiz del servidor de tipo GET, que devuelve un mensaje de bienvenida al usuario
app.get("/", (req, res) => {
  res.send("Bienvenido a mi servidor express");
});

app.get("/api/platos", async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM platos ORDER BY id")
    res.json(rows)
})

// definimos la función para escuchar las solicitudes
app.listen(PORT, () => {
  console.log(`Puedes acceder al servidor en http://localhost:${PORT}`);
});
