import { Application } from '../models/application.model.js'
import { Job } from '../models/job.model.js'
import { User } from '../models/user.model.js'
import { sendStatusEmail } from '../utils/mailer.js'
export const applyJob = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false,
            })
        }
        //check if user have applied for job or not
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                message: "you have already applied for jobs",
                success: false,
            })
        }
        //check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "job not found!",
                success: false,
            })
        }
        //create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        })

        job.application.push(newApplication._id)
        await job.save()
        return res.status(201).json({
            message: "job applied successfully!",
            success: true,
        })
    }
    catch (e) {
        console.log(e);
    }
}
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        })
        if (!application) {
            return res.status(404).json({
                message: "No Application",
                success: false,
            })
        }
        return res.status(200).json({
            application,
            success: true,
        })
    }
    catch (e) {
        console.log(e)
    }
}
//how many user appply for job (addmin'll see)
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'application',
            options: { sort: { createAt: -1 } },
            populate: {
                path: 'applicant'
            }
        })
        if (!job) {
            return res.status(404).json({
                message: "Job not found!",
                success: false,
            })
        }
        return res.status(200).json({
            job,
            success: true,
        })

    }
    catch (e) {
        console.log(e)
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status not found!",
                success: false,
            });
        }

        const application = await Application.findById(applicationId)
            .populate("applicant", "fullName email")
            .populate({
                path: "job",
                select: "title company",
                populate: {
                    path: "company",
                    select: "name location"
                }
            });


        if (!application) {
            return res.status(404).json({
                message: "Application not found!",
                success: false,
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        // ✅ check email is available
        if (!application.applicant?.email) {
            return res.status(400).json({
                message: "Applicant email not found in database!",
                success: false,
            });
        }
        const user = await User.findById(req.id)
        if (!user) {
            console.log("user not found !")
            return res.status(404).json({
                message: "user not found!",
                success: false,
            })
        }
        //  send email
        await sendStatusEmail(
            application.applicant.email,
            application.job.title,
            status,
            user,
            application.job.company    // ✅ pass company details
        );


        return res.status(200).json({
            message: `Application ${status} & Email sent successfully`,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
