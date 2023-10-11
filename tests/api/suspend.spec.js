import request from "supertest";
import createServer from "../../app.js";

describe('POST /suspend', () => {
    const app = createServer();

    it("should return with a 204 status code", () => {
        const payload = { student: "student01@gmail.com"};
        request(app)
            .get("/api/suspend")
            .send(payload)
            .expect(204);
    });

    it("should return with a 400 status code", () => {
        const payload = { student: ""};
        request(app)
            .get("/api/suspend")
            .send(payload)
            .expect(400);
    });
});
