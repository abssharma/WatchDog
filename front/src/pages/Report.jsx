import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/gamebg.jpg';

const Report = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    description: '',
    evidence: null,
  });
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('description', formData.description);
    if (formData.evidence) {
      formDataToSend.append('evidence', formData.evidence);
    }

    try {
      const response = await fetch('http://localhost:4000/report', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      setSubmissionStatus(data.message || data.error);
    } catch (error) {
      setSubmissionStatus('An error occurred.');
    }

    setFormData({
      name: '',
      email: '',
      location: '',
      description: '',
      evidence: null,
    });
  };

  return (
    <div>

      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative z-10 container mx-auto">
        
        <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="mb-1">
            <label htmlFor="name" className="block text-lg font-semibold text-black mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg"
              required
            />
          </div>

          <div className="mb-1">
            <label htmlFor="email" className="block text-lg font-semibold text-black mb-2">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg"
              required
            />
          </div>

          <div className="mb-1">
            <label htmlFor="location" className="block text-lg font-semibold text-black mb-2">Location of Incident</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg"
              required
            />
          </div>

          <div className="mb-1">
            <label htmlFor="description" className="block text-lg font-semibold text-black mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-2">
            <label htmlFor="evidence" className="block text-lg font-semibold text-black mb-2">Upload Evidence</label>
            <input
              type="file"
              id="evidence"
              name="evidence"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 px-4 rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
          >
            Submit Report
          </button>

          {submissionStatus && (
            <p className="mt-2 text-center text-lg font-semibold text-green-600">
              {submissionStatus}
            </p>
          )}
        </form>
        <div className="text-center mt-1">
          <Link
            to="/"
            className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Report;
