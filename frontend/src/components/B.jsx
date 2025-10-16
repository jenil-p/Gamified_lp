import React from 'react';
import { useNavigate } from 'react-router-dom';
import './B.css'

const CourseHero = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="hero-section-container">
                <div className="shape shape-yellow"></div>
                <div className="shape shape-purple"></div>
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 19l-5-2.73L7 19V9.91l5 2.73 5-2.73V19z"></path></svg>
                        </div>
                        <h1>Build Your Future, Choose your Course</h1>
                        <p>Discover a wide range of courses designed to equip you with the skills and knowledge for a successful career.</p>
                        <button className="hero-button" onClick={() => navigate('/courses')}>
                            Get Started
                        </button>
                    </div>
                    <div className="hero-image-grid">
                        <div className="image-wrapper">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Student 1" />
                        </div>
                        <div className="image-wrapper">
                            <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" alt="Student 2" />
                        </div>
                        <div className="image-wrapper">
                            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" alt="Student 3" />
                        </div>
                        <div className="image-wrapper">
                            <img src="https://images.stockcake.com/public/0/1/2/012ec9a4-e360-401f-9651-ba3f97bf9db8_large/kids-learning-together-stockcake.jpg" alt="Student 4" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CourseHero;
