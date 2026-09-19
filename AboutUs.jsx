import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About Our Company</h1>
      <p>
        Welcome to our platform! We are dedicated to delivering modern, high-quality, 
        and scalable web solutions designed to meet everyday business needs.
      </p>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Our Mission</h2>
        <p>
          To empower businesses with seamless, innovative digital experiences and robust application architecture.
        </p>
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Our Vision</h2>
        <p>
          To be a trusted leader in web technologies, driving technological excellence and client success.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
