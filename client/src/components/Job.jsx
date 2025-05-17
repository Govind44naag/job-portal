import React from "react";
import { Button } from "./ui/button";
import { Bookmark, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const diffDays = Math.floor((Date.now() - createdAt) / 86_400_000);
    return diffDays === 0 ? "Posted today" : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
   <article
  className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-md transition-all duration-300 
             hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 hover:ring-1 hover:ring-indigo-500/30"
>
  {/* top row */}
  <div className="mb-4 flex items-center justify-between">
    <span className="text-sm font-medium text-slate-400">
      {daysAgo(job?.createdAt)}
    </span>
    <Button
      variant="ghost"
      size="icon"
      className="text-slate-400 hover:bg-slate-700 hover:text-indigo-400"
    >
      <Bookmark className="h-5 w-5" />
    </Button>
  </div>

  {/* company info */}
  <div className="mb-4 flex items-center gap-4">
    <Avatar className="flex-shrink-0">
      <AvatarImage
        src={job?.company?.logo || 'https://via.placeholder.com/48'}
        className="h-12 w-12 rounded-full border-2 border-indigo-500 object-cover"
        alt="Company logo"
      />
    </Avatar>
    <div>
      <h2 className="text-xl font-semibold text-slate-100">
        {job?.company?.name || "Company"}
      </h2>
      <div className="mt-1 flex items-center gap-1 text-sm text-slate-400">
        <MapPin className="h-4 w-4 text-indigo-400" />
        {job?.location || "India"}
      </div>
    </div>
  </div>

  {/* job title */}
  <div className="mb-4">
    <h3 className="mb-1 text-xl font-bold text-slate-50">
      {job?.title || "Job Title"}
    </h3>
    <p className="line-clamp-2 text-sm text-slate-300">
      {job?.description || "No description available."}
    </p>
  </div>

  {/* tags */}
  <div className="mb-6 flex flex-wrap items-center gap-2">
    <Badge className="rounded-full bg-indigo-600/20 px-3 py-1 text-indigo-300 hover:bg-indigo-600/30">
      {job?.position || "Position"}
    </Badge>
    <Badge className="rounded-full bg-violet-600/20 px-3 py-1 text-violet-300 hover:bg-violet-600/30">
      {job?.jobType || "Job Type"}
    </Badge>
    <Badge className="rounded-full bg-emerald-600/20 px-3 py-1 text-emerald-300 hover:bg-emerald-600/30">
      {job?.salary || "Salary"}
    </Badge>
  </div>

  {/* actions */}
  <div className="flex flex-wrap items-center gap-2">
    <Button
      onClick={() => navigate(`/description/${job?._id}`)}
      className="bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 transition-transform"
    >
      View Details
    </Button>
    <Button
      variant="outline"
      className="border-indigo-500 text-indigo-300 text-sm px-3 py-1.5 hover:bg-indigo-600/20"
    >
      Save for Later
    </Button>
  </div>
</article>
  );
};

export default Job;
