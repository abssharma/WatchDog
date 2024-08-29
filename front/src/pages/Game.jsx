import one from '../assets/q1.png';
import two from '../assets/q2.png';
import three from '../assets/q3.png';
import four from '../assets/q4.png';
import five from '../assets/q5.png';
import backgroundImage from '../assets/gamebg.jpg';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const scenarios = [
  {
    image: one,
    question: 'What should you do if you see an animal being neglected?',
    options: [
      { text: 'Ignore it', isCorrect: false },
      { text: 'Report it to local authorities', isCorrect: true },
      { text: 'Approach the animal and feed it', isCorrect: false },
      { text: 'Take the animal home', isCorrect: false }
    ]
  },
  {
    image: two,
    question: 'Which of these is a sign of animal abuse?',
    options: [
      { text: 'Healthy weight and shiny fur', isCorrect: false },
      { text: 'Visible injuries and malnutrition', isCorrect: true },
      { text: 'Regular grooming and vaccinations', isCorrect: false },
      { text: 'Playful behavior and a clean environment', isCorrect: false }
    ]
  },
  {
    image: three,
    question: 'What is the first step to take when you witness animal cruelty?',
    options: [
      { text: 'Take photos and videos', isCorrect: false },
      { text: 'Contact local animal control', isCorrect: true },
      { text: 'Post about it on social media', isCorrect: false },
      { text: 'Try to intervene yourself', isCorrect: false }
    ]
  },
  {
    image: four,
    question: 'What can you do to help prevent animal cruelty in your community?',
    options: [
      { text: 'Support local shelters and rescue organizations', isCorrect: true },
      { text: 'Ignore animal welfare issues', isCorrect: false },
      { text: 'Spread misinformation about animal laws', isCorrect: false },
      { text: 'Avoid talking about animal cruelty', isCorrect: false }
    ]
  },
  {
    image: five,
    question: 'Which of these practices is considered animal abuse?',
    options: [
      { text: 'Providing a safe and loving home', isCorrect: false },
      { text: 'Ensuring regular veterinary care', isCorrect: false },
      { text: 'Training an animal with harsh methods', isCorrect: true },
      { text: 'Giving proper food and exercise', isCorrect: false }
    ]
  }
];

const Game = () => {
  const [scenario, setScenario] = useState(getRandomScenario());
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');

  function getRandomScenario() {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    return scenarios[randomIndex];
  }

  const handleOptionClick = (isCorrect) => {
    if (isCorrect) {
      setFeedback('Correct! Well done.');
    } else {
      setFeedback('Incorrect. Try again!');
    }
    
    // Load a new scenario after a short delay
    setTimeout(() => {
      setScenario(getRandomScenario());
      setSelectedOption(null);
      setFeedback('');
    }, 2000);
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

      <div className="relative z-10 container mx-auto p-12">
        <div className="text-center mb-12">
        <img
          src={scenario.image}
          alt="Scenario"
          className="object-cover max-w-md mx-auto mb-6 rounded-xl shadow-lg size-48"
       />
          <p className="text-2xl font-semibold text-white mb-6 leading-relaxed">
            {scenario.question}
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            {scenario.options.map((option, index) => (
              <div
                key={index}
                className={`bg-black rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${
                  option.isCorrect ? 'hover:bg-green-500' : 'hover:bg-red-500'
                }`}
                onClick={() => handleOptionClick(option.isCorrect)}
              >
                <div className="p-4">
                  <p className="text-lg font-semibold text-white">{option.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        

        <div className="text-center mt-12">
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

export default Game;
