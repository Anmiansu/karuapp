import { pool } from "./db.js"; // importa la instancia de Pool desde el archivo db.js

//datos 
const menu = [
    {"nombre": "Lomito de Carne", "precio": 33000},
    {"nombre": "Lomito de Pollo", "precio": 30000},
    {"nombre": "Lomito Mixto", "precio": 30000}
]

const main = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS platos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            precio INTEGER NOT NULL)`);

        await pool.query("DELETE FROM platos");
        
        for (const plato of menu) {
            await pool.query("INSERT INTO platos (nombre, precio) VALUES ($1, $2)",
                [plato.nombre, plato.precio]);
        }

        const {rows} = await pool.query("SELECT * FROM platos");
        console.log(rows)

    }catch (err) {
        console.error("Error:", err.message);
    }finally {
        await pool.end();
    }
    
}

main();