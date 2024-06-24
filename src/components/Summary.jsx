import quizCompleted from '../assets/quiz-complete.png';
import questions from '../questions.js';
/**
 * Summary component for the React Quiz application.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.userAnswers - The array of user answers.
 * @param {Function} props.onRestart - The function to be called when the restart button is clicked.
 * @returns {JSX.Element} The rendered summary component.
 */
export default function Summary({userAnswers, onRestart}) {

    // Calculate the number of correct and skipped answers
    const correctAnswer = userAnswers.filter((answer, index) => answer === questions[index].answers[0]);
    const skippedAnswer = userAnswers.filter(answer => answer === null);

    // Calculate the percentage of correct and skipped answers
    const correctPercentage = Math.round((correctAnswer.length / userAnswers.length) * 100);
    const skippedPercentage = Math.round((skippedAnswer.length / userAnswers.length) * 100);
    const incorrectPercentage = 100 - correctPercentage - skippedPercentage;

    return (
        <div id="summary">
            {/* Render the completion message */}
            <img src={quizCompleted} alt='Quiz Completed'/>
            <h2>Quiz Completed</h2>

            {/* Render the summary statistics */}
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedPercentage}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correctPercentage}%</span>
                    <span className="text">correct</span>
                </p>
                <p>
                    <span className="number">{incorrectPercentage}%</span>
                    <span className="text">Incorrect</span>
                </p>
            </div>

            {/* Render the user answers */}
            <ol>
                {userAnswers.map((userAnswer, index) => {
                    const question = questions[index];
                    const correctAnswer = question.answers[0];

                    let cssClass = 'user-answer';
                    if(userAnswer === null) {
                        cssClass += ' skipped';
                    } else if(userAnswer === correctAnswer){
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className='question'>{question.text}</p>
                            <p className={cssClass}>{userAnswer ?? 'Skipped'}</p>
                        </li>
                    )
                })}
            </ol>


            {/* Render the restart button */}
            <button onClick={onRestart}>Restart</button>
        </div>
    )
}
