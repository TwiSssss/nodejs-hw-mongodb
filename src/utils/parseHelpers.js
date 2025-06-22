import { SORT } from "../constants/index.js";

const parseName = (name) => {
    return typeof name === "string" ? name.trim() : undefined;
};

const parsePhoneNumber = (phoneNumber) => {
    return typeof phoneNumber === "string" ? phoneNumber.trim() : undefined;
};

const parseEmail = (email) => {
    return typeof email === "string" ? email.trim() : undefined;
};

export const parseFilters = (query) => {
    const { name, phoneNumber, email } = query;
    return {
        name: parseName(name),
        phoneNumber: parsePhoneNumber(phoneNumber),
        email: parseEmail(email),
    };
};

const parseNumber = (value, defaultValue) => {
    const parsed = Number.parseInt(value);
    if (Number.isNaN(parsed)) {
        return defaultValue;
    }
    return parsed;
};

export const parsePaginationParams = (obj) => {
    return {
        page: parseNumber(obj.page, 1),
        perPage: parseNumber(obj.perPage, 10),
    };
};

const parseSortOrder = (sortOrder) => {
    const isKnownOrder = [SORT.ASC, SORT.DESC].includes(sortOrder);
    if (isKnownOrder) return sortOrder;
    return SORT.ASC;
};

const parseSortBy = (sortBy) => {
    const keysOfContact = ["_id", "name", "phoneNumber", "email", "isFavourite", "contactType", "createdAt", "updatedAt"];
    if (keysOfContact.includes(sortBy)) return sortBy;
    return "_id";
};

export const parseSortParams = (query) => {
    const { sortOrder, sortBy } = query;
    const parsedSortOrder = parseSortOrder(sortOrder);
    const parsedSortBy = parseSortBy(sortBy);
    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy,
    };
};
