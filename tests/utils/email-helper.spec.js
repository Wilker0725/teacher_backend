import { validEmail } from "../../utils/email-helper.js";

describe("email-helper", () => {
    it("should return true for a valid email address", () => {
        const validEmails = [
            'test@example.com',
            'user123@gmail.com',
            'john_doe@my-website.net',
        ];

        validEmails.forEach((email) => {
            expect(validEmail(email)).toBe(true);
        });
    })

    it("should return false for an invalid email address", () => {
        const invalidEmails = [
            '@gmail.com',
            'user123@.com',
            '@.com',
        ];

        invalidEmails.forEach((email) => {
            expect(validEmail(email)).toBe(false);
        });
    })
});
