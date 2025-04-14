import React from 'react';
import { GoArrowRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

function Start() {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/homepage');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center sm:text-left">
                    Sentence Construction
                </h1>
                <button
                    className="text-5xl border-2 mt-1 px-4 border-blue-400 rounded-md  sm:text-5xl text-blue-600 hover:text-blue-800 transition"
                    onClick={handleNavigation}
                >
                   <GoArrowRight />
                </button>
            </div>
        </div>
    );
}

export default Start;
