import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1 className="company-name">Paradise Nursery</h1>
            <p className="tagline">Where Greenery Meets Serenity</p>
            
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>

            <div className="about-us-section">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <div className="product-list-container">
          {/* هنا يظهر كود قائمة المنتجات أو مكون ProductList عند الضغط على الزر */}
          <h2>Welcome to Paradise Nursery Plants Store!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
