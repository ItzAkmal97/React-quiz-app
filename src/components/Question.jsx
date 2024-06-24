import { useState } from 'react';

import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import questions from '../questions.js';

/**
 * Question component for the React Quiz application.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onSelectAnswer - The function to be called when an answer is selected.
 * @param {function} props.onSkipAnswer - The function to be called when the skip answer option is selected.
 * @param {number} props.index - The index of the current question.
 * @returns {JSX.Element} The rendered question component.
 */
export default function Question({onSelectAnswer, onSkipAnswer, index}) {
    
    // State variable to keep track of the user's selected answer and its correctness
    const [answer, setAnswer] = useState({
        selectedAnswer: '', // The currently selected answer
        isCorrect: null // Whether the answer is correct or not
    });

    // Determine the timer duration based on the user's answer
    let timer = 10000;
    if(answer.selectedAnswer) {
        timer = 1000;
    }
    if(answer.isCorrect !== null) {
        timer = 2000;
    }

    /**
     * Handle the user's answer selection.
     *
     * @param {string} answer - The selected answer.
     */
    const handleAnswerClick = (answer) => {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: questions[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer)
            }, 2000);
        }, 1000);
    }
    
    // Determine the state of the answer based on the user's selection and correctness
    let answerState = '';
    if(answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if(answer.selectedAnswer){
        answerState = 'answered';
    }

    return (
        <div id="question">
            {/* Render the question timer */}
            <QuestionTimer
                key={timer} 
                timeout={timer} 
                onTimeout={answer.selectedAnswer ? null : onSkipAnswer}
                mode={answerState}
            />   
            {/* Render the question text */}
            <h2>{questions[index].text}</h2>
            {/* Render the list of answers */}
            <Answers
                answers={questions[index].answers} 
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}  
                onSelect={handleAnswerClick}
            />
        </div>
    )
}  
