import { Contact } from "../db/models/contacts.js";

export const getContact = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact;
};
export const getContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
};
