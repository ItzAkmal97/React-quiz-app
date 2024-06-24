import { useState, useEffect } from 'react';

/**
 * QuestionTimer component is a timer that counts down from a given timeout duration.
 * When the timer reaches zero, it calls the onTimeout function.
 * 
 * @param {number} timeout - The duration of the timer in milliseconds.
 * @param {function} onTimeout - The function to call when the timer reaches zero.
 * @returns {JSX.Element} - A progress element with the id "question-time" that shows the remaining time.
 */
export default function QuestionTimer({timeout, onTimeout, mode}) {

    // State variable to keep track of the remaining time
    const [remainingTime, setRemainingTime] = useState(timeout)

    // useEffect hook to set a timeout that calls the onTimeout function after the timeout duration
    useEffect(() => {
        // Set a timeout that calls the onTimeout function after the timeout duration
        const timer = setTimeout(onTimeout, timeout)
        // Clear the timeout when the component unmounts or when the timeout duration or onTimeout function changes
        return () => {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout])

    // useEffect hook to update the remaining time every 25 milliseconds
    useEffect(() => {
        // Set an interval that updates the remaining time every 25 milliseconds
        const interval = setInterval(() => {
            // Update the remaining time by subtracting 25 milliseconds
            setRemainingTime(prevRemainingTime => prevRemainingTime - 25);
        }, 25)

        // Clear the interval when the component unmounts
        return () => {  
            clearInterval(interval)
        }
    },[])
    

    // Return a progress element that shows the remaining time
    return (
        <progress id="question-time" className={mode} max={timeout} value={remainingTime}/>
    )

}
