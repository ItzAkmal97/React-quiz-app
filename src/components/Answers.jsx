import { useRef } from 'react';
/**
 * Component for rendering a list of answers.
 *
 * @param {Array} answers - The list of answers to be rendered.
 * @param {string} selectedAnswer - The currently selected answer.
 * @param {string} answerState - The state of the answer (correct, wrong, answered).
 * @param {function} onSelect - The function to be called when an answer is selected.
 * @returns {JSX.Element} The rendered list of answers.
 */
export default function Answers({answers, selectedAnswer, answerState, onSelect}){
    // Shuffle the answers array on the first render
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
    }

    // Check if the question is answered
    const isAnswered = answerState !== '';

    return (
        <div>
            <ul id="answers">
                {/* Map over the shuffled answers */}
                {shuffledAnswers.current.map((answer) => {
                    const isSelected = selectedAnswer === answer;
                    let cssClasses = '';

                    if(answerState === 'answered' && isSelected) {
                        cssClasses ='selected';
                    }

                    // Highlight the selected answer based on the answer state
                    if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                        cssClasses= answerState;
                    }

                    // Render the answer button
                    return (
                        <li key={answer} className='answer'>
                            <button
                                disabled={isAnswered}
                                onClick={() => onSelect(answer)}
                                className={cssClasses}
                            >
                                {answer}
                            </button>
                        </li>
                    )
                }  
                )}
            </ul>
        </div>
    )
}
