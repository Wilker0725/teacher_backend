import request from "supertest";
import createServer from "../../app.js";

describe('GET /commonstudents', () => {
    const app = createServer();
    it("should return with a 200 status code", () => {
        const query = { teacher: 'teacher=somevalue' };
        request(app)
            .get("/api/commonstudents")
            .query(query)
            .expect(200);
    });

    it("should return with a 400 bad request", () => {
        const query = {};
        request(app)
            .get("/api/commonstudents")
            .query(query)
            .expect(400);
    });

    it("should specify json in the content type header", async () => {
        const query = { teacher: 'teacher=somevalue' };
        const response = await request(app)
            .post("/api/commonstudents")
            .query(query);

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    })
});
