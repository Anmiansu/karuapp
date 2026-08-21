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

app.put("/api/platos/:id", async (req, res) => {
    const { id } = req.params;
    const {nombre, precio} = req.body;

    //verificamos si existen los datos
    if (!nombre || !precio) {
        return res.status(400).json({error: "Bad Request - Datos Incorrectos"})
    }

    //realizamos la consulta, si devuelve un array 
    const { rows } = await pool.query("UPDATE platos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *", [nombre, precio, id])
    if (rows.length === 0) {
        return res.status(404).json({error: "Plato no encontrado"})
    }

    res.json(rows[0])

})

app.delete("/api/platos/:id", async (req, res) => {
    const { id } = req.params;

    const { rows } = await pool.query("DELETE FROM platos WHERE id = $1 RETURNING *", [id])
    if (rows.length === 0) {
        return res.status(404).json({error: "Plato no encontrado"})
    }

    res.sendStatus(204)
})

// definimos la función para escuchar las solicitudes
app.listen(PORT, () => {
  console.log(`Puedes acceder al servidor en http://localhost:${PORT}`);
});
