import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
   const { allAdminJobs,searchJobByText } = useSelector(store => store.job)
  // Ensure companies is always an array to avoid errors
   const navigate = useNavigate()
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
  useEffect(() => {
    const filteredJobs = allAdminJobs?.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
    })
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAdminJobs?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  You haven't registered any company yet!
                </TableCell>
              </TableRow>
            ) : (
              filterJobs?.map((job) => (

                <TableRow key={job?._id}>

                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>
                    {/* Ensure company.createAt is valid before calling .split */}
                    {job?.createdAt ? job?.createdAt.split('T')[0] : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center cursor-pointer">
                          <Edit2 className="w-4" />
                          <span className='font-bold'>Edit</span>
                     </div>
                        <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                          <Eye />
                          <p className='font-bold'>Applicants</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>

              ))
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
