class TeacherController {        
    constructor(teacherService) {
        this.teacherService = teacherService
    }

    registerStudents = async (req, res, next) => {
        try {               
            await this.teacherService.registerStudents(req.body);

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };

    getCommonStudents = async (req, res, next) => {
        try {
            const results = await this.teacherService.commonStudents(req.query);
            
            res.status(200).json({ students: results });
        } catch (error) {
            next(error);
        }
    };

    suspendStudent = async (req, res, next) => {
        try {
            await this.teacherService.suspendStudent(req.body);

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    unsuspendStudent = async (req, res, next) => {
        try {
            await this.teacherService.unsuspendStudent(req.body);

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    retrieveForNotifications = async (req, res, next) => {
        try {
            const students = await this.teacherService.retrieveEligibleStudents(req.body);

            res.status(200).json({ recipients: students });
        } catch (error) {
            next(error);
        }
    }
}

export default TeacherController;
