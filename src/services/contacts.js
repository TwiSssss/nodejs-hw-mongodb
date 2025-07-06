import { Contact } from "../db/models/contacts.js";
import createHttpError from "http-errors";
import { SORT } from "../constants/index.js";
import { createPaginationMetadata } from "../utils/PaginationData.js";
import { saveFile } from "../utils/saveFile.js";

export const getContact = async (contactId, userId) => {
    const contact = await Contact.findOne({ _id: contactId, userId });
    return contact;
};

export const getContacts = async ({ page = 1, perPage = 10, sortOrder = SORT.ASC, sortBy = "_id", filters = {}, userId }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = Contact.find({ userId });

    if (filters.name) {
        contactsQuery.where("name").regex(new RegExp(filters.name, "i"));
    }
    if (filters.phoneNumber) {
        contactsQuery.where("phoneNumber").regex(new RegExp(filters.phoneNumber));
    }
    if (filters.email) {
        contactsQuery.where("email").regex(new RegExp(filters.email, "i"));
    }

    const [count, contacts] = await Promise.all([
        Contact.find({ userId }).merge(contactsQuery).countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = createPaginationMetadata(page, perPage, count);

    return {
        data: contacts,
        ...paginationData,
    };
};

export const createContact = async (payload) => {
    const contact = await Contact.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, options, userId) => {
    const result = await Contact.findOneAndUpdate({ _id: contactId, userId }, payload, {
        ...options,
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw createHttpError(404, "Contact not found");
    }
    return {
        contact: result,
    };
};

export const deleteContactById = async (contactId, userId) => {
    const result = await Contact.findOneAndDelete({ _id: contactId, userId });
    if (!result) {
        throw createHttpError(404, "Contact not found");
    }
    return result;
};

export const upsertContact = async (contactId, payload) => {
    const contact = await Contact.findById(contactId);

    if (contact) {
        contact.set(payload);
        return { isNew: false, contact: await contact.save() };
    } else {
        return { isNew: true, contact: await contact.create(payload) };
    }
};

export const uploadContactAvatar = async (contactId, file) => {
    const url = await saveFile(file);

    const contact = await Contact.findByIdAndUpdate(
        contactId,
        {
            photo: url,
        },
        { new: true }
    );

    return contact;
};
