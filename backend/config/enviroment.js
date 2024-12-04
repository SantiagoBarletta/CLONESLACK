import dotenv from 'dotenv'

dotenv.config()

process.env

const ENVIROMENT = {
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USER: process.env.EMAIL_USER,
    SECRET_KEY: process.env.SECRET_KEY,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,

    MYSQL: {
        HOST : process.env.DB_HOST,
        DATABASE : process.env.DB_NAME,
        USERNAME : process.env.DB_USER,
        PASSWORD : process.env.DB_PASSWORD
    }
}


 //console.log(ENVIROMENT)
export default ENVIROMENT