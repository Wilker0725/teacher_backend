import { jest } from "@jest/globals";
import TeacherService from "./teacher.js";

const teacherDaoMock = {
    throwError: jest.fn(),
    registerStudents: jest.fn(),
    getCommonStudents: jest.fn(),
    postSuspendStudent: jest.fn(),
    postUnsuspendStudent: jest.fn(),
    getEligibleStudentsNotification: jest.fn()
};


describe("TeacherService", () => {
    describe("throwError", () => {
        it("should throw the error message and status code", () => {
            const message = "Test error";
            const statusCode = 400
            
            try {
                teacherDaoMock.throwError(message, statusCode);
            } catch (error) {
                expect(error.message).toBe(message);
                expect(error.statusCode).toBe(400);
            }
        })
    });
    
    describe("registerStudents", () => {
        it("should successful called the fn", () => {
            const body = {
                teacher: "teacher01@gmail.com",
                students: ["student01@gmail.com"]
            };
            
            const teacherService = new TeacherService(teacherDaoMock);
    
            const result = teacherService.registerStudents(body);
    
            expect(teacherDaoMock.registerStudents).toHaveBeenCalledTimes(1);
        });

        it("should response correct error message and 400 status code if the teacher value is empty", () => {
            const body = {
                teacher: "",
                students: ["student01@gmail.com"]
            };
            
            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.registerStudents(body);
            } catch (error) {
                expect(error.message).toBe("Teacher is missing or empty");
                expect(error.statusCode).toBe(400);
            }
        });

        it("should response correct error message and 400 status code if the teacher key is missing", () => {
            const body = {
                students: ["student01@gmail.com"]
            };
            
            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.registerStudents(body);
            } catch (error) {
                expect(error.message).toBe("Teacher is missing or empty");
                expect(error.statusCode).toBe(400);
            }
        });
        
        it("should response correct error message and 400 status code if the students value is missing", () => {
            const body = {
                teacher: "teacher01@gmail.com",
                students: []
            };
            
            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.registerStudents(body);
            } catch (error) {
                expect(error.message).toBe("Student value is missing or empty");
                expect(error.statusCode).toBe(400);
            }
        });

        it("should response correct error message and 400 status code if the students data format incorrect", () => {
            const body = {
                teacher: "teacher01@gmail.com",
                students: "student01@gmail.com"
            };
            
            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.registerStudents(body);
            } catch (error) {
                expect(error.message).toBe("Students data type incorrect");
                expect(error.statusCode).toBe(400);
            }
        });
    })

    describe("commonStudents", () => {
        it("required teacher query value", () => {
            const query = {  teacher: "teacher01@gmail.com" }
            const teacherService = new TeacherService(teacherDaoMock);
    
            const result = teacherService.commonStudents(query);
    
            expect(teacherDaoMock.getCommonStudents).toHaveBeenCalledTimes(1);
        });

        it("should response correct error message and 400 status code if the teacher value is empty", () => {
            const query = { teacher: "" };
            
            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.commonStudents(query);
            } catch (error) {
                expect(error.message).toBe("Required teacher query or value");
                expect(error.statusCode).toBe(400);
            }
        });
    });

    describe("suspendStudent", () => {
        it("should successful called the fn", () => {
            const body = {  student: "student01@gmail.com" }
            const teacherService = new TeacherService(teacherDaoMock);
    
            const result = teacherService.suspendStudent(body);
    
            expect(teacherDaoMock.postSuspendStudent).toHaveBeenCalledTimes(1);
        });

        it("should response correct error message and 400 status code if the student value is empty", () => {
            const body = {  student: "" }
            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.suspendStudent(body);
            } catch (error) {
                expect(error.message).toBe("Required student value and student key");
                expect(error.statusCode).toBe(400);
            }
        });

        it("should response correct error message and 400 status code if the student key is missing", () => {
            const body = {  wrongKey: "" }
            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.suspendStudent(body);
            } catch (error) {
                expect(error.message).toBe("Required student value and student key");
                expect(error.statusCode).toBe(400);
            }
        });
    });

    describe("unsuspendStudent", () => {
        it("should successful called the fn", () => {
            const body = {  student: "student01@gmail.com" }
            const teacherService = new TeacherService(teacherDaoMock);
    
            const result = teacherService.unsuspendStudent(body);
    
            expect(teacherDaoMock.postUnsuspendStudent).toHaveBeenCalledTimes(1);
        });

        it("should response correct error message and 400 status code if the student value is empty", () => {
            const body = {  student: "" }
            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.unsuspendStudent(body);
            } catch (error) {
                expect(error.message).toBe("Required student value and student key");
                expect(error.statusCode).toBe(400);
            }
        });

        it("should response correct error message and 400 status code if the student key is missing", () => {
            const body = {  wrongKey: "" }
            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.unsuspendStudent(body);
            } catch (error) {
                expect(error.message).toBe("Required student value and student key");
                expect(error.statusCode).toBe(400);
            }
        });
    });

    describe("retrieveEligibleStudents", () => {
        it("should successful called the fn", () => {
            const body = { 
                teacher: "teacher01@gmail.com",  
                notification: "Hello world. @student01@gmail.com"
            };

            const teacherService = new TeacherService(teacherDaoMock);
    
            const result = teacherService.retrieveEligibleStudents(body);

            expect(teacherDaoMock.getEligibleStudentsNotification).toHaveBeenCalledTimes(1);
        });

        it("should response correct error message and 400 status code if the teacher value is empty", () => {
            const body = { 
                teacher: "",  
                notification: "Hello world. @student01@gmail.com"
            };

            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.retrieveEligibleStudents(body);
            } catch (error) {
                expect(error.message).toBe("Required teacher value");
                expect(error.statusCode).toBe(400);
            }
        });

        it("should response correct error message and 400 status code if the notification value is empty", () => {
            const body = { 
                teacher: "teacher01@gmail.com",  
                notification: ""
            };

            const teacherService = new TeacherService(teacherDaoMock);
    
            try {
                teacherService.retrieveEligibleStudents(body);
            } catch (error) {
                expect(error.message).toBe("Required notification message value");
                expect(error.statusCode).toBe(400);
            }
        });
    })
});
