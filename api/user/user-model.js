const db = require("../../data/dbConfig");

function find() {
    return db("users");
}

async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
}

function findById(id) {
    return db("users").where({ id }).first();
}

function findBy(filter) {
    return db("users").where(filter).first();
}

async function update(id, changes) {
    return db("users").update(changes).where({ id });
}

function remove(id) {
    return db("users").where({ id }).del();
}

module.exports = { find, add, findById, findBy, update, remove };
