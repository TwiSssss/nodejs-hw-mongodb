import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string()
        .length(12)
        .pattern(/^\+?\d{11}$/)
        .required(),
    email: Joi.string().email().allow(null),
});

export const updateContactSchema = createContactSchema.fork(["name", "phoneNumber"], (field) => field.optional());
