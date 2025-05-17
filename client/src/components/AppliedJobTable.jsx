import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; //   Correct import for Table components
import { Badge } from "@/components/ui/badge"; //  Correct import for Badge
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job)
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md p-4">
      <Table className="w-full border border-gray-200">
        <TableCaption className="text-gray-500">
          A list of your recent applied jobs
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-left px-4 py-2">Date</TableHead>
            <TableHead className="text-left px-4 py-2">Job Role</TableHead>
            <TableHead className="text-left px-4 py-2">Company</TableHead>
            <TableHead className="text-right px-4 py-2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet!!</span> : allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob._id} className="border-b">
              <TableCell className="px-4 py-2">{appliedJob?.createdAt?.split('T')[0]}</TableCell>
              <TableCell className="px-4 py-2">{appliedJob.job?.title}</TableCell>
              <TableCell className="px-4 py-2">{appliedJob.job?.company?.name}</TableCell>
              <TableCell className="text-right px-4 py-2">
                <Badge className={`${appliedJob?.status === 'rejected' ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                  {appliedJob.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
