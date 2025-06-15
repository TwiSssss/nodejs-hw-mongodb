import { getContacts, getContact, createContact, updateContact, deleteContactById } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const contact = await getContacts();
    res.json({
        message: "Successfully retrieved contacts!",
        status: 200,
        data: contact,
    });
};

export const getContactsByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContact(contactId);
    if (!contact) {
        return res.status(404).json({
            message: `Contact with id ${contactId} not found!`,
            status: 404,
        });
    }
    res.json({
        message: `Successfully retrieved contact with id ${contactId}!`,
        status: 200,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    return res.status(201).json({
        message: `Successfully created contact!`,
        status: 201,
        data: contact,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const { contact } = await updateContact(contactId, req.body, {
        upsert: false,
    });
    return res.json({
        message: `Successfully patched contact with id ${contactId}!`,
        status: 200,
        data: contact,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    await deleteContactById(contactId);
    res.status(204).send();
};
