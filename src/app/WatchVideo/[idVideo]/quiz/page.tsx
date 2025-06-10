'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { submitQuizScore } from '@/lib/api';
import { getQuizByVideoId } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Answer {
  answer_id: number;
  answer: string;
  is_correct: boolean;
}

interface Question {
  question_id: number;
  title: string;
  position: number;
  answers: Answer[];
}

interface Quiz {
  quiz_id: number;
  video_id: number;
  title: string;
  question: Question[];
}

// Add this interface near your other interfaces
interface UserQuizScore {
  user_id: number;
  quiz_id: number;
  score: number;
}

const QuizPage = () => {
  const { idVideo } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, number>>(new Map());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  // Add this state to your component
  const [previousScore, setPreviousScore] = useState<UserQuizScore | null>(null);
  const [scoreLoading, setScoreLoading] = useState(false);

  const OPTION_COLORS = [
    'bg-red-200',  // Red
    'bg-green-200',  // Green
    'bg-yellow-200',  // Yellow
    'bg-blue-200',  // Blue
  ];

  const submitScore = async () => {
    if (!quiz) return;

    try {
      const response = await fetch('${API_URL}/user-quiz/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          quiz_id: quiz.quiz_id,
          score: score,
        }),
      });

      const data = await response.json();

      if (data.status !== "Success") {
        console.error('Failed to save score:', data.error);
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  // Add this function to your component
  const fetchPreviousScore = async (quizId: number) => {
    if (!quizId) return;

    setScoreLoading(true);
    try {
      const response = await fetch(`${API_URL}/user-quiz/?quiz_id=${quizId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();

      if (data.status === 'Authorized' && data.response) {
        setPreviousScore(data.response);
      }
    } catch (error) {
      console.error('Error fetching previous score:', error);
    } finally {
      setScoreLoading(false);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizByVideoId(idVideo as string);
        if (data.status === 'Authorized') {
          setQuiz(data.response);
        } else {
          setError(data.error || 'Quiz not found');
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError('Failed to load quiz');
      } finally {
        setIsLoading(false);
      }
    };

    if (idVideo) {
      fetchQuiz();
    }
  }, [idVideo]);

  const handleAnswerSelect = (answerId: number) => {
    const currentQuestion = quiz?.question[currentQuestionIndex];
    if (currentQuestion) {
      setSelectedAnswers((prev) => new Map(prev).set(currentQuestion.question_id, answerId));
    }
  };

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (quiz) {
      setSubmissionStatus('loading');

      let correctAnswers = 0;
      quiz.question.forEach((question) => {
        const selectedAnswerId = selectedAnswers.get(question.question_id);
        if (selectedAnswerId) {
          const selectedAnswer = question.answers.find(
            (answer) => answer.answer_id === selectedAnswerId
          );
          if (selectedAnswer?.is_correct) {
            correctAnswers++;
          }
        }
      });

      // Calculate percentage score (0-100)
      const percentageScore = Math.round((correctAnswers / quiz.question.length) * 100);

      // Set both the raw score and percentage for display
      setScore(correctAnswers); // This is used in your popup display
      const scoreToStore = percentageScore; // This is what we'll send to the backend

      try {
        // Send the percentage score to backend
        await submitQuizScore(quiz.quiz_id, scoreToStore);
        setSubmissionStatus('success');
      } catch (error: any) {
        console.error('Score submission failed:', error);
        setSubmissionStatus('error');
        setError(`Failed to save score: ${error.message}`);
      }

      setIsSubmitted(true);
      setShowScorePopup(true);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const closePopup = () => {
    setShowScorePopup(false);
  };

  // Calculate percentage for the pie chart
  const calculatePercentage = () => {
    if (!quiz) return 0;
    return Math.round((score / quiz.question.length) * 100);
  };

  // Pie chart component
  const PieChart = ({ percentage }: { percentage: number }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <svg width="180" height="180" viewBox="0 0 180 180" className="mx-auto mb-4">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
        />
        <text
          x="90"
          y="90"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold text-white"
          fill="white"
        >
          {percentage}%
        </text>
      </svg>
    );
  };

  const currentQuestion = quiz?.question[currentQuestionIndex];
  const isLastQuestion = quiz && currentQuestionIndex === quiz.question.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasSelectedAnswer = currentQuestion && selectedAnswers.has(currentQuestion.question_id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4 bg-quiz">
        <div className="min-w-5/6 mx-20 my-10 p-5 bg-gray-900/90 rounded-lg shadow-md text-center relative">
          <p className="text-white">Loading quiz data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4 bg-quiz">
        <div className="min-w-5/6 mx-20 my-10 p-5 bg-gray-900/90 rounded-lg shadow-md text-center relative">
          <p className="text-red-500">{error}</p>
          <button
            onClick={handleBack}
            className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-quiz">
      <div className="min-w-5/6 mx-20 my-10 p-5 bg-gray-900/90 rounded-lg shadow-md text-center relative">
        <h1 className="text-2xl font-bold text-white mb-6 max-md:text-lg">
          {quiz ? quiz.title : 'Quiz'}
        </h1>

        {quiz ? (
          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / quiz.question.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-md text-gray-200">
              Question {currentQuestionIndex + 1} of {quiz.question.length}
            </p>

            {/* Current question */}
            <div className="space-y-3">
              <div className="flex">
                <h2 className="text-4xl font-semibold text-white flex-1 text-left mb-10 mt-5 max-md:text-xl max-md:mb-5 max-md:mt-2">
                  {currentQuestion?.title}
                </h2>
              </div>
              <div className="flex gap-2 mt-10 max-md:flex max-md:mt-5 max-md:flex-col max-lg:grid max-lg:grid-cols-2">
                {currentQuestion?.answers.map((answer, index) => {
                  const isSelected = selectedAnswers.get(currentQuestion.question_id) === answer.answer_id;
                  const bgColor = OPTION_COLORS[index % OPTION_COLORS.length];

                  return (
                    <div
                      key={answer.answer_id}
                      className={`flex-1 p-3 mx-2 h-35 rounded-lg cursor-pointer transition-all duration-200 flex justify-center items-center ${isSelected
                        ? `${bgColor} border border-white scale-[1.05]`
                        : `${bgColor} bg-opacity-20 hover:bg-opacity-30 hover:scale-[1.05]`
                        }`}
                      onClick={() => handleAnswerSelect(answer.answer_id)}
                    >
                      <input
                        type="radio"
                        id={`answer-${answer.answer_id}`}
                        name={`question-${currentQuestion.question_id}`}
                        value={answer.answer_id}
                        checked={isSelected}
                        onChange={() => { }}
                        className="hidden"
                      />
                      <label htmlFor={`answer-${answer.answer_id}`} className="cursor-pointer text-black text-2xl max-md:text-lg">
                        {answer.answer}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevQuestion}
                disabled={isFirstQuestion}
                className={`py-2 px-4 rounded-md transition-colors ${isFirstQuestion ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                Previous
              </button>

              {!isLastQuestion ? (
                <button
                  onClick={handleNextQuestion}
                  disabled={!hasSelectedAnswer}
                  className={`py-2 px-4 rounded-md transition-colors ${!hasSelectedAnswer ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!hasSelectedAnswer}
                  className={`py-2 px-4 rounded-md transition-colors max-sm:py-1 max-sm:px-1 max-sm:text-md ${!hasSelectedAnswer ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-white">No quiz data available</p>
        )}

        {/* Score Popup */}
        {showScorePopup && (
          <div className="fixed inset-0 bg-quiz bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900/90 p-8 rounded-lg shadow-xl max-w-sm w-full max-sm:w-5/6">
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
              <PieChart percentage={calculatePercentage()} />
              <p className="text-lg mb-6 text-white">
                You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{quiz?.question.length}</span> questions correctly
              </p>

              {submissionStatus === 'loading' && (
                <p className="text-yellow-400 mb-4">Saving your score...</p>
              )}
              {submissionStatus === 'error' && (
                <p className="text-red-400 mb-4">Failed to save score (but you can still try again later)</p>
              )}

              <button
                onClick={handleBack}
                className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Back to Video
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;