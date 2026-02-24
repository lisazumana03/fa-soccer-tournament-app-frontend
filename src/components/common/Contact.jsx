import Header from './Header.jsx';
import './Contact.css';

export default function Contact() {
    return (
        <>
            <Header />
            <div className="contact-page">
                <div className="contact-container">
                    <h1>Get In Touch</h1>
                    <p>Have questions or feedback about GoalGrid? We'd love to hear from you!</p>
                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <ul>
                            <li>
                                <strong>Email:</strong>
                                <a href="mailto:zumanalisa@gmail.com">zumanalisa@gmail.com</a>
                            </li>
                            <li>
                                <strong>Phone:</strong>
                                <a href="tel:+27628405103">+27 62 840 5103</a>
                            </li>
                        </ul>
                    </div>
                    <div className="contact-message">
                        <p>Whether you want to report a bug, suggest a feature, or just say hello, feel free to reach out. We appreciate all feedback and will get back to you as soon as possible!</p>
                    </div>
                </div>
            </div>
        </>
    )
}