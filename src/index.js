import { initMongoDbConnection } from "./db/initMongoConnection.js";
import { startServer } from "./server.js";

console.log("MONGO_DB_USER:", process.env.MONGO_DB_USER);
const bootstrap = async () => {
    await initMongoDbConnection();
    startServer();
};

bootstrap();
