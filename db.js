import "dotenv/config"; //Carga las variables de entorno desde un archivo .env
import pg from "pg"; // importa el modulo pg para conectarse a la base de datos PostgreSQL

const { Pool } = pg; // extrae mediante destructuring la clase Pool del modulo pg

export const pool = new Pool({connectionString: process.env.DATABASE_URL}); // crea una instancia de Pool con la cadena de conexión a la base de datos
// connectionString es una propiedad que se utiliza para especificar la cadena de conexion a la BD
// mediante process.env accedemos a las variables de entorno definidas en el archivo .env
// una cadena de conexion es simplemente un string que contiene la informacion necesaria para conectarse a la BD
