import mysql from 'mysql2/promise';
import ENVIROMENT from '../config/enviroment.js';

const pool = mysql.createPool({
    host: ENVIROMENT.MYSQL.HOST,
    user: ENVIROMENT.MYSQL.USERNAME,
    password: ENVIROMENT.MYSQL.PASSWORD,
    database: ENVIROMENT.MYSQL.DATABASE,
});

pool.getConnection().then(
    () => {
        console.log('Base de datos MySQL conectada');
    }
)

.catch(
    (error) => {
        console.error('Error al conectar a la base de datos', error);
    }
)

export default pool