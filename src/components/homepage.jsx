import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex flex-col justify-start bg-zinc-100">
            <div className="h-16 flex items-center justify-between px-4 sm:px-8 bg-white shadow">
                <h1 className="text-lg sm:text-2xl  ml-[38%] font-semibold">Sentence Construction</h1>
                <span className="text-2xl text-gray-600">
                    <BsThreeDotsVertical />
                </span>
            </div>

            <div className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-6">
                    <img src="./write.png" alt="write" className="w-12 h-20 object-contain" />
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold mb-4">Sentence Construction</h1>
                <p className="text-gray-500 text-sm sm:text-base font-semibold mb-8">
                    Select the correct words to complete the sentence by arranging the provided options in the right order.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-10">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-sm sm:text-base">Time Per Question</h1>
                        <p className="text-zinc-500 font-bold">30 sec</p>
                    </div>
                    <div className="hidden sm:block text-zinc-300 text-3xl">|</div>
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-sm sm:text-base">Total Questions</h1>
                        <p className="text-zinc-500 font-bold">10</p>
                    </div>
                    <div className="hidden sm:block text-zinc-300 text-3xl">|</div>
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-sm sm:text-base">Coins</h1>
                        <p className="text-zinc-500 font-bold">🪙0</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        className="px-8 py-2 bg-white text-blue-800 border-2 border-blue-800 rounded-md hover:bg-gray-300 transition"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                    <button
                        className="px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={() => navigate('/questions')}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
