import Header from "./components/Header";
import Quiz from "./components/Quiz";
/**
 * App component is the root component of the React application.
 * It renders the header and the quiz components.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
    // Render the header component
    return (
        <>
            {/* Render the header component */}
            <Header />
            {/* Render the main content */}
            <main className="main">
                {/* Render the quiz component */}
                <Quiz />
            </main>
        </>
    );
}

export default App;
