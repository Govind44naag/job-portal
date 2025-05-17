import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState('')
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (e) {
            toast.error(e?.response?.data?.message || "Something went wrong!")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
            <Navbar />
            <main className="max-w-3xl mx-auto mt-16 px-4">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your Company Name</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            What would you like to name your company? You can change this later.
                        </p>
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="companyName" className="text-gray-700 dark:text-gray-300">
                            Company Name
                        </Label>
                        <Input
                            id="companyName"
                            type="text"
                            placeholder="JobHunt, Google, etc..."
                            className="mt-2"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={() => navigate('/admin/companies')}>
                            Cancel
                        </Button>
                        <Button onClick={registerNewCompany} disabled={!companyName.trim()}>
                            Continue
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CompanyCreate
