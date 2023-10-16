class TeacherDao {
    constructor(database) {
        this.db = database;
    }
    
    throwError = (message, statusCode) => {
        const error = new Error(message);
        error.statusCode = statusCode;
        throw error;
    }
    
    async registerStudents(teacherEmail, students) {
        try {
            const [teacherRow] = await this.db("teachers").where("email", teacherEmail).select("id");            
            if (!teacherRow) 
                this.throwError('Provided teacher\'s email is not found in database', 404);

            const studentRows = await this.db("students").whereIn("email", students).select(["id", "email"]);
            if (studentRows.length !== students.length) 
                this.throwError('One or more provided student\'s email not found in database', 404);

            const teacherId = teacherRow.id;
            const studentIds = studentRows.map((row) => row.id);

            const existingStudents = await this.db('teacher_student')
                .where('teacher_id', teacherId)
                .whereIn('student_id', studentIds);
            
            // get student which didn't exist in database
            const studentsToInsert = studentIds.filter((studentId) => {
                return !existingStudents.some((existStudent) => existStudent.student_id === studentId)
            });

            const insertData = studentsToInsert.map((studentId) => ({
                teacher_id: teacherId,
                student_id: studentId,
            }));
    
            if(insertData.length) 
                await this.db("teacher_student").insert(insertData);
            
        } catch (error) {
            throw error;
        }
    }

    async getCommonStudents(teachers) {        
        try {
            const students = await this.db('students')
                .select('students.email')
                .join('teacher_student', 'students.id', '=', 'teacher_student.student_id')
                .join('teachers', 'teacher_student.teacher_id', '=', 'teachers.id')
                .whereIn('teachers.email', teachers)
                .groupBy('students.email')
                .havingRaw(`COUNT(DISTINCT teachers.email) = ${teachers.length}`);
            
            return students;
        } catch (error) {
            throw error;
        }
    }

    async postSuspendStudent(student) {
        try {
            const studentRow = await this.db('students')
                .where('email', student)
                .first();
            
            if (!studentRow) 
                this.throwError('Student not found in database', 404);


            const [suspended] = await this.db('suspensions').where('student_id', studentRow.id);

            if(suspended) return studentRow;
            
            const suspensionRecord = {
                student_id: studentRow.id,
            };
            
            await this.db('suspensions').insert(suspensionRecord);
;
            return studentRow;
        } catch (error) {
            throw error;
        }
    }

    async postUnsuspendStudent(student) {
        try {
            const studentRow = await this.db('students')
                .where('email', student)
                .first();
            
            if (!student) 
                this.throwError('Student not found in database', 404);

            const [suspended] = await this.db('suspensions').where('student_id', studentRow.id);

            if(!suspended) return studentRow;

            await this.db('suspensions').where('student_id', studentRow.id).del();
;
            return studentRow;
        } catch (error) {
            throw error;
        }
    }

    async getEligibleStudentsNotification(teacherEmail, studentEmails) {
        try {
            const studentRow = await this.db('students')
                .select("students.email")
                .whereNotExists(function() {
                    this.select(1)
                        .from("suspensions")
                        .whereRaw("students.id = suspensions.student_id")
                })
                .join('teacher_student', 'students.id', "=", 'teacher_student.student_id')
                .join('teachers', 'teacher_student.teacher_id', "=", 'teachers.id')
                .where('teachers.email', teacherEmail)
                .union(function() {
                    this.select('students.email')
                        .from('students')
                        .whereNotExists(function() {
                            this.select(1)
                                .from("suspensions")
                                .whereRaw("students.id = suspensions.student_id")
                        })
                        .whereIn('students.email', studentEmails)
                })
                .groupBy('students.email');

            return studentRow;
        } catch (error) {
            throw error;
        }
    }
}

export default TeacherDao;