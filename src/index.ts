import express from "express"
import cors from "cors"
import { connecToDatabase } from "./services/database.service"
import { movementsRouter } from "./routes/movements.router"
import { sseRouter } from "./routes/sse.router"

const app = express()
const port = process.env.PORT || 8080

connecToDatabase()
    .then(() => {
        app.use(
            cors({
                origin: "https://jcstange.github.io",
                credentials: true, //access-control-allow-credentials:true
            }),
        )
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
