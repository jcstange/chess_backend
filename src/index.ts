import express from 'express'
import cors from 'cors'
import { connecToDatabase } from './services/database.service'
import { fruitsRouter } from './routes/fruits.router'
import { movementsRouter } from './routes/movements.router'
import { sseRouter } from './routes/sse.router'

const app = express()
const port = 8080

connecToDatabase()
    .then(() => {
        app.use(cors({
            origin:'http://localhost:3000', 
            credentials:true            //access-control-allow-credentials:true
        }))
        app.use("/fruits", fruitsRouter)
        app.use("/movements", movementsRouter)
        app.use("/sse", sseRouter)

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })

    })
    .catch((error: Error) => {
        console.error("Database connection failed", error)
        process.exit()
    })