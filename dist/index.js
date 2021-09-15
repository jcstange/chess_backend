"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_service_1 = require("./services/database.service");
const fruits_router_1 = require("./routes/fruits.router");
const movements_router_1 = require("./routes/movements.router");
const app = (0, express_1.default)();
const port = 8080;
(0, database_service_1.connecToDatabase)()
    .then(() => {
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true //access-control-allow-credentials:true
    }));
    app.use("/fruits", fruits_router_1.fruitsRouter);
    app.use("/movements", movements_router_1.movementsRouter);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map