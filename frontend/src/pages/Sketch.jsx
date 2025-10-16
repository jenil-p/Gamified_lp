import React from 'react';
import './SketchLayout.css'; // Import the CSS file

function SketchLayout() {
    return (
        <div className="layout-container">
            <div className="left-section">
                <img
                    src="https://via.placeholder.com/300x200/FF5733/FFFFFF?text=Image" // Replace with your image path
                    alt="Placeholder"
                    className="overlapping-image"
                />
                <div className="overlapping-div">
                    &lt;div&gt; content here
                </div>
            </div>
            <div className="right-section">
                <h1 className="right-heading">&lt;h1&gt; Hello World</h1>
                <p className="right-paragraph">&lt;P&gt; This is a paragraph.</p>
                <div className="right-rectangle top-rectangle">R</div>
                <div className="right-rectangle bottom-rectangle"></div>
            </div>
        </div>
    );
}

export default SketchLayout;