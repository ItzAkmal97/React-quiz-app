import logoImg from '../assets/quiz-logo.png'; 
/**
 * Header component for the React Quiz application.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header() {
    // Render the header component with the logo and title.
    return (
        <header className='header'>
            {/* Render the logo image. */}
            <img className="header img" alt="React Quiz Logo" src={logoImg} />
            {/* Render the title of the quiz. */}
            <h1 className='header h1'>React Quiz</h1>
        </header>
    );
}
