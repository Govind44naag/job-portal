import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/jobs" className="hover:text-blue-400 transition-colors">Find Jobs</a></li>
              <li><a href="/post-job" className="hover:text-blue-400 transition-colors">Post a Job</a></li>
              <li><a href="/companies" className="hover:text-blue-400 transition-colors">Companies</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:support@jobportal.com" className="hover:text-blue-400 transition-colors">support@jobportal.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">+1 (234) 567-890</a></li>
              <li>Address: 123 Job Street, Career City, CC 12345</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;