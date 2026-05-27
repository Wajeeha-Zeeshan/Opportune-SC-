import express from "express";
import { 
    postJob, 
    getAllJobs, 
    getJobById, 
    getAdminJobs, 
    editJob, 
    deleteJob 
} from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// JOB RESTFUL WEB SERVICES 

router.route("/get").get(getAllJobs);                  
router.route("/get/:id").get(getJobById);                

router.route("/post").post(postJob);       
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs); 
router.route("/edit/:id").put(editJob);
router.route("/delete/:id").delete(deleteJob);

export default router;