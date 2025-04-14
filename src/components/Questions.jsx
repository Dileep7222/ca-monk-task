import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions.json";
import { FiArrowRight } from "react-icons/fi";

const Questions = () => {
    const navigate = useNavigate();
    const allQuestions = questions.data.questions;
    const totalQuestions = allQuestions.length;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [blanks, setBlanks] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const [results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);


    const currentQuestion = allQuestions[currentIndex];
    const sentenceParts = currentQuestion.question.split("_____________");

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    handleAutoNext();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(countdown);
    }, [currentIndex]);

    const handleWordClick = (word) => {
        const firstEmptyIndex = blanks.findIndex((b) => b === "");
        if (firstEmptyIndex !== -1) {
            const updated = [...blanks];
            updated[firstEmptyIndex] = word;
            setBlanks(updated);
        }
    };

    const handleBlankClick = (index) => {
        const updated = [...blanks];
        updated[index] = "";
        setBlanks(updated);
    };

    const handleNext = () => {
        const userAnswer = blanks.join(" ");
        const correctAnswer = currentQuestion.correctAnswer.join(" ");
        const isCorrect = userAnswer === correctAnswer;

        if (isCorrect) setScore((prev) => prev + 1);

        const detailedResults = {
            question: currentQuestion.question,
            correctAnswer: correctAnswer,
            userAnswer: userAnswer,
            status: isCorrect ? "correct" : "incorrect",
        };

        setResults((prev) => [...prev, detailedResults]);

        const nextIndex = currentIndex + 1;
        setProgress(((nextIndex) / totalQuestions) * 100);

        if (nextIndex < totalQuestions) {
            setCurrentIndex(nextIndex);
            setBlanks(["", "", "", ""]);
            setTimer(30);
        } else {
            // Finished all questions - go to result
            navigate("/result", {
                state: {
                    score,
                    total: totalQuestions,
                    results: [...results, detailedResults],
                },
            });
        }
    };

    const handleAutoNext = () => {
        // Record unattempted as incorrect
        const detailedResults = {
            question: currentQuestion.question,
            correctAnswer: currentQuestion.correctAnswer.join(" "),
            userAnswer: blanks.every((b) => b === "") ? "Unattempted" : blanks.join(" "),
            status: blanks.every((b) => b === "") ? "unattempted" : "incorrect",
        };

        setResults((prev) => [...prev, detailedResults]);

        const nextIndex = currentIndex + 1;
        if (nextIndex < totalQuestions) {
            setCurrentIndex(nextIndex);
            setBlanks(["", "", "", ""]);
            setTimer(30);
        } else {
            navigate("/result", {
                state: {
                    score,
                    total: totalQuestions,
                    results: [...results, detailedResults],
                },
            });
        }
    };

    const isFilled = blanks.every((b) => b !== "");

    return (
            <div className="max-w-4xl mx-auto bg-gray-50 p-4 sm:p-6 mt-8 bg-white shadow-lg rounded-xl h-full min-h-[80vh]">
                <div className="flex flex sm:flex-row justify-between items-center mb-4 text-gray-700 font-semibold text-lg gap-2">
                    <div className="mt-1 sm:mb-1">⏱️ 0:{String(timer).padStart(2, "0")}</div>
                    <button
                        className="text-red-600 border border-red-300 hover:bg-red-100 rounded-md px-6 py-2"
                        onClick={() => setShowModal(true)}
                    >
                        Quit
                    </button>

                </div>

                <div className="grid grid-cols-10 gap-1 mb-8">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full ${i < currentIndex ? "bg-orange-400" : "bg-gray-300"}`}
                        />
                    ))}
                </div>

                <h2 className="text-center text-base sm:text-lg font-semibold text-gray-500 mb-6">
                    Select the missing words in the correct order
                </h2>

                <div className="text-center text-sm sm:text-base text-gray-700 mb-6 leading-relaxed break-words">
                    {sentenceParts.map((part, index) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < 4 && (
                                <span
                                    onClick={() => handleBlankClick(index)}
                                    className={`inline-flex items-center justify-center w-20 sm:w-24 h-10 mx-1 my-2 cursor-pointer font-medium rounded-md text-center
                  ${blanks[index]
                                            ? "border-2 border-blue-200 bg-white text-gray-600"
                                            : ""
                                        }`}
                                >
                                    {blanks[index] || " ____________"}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                    {currentQuestion.options.map((word, idx) => {
                        const isUsed = blanks.includes(word);
                        return (
                            <button
                                key={idx}
                                className={`px-4 py-2 rounded-lg text-sm sm:text-base border-2 bg-white border-blue-300 transition-all duration-150 ${isUsed
                                    ? "bg-white text-gray-500 invisible "
                                    : "bg-white  hover:bg-gray-200 text-gray-700"
                                    }`}
                                onClick={() => handleWordClick(word)}
                                disabled={isUsed}
                            >
                                {word}
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-center">
                    <button
                        className={`px-6 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center gap-2 text-sm sm:text-base ${!isFilled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                            }`}
                        onClick={handleNext}
                        disabled={!isFilled}
                    >
                        Next <FiArrowRight size={18} />
                    </button>
                </div>
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-[90%] sm:w-[400px] text-center">
                            <p className="text-lg font-medium mb-4">
                                Are you sure you want to quit? <br /> None of your answers will be saved.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
                                    onClick={() => navigate("/homepage")}
                                >
                                    Quit
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
    );
};

export default Questions;
