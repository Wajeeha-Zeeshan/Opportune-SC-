import express from "express";

import {
    createCourse,
    enrollInCourse,
    getAdminCourses,
    getAllCourses,
    getCourseById,
    getCourseStudents,
    updateCourse,
    uploadCourseFiles
} from "../controllers/course.controller.js";

const router = express.Router();

// COURSE RESTFUL WEB SERVICES

router.route("/get").get(getAllCourses);
router.route("/get/:id").get(getCourseById);

router.route("/create").post(createCourse);

router.route("/update/:id").put(updateCourse);

router.route("/enroll/:id").post(enrollInCourse);

router.route("/getadmincourses").get(getAdminCourses);

router.route("/students/:id").get(getCourseStudents);

router.route("/upload").post(uploadCourseFiles);

export default router;
