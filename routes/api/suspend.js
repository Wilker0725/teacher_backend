import express from "express";
import TeacherController from "../../controller/teacher.js";
import TeacherService from "../../service/teacher.js";
import TeacherDao from "../../dao/teacher.js";
import db from '../../database/db.js';

const suspendRouter = express.Router();

const teacherDao = new TeacherDao(db)
const teacherServiceInstance = new TeacherService(teacherDao);
const teacherController = new TeacherController(teacherServiceInstance)

suspendRouter.post("/", teacherController.suspendStudent);

export default suspendRouter;