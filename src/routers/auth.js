import { Router } from "express";
import { loginUserController, logoutUserController, refreshSessionController, registerUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserValidationSchema, loginUserValidationSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const authRouter = Router();
authRouter.post("/register", validateBody(registerUserValidationSchema), ctrlWrapper(registerUserController));
authRouter.post("/login", validateBody(loginUserValidationSchema), ctrlWrapper(loginUserController));
authRouter.post("/logout", ctrlWrapper(logoutUserController));
authRouter.post("/refresh", ctrlWrapper(refreshSessionController));

export default authRouter;
