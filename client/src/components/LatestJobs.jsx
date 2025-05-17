import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="min-h-screen bg-slate-900 py-24 px-4">
      <div className="max-w-7xl mx-auto bg-slate-800 rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Latest & Top
            </span>{' '}
            Job Openings
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Discover exciting career opportunities from leading companies. Your dream job awaits!
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs && allJobs.length > 0 ? (
            allJobs.slice(0, 6).map((job) => (
              <div
                key={job._id}
                className="transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              >
                <LatestJobCards job={job} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-14 bg-slate-700 rounded-2xl border border-slate-600">
              <p className="text-xl text-slate-200 font-semibold">
                No Job Openings Available
              </p>
              <p className="text-slate-400 mt-2">
                Check back later for exciting new opportunities!
              </p>
              <a href="/browse">
                <button className="mt-5 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium hover:from-indigo-600 hover:to-purple-700 transition duration-200">
                  Browse All Jobs
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
