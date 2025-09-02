import React from "react";
import Footer from '../../layouts/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import aboutUsImage from './about.png';

const AboutUs = () => {
  return (
    <div className="about-page">
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="container py-5 position-relative z-index-1">
          <div className="row align-items-center min-vh-60">
            <div className="col-lg-6 text-white pe-lg-5">
              <div className="animate__animated animate__fadeInDown">
                <span className="badge bg-white text-primary mb-3 px-3 py-2 fw-medium">ABOUT MIKROELECTRON</span>
                <h1 className="display-3 fw-bold mb-4">Innovating Electronics <span className="text-warning">Solutions</span> in Jordan</h1>
                <p className="lead mb-4 fs-4 opacity-75">
                  Your trusted partner for electronics solutions in Jordan. We provide quality components, expert repairs, and innovative technical solutions.
                </p>
              </div>
              <div className="d-flex gap-3 animate__animated animate__fadeIn animate__delay-1s">
                <a href="#our-story" className="btn btn-primary btn-lg px-4 py-3 rounded-pill shadow-sm fw-medium">
                  <i className="bi bi-book me-2"></i> Our Story
                </a>
                <a href="#contact" className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-medium">
                  <i className="bi bi-chat-square-text me-2"></i> Contact Us
                </a>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="position-relative animate__animated animate__fadeInRight animate__delay-0-5s">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <img 
                  src={aboutUsImage}
                  alt="Electronics workshop" 
                  className="img-fluid rounded-4 shadow-lg position-relative floating-image border border-4 border-white"
                  style={{ transform: 'perspective(1000px) rotateY(-10deg)' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#fe5f00"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#fe5f00"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fe5f00"></path>
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-6 bg-white position-relative">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 pe-lg-5">
              <div className="section-tag mb-3 text-primary">OUR JOURNEY</div>
              <h2 className="fw-bold mb-4 display-5">Crafting <span className="text-primary">Electronics Excellence</span> Since 2012</h2>
              <div className="timeline-wrapper mt-4">
                <div className="timeline-item">
                  <div className="timeline-badge bg-primary"></div>
                  <div className="timeline-content">
                    <h5 className="fw-bold">Founded in Amman</h5>
                    <p className="text-muted mb-0">Started as a small repair shop with a passion for electronics</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-badge bg-primary"></div>
                  <div className="timeline-content">
                    <h5 className="fw-bold">Expanded Services</h5>
                    <p className="text-muted mb-0">Added component sales and technical consulting</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-badge bg-primary"></div>
                  <div className="timeline-content">
                    <h5 className="fw-bold">Today</h5>
                    <p className="text-muted mb-0">Serving customers across Jordan with certified technicians</p>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mt-5 pt-3">
                <div className="me-4 text-center">
                  <div className="display-4 fw-bold text-primary">13+</div>
                  <div className="text-muted small">Years Experience</div>
                </div>
                <div className="vr mx-3"></div>
                <div className="me-4 text-center">
                  <div className="display-4 fw-bold text-secondary">2K+</div>
                  <div className="text-muted small">Devices Repaired</div>
                </div>
                <div className="vr mx-3"></div>
                <div className="me-4 text-center">
                  <div className="display-4 fw-bold text-secondary">5K+</div>
                  <div className="text-muted small">products available</div>
                </div>
                <div className="vr mx-3"></div>
                <div className="text-center">
                  <div className="display-4 fw-bold text-primary">100%</div>
                  <div className="text-muted small">Customer Focus</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="rounded-4 overflow-hidden shadow-lg position-relative h-100">
                <div className="ratio ratio-16x9">
<iframe 
  src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FMikroelectron%2Fvideos%2F577532393085751%2F&show_text=false&width=560&autoplay=true&loop=true&mute=false" 
  title="Location Map"
  allowFullScreen
  loading="lazy"
  className="rounded-4"
  allow="autoplay; encrypted-media; fullscreen"
  referrerPolicy="no-referrer-when-downgrade">
</iframe>
                </div>
                <div className="position-absolute top-0 start-0 w-100 p-2 ps-4 bg-gradient-dark">
                  <div className="d-flex align-items-center">
                    <div className="bg-white p-2 rounded-3 me-3 shadow-sm">
                      <i className="bi bi-geo-alt-fill text-primary fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 text-white fw-bold">Our Location</h6>
                      <small className="text-white opacity-75">Queen Rania St, Khalifa Building, 3rd Floor, Amman, Jordan</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="floating-shape shape-3"></div>
      </section>

      {/* Mission & Values */}
      <section className="py-6 position-relative bg-light">
        <div className="container py-5">
          <div className="text-center mb-6">
            <div className="section-tag mb-3 text-primary">OUR CORE</div>
            <h2 className="fw-bold display-5 mb-3">What <span className="text-primary">Drives</span> Us</h2>
            <div className="mx-auto" style={{ maxWidth: '700px' }}>
              <p className="lead text-muted">
                Our foundation is built on principles that guide every decision and interaction
              </p>
              <div className="divider mx-auto bg-primary"></div>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm-hover p-4 transition-all bg-white rounded-4">
                <div className="icon-box-lg rounded-3 mb-4 mx-auto bg-primary-light text-primary">
                  <i className="bi bi-bullseye fs-2"></i>
                </div>
                <h4 className="fw-bold text-center mb-3">Our Mission</h4>
                <p className="text-center text-muted mb-0">
                  To provide innovative, reliable, and affordable electronics solutions while fostering technical education in our community.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm-hover p-4 transition-all bg-white rounded-4">
                <div className="icon-box-lg rounded-3 mb-4 mx-auto bg-secondary-light text-secondary">
                  <i className="bi bi-lightbulb fs-2"></i>
                </div>
                <h4 className="fw-bold text-center mb-3">Our Vision</h4>
                <p className="text-center text-muted mb-0">
                  To be the leading electronics solutions provider in Jordan, recognized for technical excellence and customer satisfaction.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm-hover p-4 transition-all bg-white rounded-4">
                <div className="icon-box-lg rounded-3 mb-4 mx-auto bg-primary-light text-primary">
                  <i className="bi bi-heart fs-2"></i>
                </div>
                <h4 className="fw-bold text-center mb-3">Our Values</h4>
                <ul className="list-unstyled text-center mb-0">
                  <li className="mb-2 d-flex align-items-center justify-content-center">
                    <i className="bi bi-check-circle-fill me-2 text-primary"></i> 
                    <span>Integrity & Honesty</span>
                  </li>
                  <li className="mb-2 d-flex align-items-center justify-content-center">
                    <i className="bi bi-check-circle-fill me-2 text-primary"></i> 
                    <span>Technical Innovation</span>
                  </li>
                  <li className="mb-2 d-flex align-items-center justify-content-center">
                    <i className="bi bi-check-circle-fill me-2 text-primary"></i> 
                    <span>Customer Focus</span>
                  </li>
                  <li className="d-flex align-items-center justify-content-center">
                    <i className="bi bi-check-circle-fill me-2 text-primary"></i> 
                    <span>Continuous Learning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="floating-shape shape-4"></div>
      </section>

      {/* CTA Section */}
      <section className="py-6 position-relative overflow-hidden bg-primary" id="contact">
        <div className="container py-5 text-center position-relative z-index-1">
          <h2 className="fw-bold mb-4 display-5 text-white">Ready to <span className="text-warning">Collaborate</span>?</h2>
          <p className="lead mb-5 text-white opacity-75 mx-auto" style={{ maxWidth: '600px' }}>
            Whether you need repairs, components, or custom solutions, our team is ready to assist you with expert service.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
           <a href="mailto:info@mikroelectron.com" className="btn btn-light btn-lg px-4 py-3 rounded-pill shadow-sm fw-medium">
  <i className="bi bi-envelope-fill me-2"></i> Contact Us
</a>
            <a href="tel:+96265344772" className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-medium">
              <i className="bi bi-telephone-fill me-2"></i> Call Now
            </a>
          </div>
        </div>
        <div className="cta-shape-1"></div>
        <div className="cta-shape-2"></div>
      </section>

      <Footer 
        social={{
          call: "96265344772",
          whatsapp: "962790062196",
          email: "info@mikroelectron.com",
          facebook: "https://www.facebook.com/Mikroelectron",
          instagram: "https://www.instagram.com/mikroelectron",
          youtube: "https://www.youtube.com/@mikroelectronjo",
          location: "https://maps.app.goo.gl/ghdvRSR2uGSfkfAq7",
          telegram: "https://t.me/mikroelectron",
        }}
      />

      <style jsx global>{`
        :root {
          --primary: #fe5e00;
          --primary-light: rgba(254, 94, 0, 0.1);
          --secondary: #133695;
          --secondary-light: rgba(19, 54, 149, 0.1);
          --dark: #1a1a1a;
          --light: #f8f9fa;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }
        .about-page {
          overflow-x: hidden;
        }
        h1, h2, h3, h4, h5, h6 {
          font-weight: 700;
          line-height: 1.3;
        }
        
        .hero-section {
          background: linear-gradient(135deg, var(--secondary) 0%, #0a1b4d 100%);
          padding: 120px 0 80px;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .bg-gradient-dark {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.32) 100%) !important;
}
        .hero-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 150px;
        }
        
        .hero-wave svg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .section-tag {
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.85rem;
          display: inline-block;
        }
        
        .icon-box-lg {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .shadow-sm-hover {
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        .shadow-sm-hover:hover {
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          transform: translateY(-5px);
        }
        
        .shadow-sm-hover:hover .icon-box-lg {
          transform: scale(1.1) rotate(5deg);
        }
        
        .video-container {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }
        
        .bg-gradient {
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
        }
        
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          z-index: 0;
          filter: blur(40px);
          opacity: 0.6;
        }
        
        .shape-1 {
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          top: -100px;
          right: -100px;
        }
        
        .shape-2 {
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.05);
          bottom: -50px;
          left: -50px;
        }
        
        .shape-3 {
          width: 400px;
          height: 400px;
          background: var(--primary-light);
          top: 50%;
          right: -150px;
        }
        
        .shape-4 {
          width: 300px;
          height: 300px;
          background: var(--secondary-light);
          bottom: -100px;
          left: -100px;
        }
        
        .shape-5 {
          width: 180px;
          height: 180px;
          background: var(--primary-light);
          top: 20%;
          right: -50px;
        }
        
        .cta-shape-1 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          top: -250px;
          right: -250px;
          filter: blur(30px);
        }
        
        .cta-shape-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          bottom: -150px;
          left: -150px;
          filter: blur(30px);
        }
        
        .min-vh-60 {
          min-height: 60vh;
        }
        
        .py-6 {
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        
        .mb-6 {
          margin-bottom: 5rem;
        }
        
        .z-index-1 {
          z-index: 1;
        }
        
        .btn-primary {
          background-color: var(--primary);
          border-color: var(--primary);
        }
        
        .btn-primary:hover {
          background-color: #e05500;
          border-color: #e05500;
        }
        
        .text-primary {
          color: var(--primary) !important;
        }
        
        .bg-primary {
          background-color: var(--primary) !important;
        }
        
        .text-secondary {
          color: var(--secondary) !important;
        }
        
        .bg-secondary {
          background-color: var(--secondary) !important;
        }
        
        .bg-light {
          background-color: var(--light) !important;
        }
        
        .bg-primary-light {
          background-color: var(--primary-light);
        }
        
        .bg-secondary-light {
          background-color: var(--secondary-light);
        }
        
        .floating-image {
          animation: float 6s ease-in-out infinite;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        @keyframes float {
          0% { transform: perspective(1000px) rotateY(-10deg) translateY(0px); }
          50% { transform: perspective(1000px) rotateY(-10deg) translateY(-20px); }
          100% { transform: perspective(1000px) rotateY(-10deg) translateY(0px); }
        }
        
        .timeline-wrapper {
          position: relative;
          padding-left: 30px;
        }
        
        .timeline-item {
          position: relative;
          padding-bottom: 30px;
        }
        
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        
        .timeline-badge {
          position: absolute;
          left: -30px;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 0 0 2px var(--primary);
        }
        
        .timeline-content {
          padding: 15px 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: -22px;
          top: 20px;
          bottom: 0;
          width: 2px;
          background: var(--primary);
          opacity: 0.2;
        }
        
        .divider {
          width: 80px;
          height: 3px;
          background: var(--primary);
          margin: 20px auto;
        }
        
        .opacity-75 {
          opacity: 0.75;
        }
        
        .opacity-90 {
          opacity: 0.9;
        }
        
        .text-warning {
          color: #ffc107 !important;
        }
        
        @media (max-width: 768px) {
          .display-5 {
            font-size: 2.5rem;
          }
          
          .py-6 {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
          
          .hero-section {
            padding: 80px 0 60px;
          }
          
          .btn-lg {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }
        
        @media (max-width: 576px) {
          .display-5 {
            font-size: 2rem;
          }
          
          .lead {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;