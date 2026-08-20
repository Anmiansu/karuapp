import express from "express"; // modulo express para crear el servidor
import { pool } from "./db.js"; 

const app = express(); // creamos una instancia del modulo express

app.use(express.json()); //parseamos el json de la solicitud a un objeto javascript

const PORT = 3000; // creamos la constante PORT para definir el puerto del servidor

// definimos la ruta raiz del servidor de tipo GET, que devuelve un mensaje de bienvenida al usuario
app.get("/", (req, res) => {
  res.send("Bienvenido a mi servidor express");
});

app.get("/api/platos", async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM platos ORDER BY id")
    res.json(rows)
})

app.post("/api/platos", async (req, res) => {
    const {nombre, precio} = req.body; //mediante destructuring obtenemos nombre y precio

    if (!nombre || !precio) {
        return res.status(400).json({error: "Bad Request - Datos Incorrectos"})
    }

    const { rows} = await pool.query("INSERT INTO platos (nombre, precio) VALUES ($1, $2) RETURNING *", [nombre, precio])
    res.status(201).json(rows[0]) //retornamos la primera fila de la insercion 
})

// definimos la función para escuchar las solicitudes
app.listen(PORT, () => {
  console.log(`Puedes acceder al servidor en http://localhost:${PORT}`);
});
