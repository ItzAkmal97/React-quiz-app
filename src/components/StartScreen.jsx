export default function StartScreen({onClick}) {
    return (
            <div id="start">
                    <h3>Press the start button to begin</h3>
                    <button id="start-button" onClick={onClick}>Start</button>
                </div>

    );
}