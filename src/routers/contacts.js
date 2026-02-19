import { Router } from "express";
import { getContactsController, getContactsByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contact.js";
import { authenticate } from '../middlewares/authenticate.js';

const contactRouter = Router();
contactRouter.use(authenticate);
contactRouter.get("/", ctrlWrapper(getContactsController));
contactRouter.get("/:contactId", isValidId, ctrlWrapper(getContactsByIdController));
contactRouter.post("/", validateBody(createContactSchema), ctrlWrapper(createContactController));
contactRouter.patch("/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));
contactRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default contactRouter;
