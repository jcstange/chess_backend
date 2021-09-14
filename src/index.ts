import express from 'express'
import { connecToDatabase } from './services/database.service'
import { fruitsRouter } from './routes/fruits.router'

const app = express()
const port = 8080

connecToDatabase()
    .then(() => {
        app.use("/fruits", fruitsRouter)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error)
        process.exit()
    })