import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string()
        .length(13)
        .pattern(/^\+?\d{12}$/)
        .required(),
    email: Joi.string().email().allow(null),
    isFavourite: Joi.string,
    contactType: Joi.string().valid("personal", "home", "work").required(),
});

export const updateContactSchema = createContactSchema.fork(["name", "phoneNumber", "contactType"], (field) => field.optional());
