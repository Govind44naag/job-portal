import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      );
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto mt-10 px-4">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <FilterCard />
          </aside>

          {/* Job list */}
          <section className="md:col-span-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {searchedQuery ? `Results for "${searchedQuery}"` : 'All Jobs'}
            </h2>

            {filterJobs?.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400 font-semibold">
                No jobs found 🚫
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md dark:shadow-lg hover:shadow-indigo-300 dark:hover:shadow-purple-500/40 transition-shadow duration-300"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
