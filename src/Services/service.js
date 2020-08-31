import accounts from '../Data/accounts.json';
import contact from '../Data/contacts.json';

let data = [...accounts];
let contactData = [...contact];

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.AccountID), 0) + 1;

const generateContactId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.ContactID), 0) + 1;

export const insertItem = (item) => {
  item.AccountID = generateId(data);
  data.unshift(item);
  return data;
};

export const insertContactItem = (item) => {
  item.ContactID = generateContactId(contactData);
  item.AccountID = item.Account.AccountID;
  delete item.Account;
  contactData.unshift(item);
  return contactData;
};

export const getItems = () => {
  return data;
};

export const updateItem = (item) => {
  let index = data.findIndex((record) => record.AccountID === item.AccountID);
  data[index] = item;
  return data;
};

export const deleteItem = (item) => {
  let index = data.findIndex((record) => record.AccountID === item.AccountID);
  data.splice(index, 1);
  return data;
};

export const deleteContact = (item) => {
  let index = contactData.findIndex(
    (record) =>
      record.AccountID === item.AccountID && record.ContactID === item.ContactID
  );
  contactData.splice(index, 1);
  return contactData;
};
