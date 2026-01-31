import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../layouts/footer';

const Sitemap = () => {
  const pages = [
    { name: "Home", path: "/" },
    { name: "Tutorials", path: "/tutorials" },
    { name: "Courses", path: "/courses" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
  ];

  const services = [
    "Component Sales",
    "Engineering Consultations",
    "Training Programs",
    "Engineering Exhibitions",
    "Engineering Labs Setup",
    "Industrial Engineering Solutions",
    "3D Printing Services",
  ];

  return (
    <div className="sitemap-container">
      <Head>
        <title>Sitemap | Mikroelectron</title>
        <meta name="description" content="Complete list of all pages on our website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Enhanced Title Section */}
      <div className="title-section">
        <div className="title-overlay"></div>
        <div className="container">
          <div className="title-content">
            <h1>Website Sitemap</h1>
            <p className="subtitle">Navigate our website with ease</p>
          </div>
        </div>
      </div>

      <main className="sitemap-content">
        <div className="container">
          <div className="sitemap-grid">
            <div className="sitemap-card">
              <div className="section-header">
                <div className="section-number">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h2>Main Pages</h2>
              </div>
              <ul className="sitemap-list">
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link href={page.path} className="sitemap-link">
                      <span className="link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                      </span>
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sitemap-card">
              <div className="section-header">
                <div className="section-number">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <h2>Our Services</h2>
              </div>
              <ul className="sitemap-list">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link href="/services" className="sitemap-link">
                      <span className="link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                      </span>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

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

      <style jsx>{`
        .sitemap-container {
          background-color: #f8fafc;
          min-height: 100vh;
          padding: 2rem 0 0 0;
        }

        .sitemap-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .sitemap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .sitemap-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          height: 100%;
        }

        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .section-number {
          background-color: #fe5e00;
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
          flex-shrink: 0;
        }

        .section-number svg {
          width: 24px;
          height: 24px;
        }

        .sitemap-card h2 {
          color: #0d1b2a;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        .sitemap-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sitemap-list li {
          margin-bottom: 0.75rem;
          position: relative;
          padding-left: 1.5rem;
        }

        .sitemap-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background-color: #fe5e00;
          border-radius: 50%;
        }

        .sitemap-link {
          display: flex;
          align-items: center;
          color: #334155;
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.2s ease;
          padding: 0.5rem 0;
        }

        .sitemap-link:hover {
          color: #fe5e00;
        }

        .link-icon {
          margin-right: 0.75rem;
          color: #94a3b8;
          transition: all 0.2s ease;
        }

        .sitemap-link:hover .link-icon {
          color: #fe5e00;
        }

        /* Title Section Styles */
        .title-section {
          position: relative;
          background: linear-gradient(135deg, #fe5e00 0%, #fe5e00 100%);
          color: white;
          padding: 4rem 0 2rem 0;
          margin-bottom: 3rem;
          overflow: hidden;
        }

        .title-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23fe5e00' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .title-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .title-content h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .subtitle {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.9);
          margin-bottom: 0;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .title-section {
            padding: 3rem 0;
          }
          
          .title-content h1 {
            font-size: 2.25rem;
          }
          
          .subtitle {
            font-size: 1.1rem;
          }
          
          .sitemap-content {
            padding: 0 1rem;
          }
          
          .sitemap-grid {
            grid-template-columns: 1fr;
          }
          
          .sitemap-card {
            padding: 1.5rem;
          }
          
          .section-number {
            width: 40px;
            height: 40px;
            margin-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Sitemap;