import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bground1.png';

const Home = () => {
  return (
    <div>

      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      <div>
        <header className="relative text-center mb-16 w-6">
          <br/>
          <h1 className="text-8xl font-extrabold">WATCH DOGS</h1>
        </header>
        <section className="px-10 py-100 grid lg:grid-cols-3 gap-6 p-18 mt-16">

          
        
        <div className="bg-white p-8 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-black mb-4">Report Animal Abuse</h2>
            <p className="text-black leading-relaxed">
            Submit reports and upload evidence of animal cruelty directly from your phone. Your actions can make a significant impact.
            </p>
          </div>
          <Link 
            to="/report" 
            className="mt-6 inline-block bg-white text-black py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105">
            Learn More
          </Link>
        </div>
          
          
          <div className="bg-black rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col justify-between p-8 mt-16">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Play Mini Game</h2>
              <p className="text-white leading-relaxed">
                Explore our educational game to learn about animal rights and ways to prevent cruelty. Knowledge is power.
              </p>
            </div>
            <Link 
              to="/game" 
              className="mt-6 inline-block bg-white text-black py-2 px-4 rounded-lg shadow-md hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105">
              Learn More
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-black mb-4">AI-Powered Detection</h2>
            <p className="text-gray-800 leading-relaxed">
              Our AI analyzes images and videos to identify potential signs of abuse. Advanced technology working for animal safety.
            </p>
          </div>
          <Link 
            to="/detection" 
            className="mt-6 inline-block bg-white text-black py-3 px-6 rounded-lg shadow-md hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105">
            Learn More
          </Link>
        </div>

        </section>
      </div>
    </div>
  );
}

export default Home;