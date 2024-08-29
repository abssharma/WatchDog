import React, { useEffect, useState } from 'react';
import axios from 'axios';

import backgroundImage from '../assets/gamebg.jpg';

const Detection = () => {
    const [results, setResults] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:4000/test-img');
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching image results:', error);
            }
        };

        fetchResults();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % results.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + results.length) % results.length);
    };

    return (
        <div className="mt-2 p-8 mx-10 items-center">
            <div className="absolute inset-0">
                <img
                src={backgroundImage}
                alt="Background"
                className="object-cover w-full h-full"
                />
            </div>
            
            <div className="relative w-full max-w-screen-lg flex justify-center items-center">
                <button 
                    onClick={handleNext} 
                    className=" bg-black text-white p-2 rounded mx-8 hover:bg-white hover:text-black"
                    aria-label="Previous Image"
                >
                    PREV
                </button>
                
                <div className="flex-none bg-black mt-20 shadow-md h-96 w-96 size-max">
                    {results.length > 0 ? (
                        <img 
                            src={`http://localhost:4000/test-img/${results[currentIndex].filename}`} 
                            alt={`Image ${currentIndex + 1} classified as ${results[currentIndex].label}`} 
                            className="w-full h-full object-cover mb-2"
                        />
                    ) : (
                        <p className="text-center text-lg font-medium">Loading...</p>
                    )}
                </div>
                
                <button 
                    onClick={handleNext} 
                    className=" bg-black text-white p-2 rounded mx-8 hover:bg-white hover:text-black"
                    aria-label="Next Image"
                >
                    NEXT
                </button>
                <div className="bg-white p-4 rounded shadow-md w-full max-w-screen-lg">
                    <p className="text-center text-lg font-medium">
                        {results.length > 0 ? results[currentIndex].label : 'No results available'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detection;
