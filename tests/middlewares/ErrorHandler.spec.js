import { jest } from '@jest/globals';
import ErrorHandler from "../../middlewares/ErrorHandler.js";


describe("ErrorHandler", () => {
    it("should return 400 status code and error message", () => {
        const req = {};
        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        const err = new Error('Test');
        err.statusCode = 400;

        ErrorHandler(err, req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 400,
            message: 'Test'
        });
    });

    it("should return 500 status code and error message", () => {
        const req = {};
        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        const err = new Error('Test');

        ErrorHandler(err, req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            message: 'Test'
        });
    });

    it("should return something went wrong", () => {
        const req = {};
        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        const err = {};

        ErrorHandler(err, req, res);

        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            message: 'Something went wrong'
        });
    });
})