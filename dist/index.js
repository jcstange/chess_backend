"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_service_1 = require("./services/database.service");
const fruits_router_1 = require("./routes/fruits.router");
const app = (0, express_1.default)();
const port = 8080;
(0, database_service_1.connecToDatabase)()
    .then(() => {
    app.use("/fruits", fruits_router_1.fruitsRouter);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map