import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from "axios";
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';

const Signup = () => {
    const [input, setInput] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: ''
    })
    const { loading, user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput((prev) => ({ ...prev, file }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message)
            }
        }
        catch (e) {
            console.error(e);
            toast.error(e.response?.data?.message || "Something is missing. Please try again.");
        }
        finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
            <Navbar />
            <div className="flex items-center justify-center flex-grow p-4">
                <form 
                    onSubmit={submitHandler} 
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl"
                >
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Create Your Account
                    </h1>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                            <Input
                                type="text"
                                value={input.fullName}
                                name="fullName"
                                onChange={changeEventHandler}
                                placeholder="Govind Thakur"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="govindthakur@gmail.com"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                            <Input
                                type="text"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                                placeholder="+3244343"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Role</Label>
                            <RadioGroup className="flex items-center gap-6">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <Label className="text-gray-700 cursor-pointer">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <Label className="text-gray-700 cursor-pointer">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Profile Picture</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-200 cursor-pointer"
                            />
                        </div>

                        {loading ? (
                            <Button 
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 flex items-center justify-center transition-all duration-200"
                                disabled
                            >
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 transition-all duration-200 transform hover:scale-105"
                            >
                                Sign Up
                            </Button>
                        )}

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup