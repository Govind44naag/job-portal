import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  FileText,
} from "lucide-react";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const { user } = useSelector((s) => s.auth);
  const { singleJob } = useSelector((s) => s.job);
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(
    singleJob?.application?.some((a) => a.applicant === user?._id) || false
  );

  // apply handler
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            application: [...singleJob.application, { applicant: user?._id }],
          })
        );
        toast.success(res.data.message);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Application failed");
    }
  };

  // fetch job once
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.application.some(
              (a) => a.applicant === user?._id
            )
          );
        }
      } catch (e) {
        console.error("Error fetching job:", e);
      }
    })();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob)
    return (
      <div className="mx-auto my-10 max-w-7xl text-center">
        <p className="text-xl text-slate-400">No job details available.</p>
      </div>
    );

  /* ---------- UI ---------- */
  return (
    <div className="mx-auto my-12 max-w-4xl px-4">
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
        {/* header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">
              {singleJob.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-indigo-600/20 px-3 py-1 text-indigo-300 hover:bg-indigo-600/30">
                <Briefcase className="mr-1 h-4 w-4" />
                {singleJob.position}
              </Badge>
              <Badge className="rounded-full bg-violet-600/20 px-3 py-1 text-violet-300 hover:bg-violet-600/30">
                {singleJob.jobType}
              </Badge>
              <Badge className="rounded-full bg-emerald-600/20 px-3 py-1 text-emerald-300 hover:bg-emerald-600/30">
                <DollarSign className="mr-1 h-4 w-4" />
                {singleJob.salary} LPA
              </Badge>
            </div>
          </div>

          {/* apply button */}
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-6 py-2 font-medium transition
              ${
                isApplied
                  ? "cursor-not-allowed bg-slate-600 text-slate-300"
                  : "bg-indigo-600 hover:bg-indigo-500 hover:scale-105 text-white"
              }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* section title */}
        <h2 className="border-b border-slate-700 pb-2 text-xl font-semibold text-slate-100">
          Job Description
        </h2>

        {/* detail list */}
        <div className="space-y-4 pt-6">
          {[
            {
              icon: FileText,
              label: "Role",
              value: singleJob.title,
            },
            {
              icon: MapPin,
              label: "Location",
              value: singleJob.location,
            },
            {
              icon: FileText,
              label: "Description",
              value: singleJob.description,
            },
            {
              icon: Briefcase,
              label: "Type",
              value: singleJob.jobType,
            },
            {
              icon: Users,
              label: "Experience",
              value: `${singleJob.experienceLevel} Years`,
            },
            {
              icon: DollarSign,
              label: "Salary",
              value: `${singleJob.salary} LPA`,
            },
            {
              icon: Users,
              label: "Total Applications",
              value: singleJob.application.length,
            },
            {
              icon: Calendar,
              label: "Posted Date",
              value: singleJob.createdAt.split("T")[0],
            },
          ].map(({ icon: Icon, label, value }) => (
            <div className="flex items-start gap-3" key={label}>
              <Icon className="mt-1 h-5 w-5 text-indigo-400" />
              <div>
                <h3 className="font-semibold text-slate-200">{label}</h3>
                <p className="text-slate-300">{value || "Not specified"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
