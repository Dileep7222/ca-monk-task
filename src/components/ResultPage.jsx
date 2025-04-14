import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";


const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, results, total } = location.state || {};

  const correct = results.filter(r => r.status === "correct").length;
  const incorrect = results.filter(r => r.status === "incorrect").length;
  const unattempted = results.filter(r => r.status === "unattempted").length;

  return (
    <div className="min-h-screen bg-gray-50 p- overflow-x-hidden flex flex-col items-center">
      <div className="w-screen flex bg-white">
       <button onClick={() => navigate("/questions")} className="ml-10 "><FaArrowLeft /></button>
      <h1 className="text-xl m-auto mt-5 mb-5">Sentence Construction</h1>
      <HiOutlineDotsVertical className="mr-10 mt-6" />
      </div>

      <div className="bg-gray-100 mt-10 p-6 rounded-lg shadow w-full max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-green-500 mb-2">{(score*100)/10}</h2>
        <p className="text-gray-600 mb-4">Score</p>

        <p className="text-gray-500 mb-6">
        While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details        </p>

        <div className="flex justify-around mb-6 text-sm sm:text-base">
          <div className="text-green-600 font-semibold">Correct: {correct}</div>
          <div className="text-red-500 font-semibold">Incorrect: {incorrect}</div>
          <div className="text-yellow-500 font-semibold">Unattempted: {unattempted}</div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="border-2 border-blue-500 text-blue-800 px-6 py-2 rounded-md hover:bg-blue-400"
        >
          Go to Dashboard
        </button>
      </div>

      <div className="w-full max-w-2xl mt-10 space-y-4">
        {results.map((item, idx) => (
          <div
          key={idx}
          className={`p-4 border-l-2 ${
            item.status === "correct"
            ? "border-green-400 bg-green-50"
            : item.status === "incorrect"
            ? "border-red-400 bg-red-50"
            : "border-yellow-400 bg-yello-50"
          } rounded shadow-sm`}
          >  <div className="flex w-full justify-between">
            <div key={idx}
          className={` ${
            item.status === "correct"
            ? "text-green-600"
            : item.status === "incorrect"
            ? "text-red-600"
            : "text-yellow-500"
          } `}>
             {
               item.status === "correct"
               ? "correct"
               : item.status === "incorrect"
               ? "incorrect"
               : "Unattempted"
             }
            </div>
            <div className="text-sm text-gray-400">{idx+1}/{total}</div>
          </div>
            <p className="text-sm text-gray-600 mb-1">Question: {item.question}</p>
            <p className="font-medium text-zinc-500">
              Your answer:{" "}
              <span className="text-gray-600">{item.userAnswer || "Unattempted"}</span>
            </p>
            <p className="text-md text-zinc-700">Correct: {item.correctAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
