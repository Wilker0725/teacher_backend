import request from "supertest";
import { jest } from '@jest/globals';
import TeacherDao from "../../dao/teacher.js";
import createServer from "../../app.js";

const registerStudents = jest.fn();

const teacherDaoMock = {
    registerStudents,
}

describe('POST /register', () => {
    beforeEach(() => {
        registerStudents.mockReset();
    });
    
    const app = createServer();

    it("should return with a 204 status code", () => {
        const payload = {
            teacher: "teacher01@gmail.com",
            students: ["student01@gmai.com"]
        };
        request(app)
            .post("/api/register")
            .send(payload)
            .expect(204);
    });

    it("should return with a 400 status code without value in students", () => {
        const payload = {
            teacher: "teacher01@gmail.com",
            students: []
        };
        request(app)
            .post("/api/register")
            .send(payload)
            .expect(400);
    });

    it("should return with a 400 status code without value in teacher", () => {
        const payload = {
            teacher: "",
            students: ["student01@gmai.com"]
        };
        request(app)
            .post("/api/register")
            .send(payload)
            .expect(400);
    });
});
