import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge"; 
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
   
  return (
    <div className="bg-slate-500 dark:bg-slate-900 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl my-5 p-8 text-slate-900 dark:text-slate-100">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} className="w-full h-full rounded-sm" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p className="text-slate-700 dark:text-slate-300">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5 space-y-2">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">Skills</h1>
          <div className='flex items-center gap-1 flex-wrap'>
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge 
                  key={index} 
                  className="px-2 py-1 bg-blue-500 text-white rounded-md"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-slate-700 dark:text-slate-400">NA</span>
            )}
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5 mt-6'>
          <Label className="text-md font-bold text-slate-900 dark:text-slate-100">Resume</Label>
          {isResume ? (
            <a 
              target='_blank' 
              rel="noopener noreferrer" 
              href={user?.profile?.resume} 
              className="text-blue-600 dark:text-blue-400 w-full hover:underline cursor-pointer hover:text-green-900 dark:hover:text-green-400"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-slate-700 dark:text-slate-400">NA</span>
          )}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 mt-6 text-slate-900 dark:text-slate-100">
        <h1 className="text-2xl font-semibold mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
