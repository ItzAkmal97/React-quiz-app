import React, { useState, useCallback, useRef } from 'react';
import questions from '../questions.js';
import StartScreen from './StartScreen.jsx';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

/**
 * Quiz component for the React Quiz application.
 *
 * The Quiz component renders a question and its answers to the user.
 * The user can select an answer by clicking on it.
 * The component keeps track of the user's answers in the state variable userAnswers.
 * When the user has answered all questions, the component displays a summary message.
 *
 * @returns {JSX.Element} The rendered quiz component.
 */
export default function Quiz() {
    // State variable to keep track of the user's answers
    const [userAnswers, setUserAnswers] = useState([]);
    const [startQuiz, setStartQuiz] = useState(false);
    const [score, setScore] = useState(0);

    const activeQuestionIndex = userAnswers.length;

    // Check if the quiz is over
    const quizIsOver = activeQuestionIndex === questions.length;

    const handleAnswerClick = useCallback((selectedAnswer) => {
        if (activeQuestionIndex < questions.length) {
            const correctAnswer = questions[activeQuestionIndex]?.answers[0];
            setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
            if (selectedAnswer === correctAnswer) {
                setScore((prevScore) => prevScore + 1);
            }
        }
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleAnswerClick(null), [handleAnswerClick]);


    // If the quiz is over, render the summary message
    if (quizIsOver) {
        return (
            // <div id="summary">
            //     {/* Render the completion message */}
            //     <img src={quizCompleted} alt='Quiz Completed'/>
            //     <h2>Your Score: {score}</h2>
            //     <button onClick={() => setUserAnswers([])}>Restart</button>
            // </div>
            <Summary userAnswers={userAnswers} onRestart={() => setUserAnswers([])} onSkip={handleSkipAnswer}/>
        )
    }

    return (
        <div id='quiz'>
            {!startQuiz ? (
                <StartScreen onClick={() => setStartQuiz(true)}/>
            ) : (
                <Question
                    key={activeQuestionIndex}
                    index={activeQuestionIndex}
                    onSelectAnswer={handleAnswerClick}
                    onSkipAnswer={handleSkipAnswer}
                    
                />
            )}
        </div>
    )
}
