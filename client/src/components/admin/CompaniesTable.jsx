import { AvatarImage } from '@radix-ui/react-avatar'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import {Button} from '../ui/button'
import React, { useEffect, useState } from 'react'
import { Avatar } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company)
  const safeCompanies = Array.isArray(companies) ? companies : []
  const [filteredCompanies, setFilteredCompanies] = useState(safeCompanies)
  const navigate = useNavigate()

  useEffect(() => {
    const filtered = safeCompanies.filter(company => {
      if (!searchCompanyByText) return true
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilteredCompanies(filtered)
  }, [safeCompanies, searchCompanyByText])

  return (
    <div className="overflow-x-auto w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm mt-4">
      <Table>
        <TableCaption className="text-gray-600 dark:text-gray-400 py-4">
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                You haven't registered any company yet!
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map(company => (
              <TableRow key={company?._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo || 'https://via.placeholder.com/40'}
                      alt="company logo"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                  {company.name}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {company?.createAt ? company.createAt.split('T')[0] : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                      <MoreHorizontal className="w-5 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 bg-white dark:bg-gray-800 border rounded shadow-md">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                        <Button onClick={() => navigate(`/admin/companies/${company._id}`)}>Edit</Button>

                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
