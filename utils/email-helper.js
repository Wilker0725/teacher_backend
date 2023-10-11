export const validEmail = (email) => {
    const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    
    return EMAIL_REGEX.test(email);
}
