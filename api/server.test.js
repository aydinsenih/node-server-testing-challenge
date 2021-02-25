const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

const user1 = { name: "John" };
const user2 = { name: "Bob" };

it("correct env", () => {
    expect(process.env.DB_ENV).toBe("testing");
});
beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db("users").truncate();
});

afterAll(async () => {
    await db.destroy();
});

describe("User Router", () => {
    describe("[GET] /api/users", () => {
        it("responds with 200 status", async () => {
            const res = await request(server).get("/api/users");
            expect(res.statusCode).toEqual(200);
        });
        it("returns correct num of users", async () => {
            let res;
            await db("users").insert(user1);
            res = await request(server).get("/api/users");
            expect(res.body).toHaveLength(1);

            await db("users").insert(user2);
            res = await request(server).get("/api/users");
            expect(res.body).toHaveLength(2);
        });
        it("returns correct user format", async () => {
            await db("users").insert(user1);
            await db("users").insert(user2);
            const res = await request(server).get("/api/users");
            expect(res.body[0]).toMatchObject({ id: 1, ...user1 });
            expect(res.body[1]).toMatchObject({ id: 2, ...user2 });
        });
    });

    describe("[POST] /api/users", () => {
        it("respond with newly created user", async () => {
            let res;
            res = await request(server).post("/api/users").send(user1);
            expect(res.body).toMatchObject({ id: 1, ...user1 });

            res = await request(server).post("/api/users").send(user2);
            expect(res.body).toMatchObject({ id: 2, ...user2 });
        });
    });
    describe("[DELETE] /api/users", () => {
        it("repond with 200 status", async () => {
            await db("users").insert(user1);
            await db("users").insert(user2);
            const res = await request(server).delete(`/api/users/${1}`);
            expect(res.statusCode).toEqual(200);
        });
        it("check if delete applied", async () => {
            await db("users").where({ id: 1 }).del();
        });
    });
});
