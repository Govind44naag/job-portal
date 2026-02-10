import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontalIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const shortListingStatus = ['Accepted', 'Rejected']


const ApplicantsTable = ({ onStatusUpdated }) => {
    const { applicants } = useSelector(store => store.application)
    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true })

            if (res.data.success) {
                toast.success(res.data.message)
                onStatusUpdated?.()
            }
        } catch (e) {
            
            const msg = (e?.response?.data?.message) ?? e?.message ?? 'Network error'
            toast.error(msg)
        }
    }
    return (
        <div>

            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right '>Action</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
    {
        applicants && applicants?.application?.map((item) => (
            <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell > 
                    {item.applicant?.profile?.resume ? 
                        <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resumeOriginalName} target='_blank' rel='noopener noreferrer'>
                            {item?.applicant?.profile?.resumeOriginalName}
                        </a> 
                        : 
                        <span>No resume uploaded</span>
                    }   
                </TableCell>
                <TableCell>{item?.applicant?.createdAt.split('T')[0]}</TableCell>
                <TableCell className='float-right cursor-pointer'>
                    <Popover>
                        <PopoverTrigger>
                            <MoreHorizontalIcon />
                        </PopoverTrigger>
                        <PopoverContent className='w-32'>
                            {
                                shortListingStatus.map((status, index) => (
                                   <button  onClick={() => statusHandler(status, item?._id)}  key={index}
                       className={`flex w-fit items-center my-2 px-3 py-1 rounded cursor-pointer border transition-all ${status === "Accepted"
                                  ? "border-green-600 text-green-700 hover:bg-green-200 active:bg-green-600 active:text-white"
                                    : "border-red-600 text-red-700 hover:bg-red-200 active:bg-red-600 active:text-white"
                   }
                        `}
>
  <span>{status}</span>
</button>

                                ))
                            }
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableRow>
        ))
    }
</TableBody>


            </Table>
        </div>
    )
}

export default ApplicantsTable
