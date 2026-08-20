import "dotenv/config"; //Carga las variables de entorno desde un archivo .env
import pg from "pg"; // importa el modulo pg para conectarse a la base de datos PostgreSQL

const { Pool } = pg; // extrae mediante destructuring la clase Pool del modulo pg

const pool = new Pool({connectionString: process.env.DATABASE_URL}); // crea una instancia de Pool con la cadena de conexión a la base de datos
// connectionString es una propiedad que se utiliza para especificar la cadena de conexion a la BD
// mediante process.env accedemos a las variables de entorno definidas en el archivo .env
// una cadena de conexion es simplemente un string que contiene la informacion necesaria para conectarse a la BD

// TUS 3 PLATOS — el mismo menú del ejercicio, con sus precios:
const menu = [
  { nombre: "Lomito Arabe", precio: 30000, categoria: "Comida Rápida" },
  { nombre: "Pira Caldo", precio: 50000, categoria: "Plato Principal" },
  { nombre: "Chipa Guasu", precio: 5000, categoria: "Guarnición" },
];

const main = async () => {
    try {
        //crear la tabla si no existe
        //usamos pool.query para ejecutar la consulta SQL de creación de tabla
        await pool.query(`CREATE TABLE IF NOT EXISTS platos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            precio INTEGER NOT NULL,
            categoria VARCHAR(50) NOT NULL)`);
        
        await pool.query("DELETE FROM platos"); // vaciamos la tabla para evitar duplicados

        for (const plato of menu) {
            await pool.query(
                "INSERT INTO platos (nombre, precio, categoria) VALUES ($1, $2, $3)", // usamos placeholders $1, $2, $3 para evitar inyecciones SQL
                [plato.nombre, plato.precio, plato.categoria] // pasamos los valores del plato como un array para reemplazar los placeholders
            );
        }

        const { rows } = await pool.query("SELECT * FROM platos"); // traemos todos los registros de la tabla platos
        // rows es un array de objetos que contiene los registros de la tabla platos (filas de la tabla)
        console.log(rows); // mostramos los registros en la consola

    } catch (err) {
        console.error("Error:" , err.message); // mostramos el mensaje de error en caso de que ocurra un error
    } finally {
        await pool.end(); // cerramos la conexión a la base de datos
    }

}


main(); // llamamos a la función main para ejecutar el código
