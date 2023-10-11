import { jest } from '@jest/globals';
import TeacherController from "./teacher.js";

const teacherServiceMock = {
    registerStudents: jest.fn(),
    commonStudents: jest.fn(),
    suspendStudent: jest.fn(),
    unsuspendStudent: jest.fn(),
    retrieveEligibleStudents: jest.fn()
};

describe("TeacherController", () => {
    it('should registerStudents response 204 status code', async () => {
        const req = {
            body: {
                teacher: "teacher1@gmail.com",
                students: [
                    "student1@gmail.com",
                ]
            }
        }
        const res = { sendStatus: jest.fn() };

        const teacherController = new TeacherController(teacherServiceMock);

        await teacherController.registerStudents(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it('should registerStudents catch the error', async () => {
        const req = {body: {} }
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();
        const error = new Error('Test Error');

        const teacherController = new TeacherController(teacherServiceMock);
        teacherServiceMock.registerStudents.mockRejectedValue(error);

        await teacherController.registerStudents(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.sendStatus).not.toHaveBeenCalled();
    });

    it('should getCommonStudents response 200 statusCode and student value', async () => {
        const req = { query: { teacher: 'teacher1' }};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
        const students = ['student1', 'student2'];

        const teacherController = new TeacherController(teacherServiceMock);
        teacherServiceMock.commonStudents.mockResolvedValue(students);

        await teacherController.getCommonStudents(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ students });

    });

    it('should getCommonStudents catch the error', async () => {
        const req = {query: { teacher: 'teacher1' }}
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();
        const error = new Error('Test Error');

        const teacherController = new TeacherController(teacherServiceMock);
        teacherServiceMock.commonStudents.mockRejectedValue(error);

        await teacherController.getCommonStudents(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('should suspendStudent response 204 status code', async () => {
        const req = { body: {} };
        const res = { sendStatus: jest.fn() };

        const teacherController = new TeacherController(teacherServiceMock);

        await teacherController.suspendStudent(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it('should suspendStudent catch the error', async () => {
        const req = { body: {}}
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();
        const error = new Error('Test Error');

        const teacherController = new TeacherController(teacherServiceMock);
        teacherServiceMock.suspendStudent.mockRejectedValue(error);

        await teacherController.suspendStudent(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('should unsuspendStudent response 204 statusCode', async () => {
        const req = { body: {} };
        const res = { sendStatus: jest.fn() };

        const teacherController = new TeacherController(teacherServiceMock);

        await teacherController.unsuspendStudent(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it('should unsuspendStudent catch the error', async () => {
        const req = { body: {}}
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();
        const error = new Error('Test Error');

        const teacherController = new TeacherController(teacherServiceMock);
        teacherServiceMock.unsuspendStudent.mockRejectedValue(error);

        await teacherController.unsuspendStudent(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('should retrieveEligibleStudents response 200 statusCode and recipients value', async () => {
        const req = { body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
        const students =  [
            { email: "student01@gmail.com"},
            { email: "student02@gmail.com"}
        ];

        const teacherController = new TeacherController(teacherServiceMock);
        teacherServiceMock.retrieveEligibleStudents.mockResolvedValue(students);

        await teacherController.retrieveForNotifications(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ recipients: students });
    });
});
