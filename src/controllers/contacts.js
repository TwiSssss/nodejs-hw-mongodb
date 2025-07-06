import { getContacts, getContact, createContact, updateContact, deleteContactById, uploadContactAvatar, upsertContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parseFilters, parsePaginationParams, parseSortParams } from "../utils/parseHelpers.js";
import { saveFile } from "../utils/saveFile.js";

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filters = parseFilters(req.query);
    const contact = await getContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filters,
        userId: req.user._id,
    });

    if (!contact) {
        throw createHttpError(404, "Contact not found");
    }
    res.json({
        message: "Successfully retrieved contacts!",
        status: 200,
        data: contact,
    });
};

export const getContactsByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContact(contactId, req.user._id);
    if (!contact) {
        throw createHttpError(404, "Contact not found");
    }
    res.json({
        message: `Successfully retrieved contact with id ${contactId}!`,
        status: 200,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    let photoUrl = null;

    if (req.file) {
        photoUrl = await saveFile(req.file);
    }

    const contact = await createContact({
        ...req.body,
        userId: req.user._id,
        photo: photoUrl,
    });

    return res.status(201).json({
        message: `Successfully created contact!`,
        status: 201,
        data: contact,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;

    let photoUrl;
    if (req.file) {
        photoUrl = await saveFile(req.file);
    }

    const updateData = { ...req.body };
    if (photoUrl) updateData.photo = photoUrl;

    const { contact } = await updateContact(contactId, updateData, { upsert: false }, req.user._id);

    return res.json({
        message: `Successfully patched contact with id ${contactId}!`,
        status: 200,
        data: contact,
    });
};

export const uploadContactAvatarController = async (req, res) => {
    const { studentId } = req.params;
    const student = await uploadContactAvatar(studentId, req.file);

    return res.json({
        message: `Successfully updated contact avatar with id ${studentId}!`,
        status: 200,
        data: student,
    });
};

export const upsertContactController = async (req, res) => {
    if (req.body.firstName && req.body.lastName) {
        req.body.name = req.body.firstName + " " + req.body.lastName;
    }
    const { contactId } = req.params;
    const { contact, isNew } = await upsertContact(contactId, req.body);
    const status = isNew ? 201 : 200;
    return res.status(status).json({
        message: `Successfully updated contact with id ${contactId}!`,
        status,
        data: contact,
    });
};
export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    await deleteContactById(contactId, req.user._id);
    res.status(204).send();
};
