import { Router } from "express";
import { getContactsController, getContactsByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactRouter = Router();
contactRouter.get("/contact", ctrlWrapper(getContactsController));
contactRouter.get("/contact/:contactId", ctrlWrapper(getContactsByIdController));
contactRouter.post("/contact", ctrlWrapper(createContactController));
contactRouter.patch("/contact/:contactId", ctrlWrapper(patchContactController));
contactRouter.delete("/contact/:contactId", ctrlWrapper(deleteContactController));

export default contactRouter;
