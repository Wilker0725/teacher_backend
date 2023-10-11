import request from "supertest";
import createServer from "../../app.js";

describe('POST /retrievefornotifications', () => {
    const app = createServer();

    it("should return with a 200 status code", () => {
        const payload = {
            teacher:  "teacher1@gmail.com",
            notification: "Hello students!"
        };
        request(app)
            .post("/api/retrievefornotifications")
            .send(payload)
            .expect(200);
    });

    it("should return with a 400 status code without value in notification", () => {
        const payload = {
            teacher:  "teacher1@gmail.com",
            notification: ""
        };
        request(app)
            .post("/api/retrievefornotifications")
            .send(payload)
            .expect(400);
    });

    it("should return with a 400 status code without value in teacher", () => {
        const payload = {
            teacher:  "",
            notification: "Hello students!"
        };
        request(app)
            .post("/api/retrievefornotifications")
            .send(payload)
            .expect(400);
    });

    it("should specify json in the content type header", async () => {
        const payload = {
            teacher:  "teacher1@gmail.com",
            notification: "Hello students!"
        };
        const response = await request(app)
            .post("/api/retrievefornotifications")
            .send(payload);

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    })
});
