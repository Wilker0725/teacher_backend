import { validEmail } from "../utils/email-helper.js";

class TeacherService {
    constructor(teacherDao) {
        this.teacherDao = teacherDao
    }
    
    throwError = (message, statusCode) => {
        const error = new Error(message);
        error.statusCode = statusCode;
        throw error;
    }
    
    registerStudents(body) {
        try {
            const { teacher, students } = body;

            if(!teacher || !teacher.length)
                this.throwError('Teacher is missing or empty', 400);

            if(!students || !students.length)
                this.throwError('Student value is missing or empty', 400);

            if(!Array.isArray(students))
                this.throwError('Students data type incorrect', 400);

            return this.teacherDao.registerStudents(teacher, students);
        } catch (error) {
            throw error;
        }
    }

    commonStudents(query) {
        let { teacher } = query;

        if(!teacher || !teacher.length)  
            this.throwError('Required teacher query or value', 400);

        if(!Array.isArray(teacher)) teacher = [teacher];
        
        return this.teacherDao.getCommonStudents(teacher);
    }

    suspendStudent(body) {
        try {
            const { student } = body;
            
            if(!student || !student.length) 
                this.throwError('Required student value and student key', 400)

            return this.teacherDao.postSuspendStudent(student);
        } catch (error) {
            throw error;
        }
    }

    unsuspendStudent(body) {
        try {
            const { student } = body;
            
            if(!student || !student.length) 
                this.throwError('Required student value and student key', 400);

            return this.teacherDao.postUnsuspendStudent(student);
        } catch (error) {
            throw error;
        }
    }

    retrieveEligibleStudents(body) {
        try {
            const { teacher, notification } = body;
            
            if(!teacher || !teacher.length) 
                this.throwError('Required teacher value', 400);

            if(!notification || !notification.length) 
                this.throwError('Required notification message value', 400);
                
            let validStudentEmails = [];

            if(notification.includes('@')){
                validStudentEmails = notification.match(/@(\S+)/g)
                    .map(mention => mention.slice(1))
                    .filter(email => validEmail(email))
            }
            
            return this.teacherDao.getEligibleStudentsNotification(teacher, validStudentEmails);
        } catch (error) {
            throw error;
        }
    }
}

export default TeacherService;
