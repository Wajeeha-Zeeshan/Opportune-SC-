import { Job } from "../models/job.model.js";

// ==================== JOB CONTROLLER ====================

export const postJob = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            requirements, 
            salary, 
            location, 
            jobType, 
            experience,
            position, 
            companyId 
        } = req.body;

        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || 
            !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ 
                message: "Something is missing.", 
                success: false 
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(",").map(req => req.trim()),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,        // ← Now accepts string
            position: Number(position),
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};

// 2. Get All Jobs - PUBLIC (For Students)
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const jobs = await Job.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).populate("company").sort({ createdAt: -1 });

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// 3. Get Job by ID - PUBLIC
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("company")
            .populate("applications");

        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// 4. Get Company's Own Jobs (Admin/Company)
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// 5. Update Job
export const editJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByIdAndUpdate(id, req.body, { new: true });

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        return res.status(200).json({ success: true, job, message: "Job updated successfully" });
    } catch (error) {
        console.error('Error editing job:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 6. Delete Job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        return res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};