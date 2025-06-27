import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2, Menu } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (e) {
            console.error(e)
            toast.error(e.response?.data?.message || 'Logout failed')
        }
    }

    const navLinks = user && user.role === 'recruiter' ? (
        <>
            <li><Link to="/admin/companies" className="hover:text-indigo-600">Companies</Link></li>
            <li><Link to="/admin/jobs" className="hover:text-indigo-600">Jobs</Link></li>
        </>
    ) : (
        <>
            <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-indigo-600">Jobs</Link></li>
            <li><Link to="/browse" className="hover:text-indigo-600">Browse</Link></li>
        </>
    )

    return (
        <header className="bg-black/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                {/* Logo */}
                <h1 className="text-2xl font-extrabold text-red-500">
                    Placement <span className="text-indigo-600">Portal</span>
                </h1>

                {/* Mobile Menu Toggle */}
                <button 
                    className="lg:hidden text-white" 
                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    <ul className="flex font-medium items-center gap-6 text-white">
                        {navLinks}
                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline" className="border-indigo-300 text-indigo-600 hover:bg-indigo-50">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage 
                                        className="rounded-full h-10 w-10 border-2 border-indigo-200 hover:border-indigo-400" 
                                        src={user?.profile?.profilePhoto} 
                                        alt="User profile" 
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 bg-white rounded-lg shadow-xl p-4 border border-gray-100">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar>
                                            <AvatarImage className="rounded-full h-12 w-12" src={user?.profile?.profilePhoto} alt="User profile" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{user?.fullName}</h4>
                                            <p className="text-sm text-gray-500 line-clamp-2">{user?.profile?.bio || 'No bio available'}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {user.role === 'student' && (
                                            <Link to="/profile">
                                                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                                                    <User2 className="mr-2 h-4 w-4" />
                                                    View Profile
                                                </Button>
                                            </Link>
                                        )}
                                        <Button variant="ghost" onClick={logoutHandler} className="w-full justify-start text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </nav>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden px-4 pb-4">
                    <ul className="flex flex-col gap-3 text-white">
                        {navLinks}
                    </ul>

                    {!user ? (
                        <div className="mt-4 flex flex-col gap-3">
                            <Link to="/login">
                                <Button variant="outline" className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-4 flex flex-col gap-2">
                            {user.role === 'student' && (
                                <Link to="/profile">
                                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-indigo-400">
                                        <User2 className="mr-2 h-4 w-4" />
                                        View Profile
                                    </Button>
                                </Link>
                            )}
                            <Button variant="ghost" onClick={logoutHandler} className="w-full justify-start text-gray-300 hover:text-indigo-400">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}

export default Navbar
