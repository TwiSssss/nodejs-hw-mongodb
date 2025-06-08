import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import { ENV_VARS } from "./constants/envVars.js";
import { getContacts, getContact } from "./services/contacts.js";

export const startServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: "pino-pretty",
            },
        })
    );

    app.get("/contacts", async (req, res) => {
        const data = await getContacts();
        res.json({
            message: "Successfully retrieved contacts!",
            status: 200,
            data,
        });
    });

    app.get("/contacts/:contactId", async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContact(contactId);

        if (!contact) {
            return res.status(404).json({
                message: `Сontact with id ${contactId} not found!`,
                status: 404,
            });
        }
        res.json({
            message: `Successfully retrieved contact with id ${contactId}!`,
            status: 200,
            data: contact,
        });
    });

    app.use((error, req, res, next) => {
        res.json({
            errorMessage: error.message,
            id: req.id,
        });
    });

    app.use((req, res) => {
        res.status(404).json({
            message: "Not Found",
            status: 404,
        });
    });

    const PORT = getEnvVar(ENV_VARS.PORT, 3000);

    app.listen(PORT, () => {
        console.log(`Server is listening to port ${PORT}`);
    });
};
