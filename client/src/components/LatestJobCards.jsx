import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-xl bg-white border border-gray-100 shadow-lg cursor-pointer 
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="font-semibold text-xl text-gray-800">
            {job?.company?.name || 'Company Name'}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-gray-500">
            <MapPin className="h-4 w-4 text-indigo-600" />
            <p className="text-sm">{job?.location || 'India'}</p>
          </div>
        </div>
        {job?.company?.logo && (
          <img
            src={job.company.logo}
            alt="Company Logo"
            className="h-10 w-10 rounded-full object-cover border border-gray-200"
          />
        )}
      </div>

      <div className="mb-4">
        <h1 className="font-bold text-xl text-gray-900 mb-2">
          {job?.title || 'Job Title'}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description || 'No description available.'}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          className="bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full 
            hover:bg-indigo-200 transition-colors duration-200"
        >
          <Briefcase className="h-4 w-4 mr-1 inline" />
          {job?.position || 'Position'}
        </Badge>
        <Badge
          className="bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full 
            hover:bg-purple-200 transition-colors duration-200"
        >
          {job?.jobType || 'Job Type'}
        </Badge>
        <Badge
          className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full 
            hover:bg-green-200 transition-colors duration-200"
        >
          <DollarSign className="h-4 w-4 mr-1 inline" />
          {job?.salary || 'Salary'}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;