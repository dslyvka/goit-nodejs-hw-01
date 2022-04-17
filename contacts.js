const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);

  return parsedData;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id == contactId);

  return contact;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const filteredData = data.filter((contact) => contact.id != contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filteredData), "utf8");
  return filteredData;
}

async function addContact(name, email, phone, id = uuidv4()) {
  const data = await listContacts();
  data.push({ name, email, phone, id });
  await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
