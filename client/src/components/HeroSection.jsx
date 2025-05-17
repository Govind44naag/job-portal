import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  return (
    <div className="relative min-h-[70vh] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center overflow-hidden">
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      <div className="relative z-10 text-center px-4 py-12 max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          <span className="mx-auto px-6 py-2 rounded-full bg-white/90 text-indigo-600 font-semibold text-sm tracking-wide shadow-md animate-pulse">
            #1 Platform for Career Success
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Discover, Apply & <br /> Land Your <span className="text-yellow-300">Dream Job</span>
          </h1>

          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Unlock your potential with top opportunities tailored just for you. Start your journey to success today!
          </p>

          <div className="flex w-full max-w-xl mx-auto shadow-xl border border-white/30 rounded-full items-center bg-white/95 overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <input
              type="text"
              placeholder="Search for Your Dream Job"
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none border-none px-6 py-3 text-gray-700 placeholder-gray-400 bg-transparent"
            />
            <Button 
              onClick={searchJobHandler} 
              className="rounded-r-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 transition-all duration-200"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
    </div>
  )
}

export default HeroSection