import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { Search } from 'lucide-react';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="max-w-6xl mx-auto my-12 px-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 
                  transition-all duration-200"
                placeholder="Search companies by name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <Button
              onClick={() => navigate('/admin/companies/create')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-2 
                transition-all duration-200 transform hover:scale-105"
            >
              Add New Company
            </Button>
          </div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;