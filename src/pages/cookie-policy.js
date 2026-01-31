import React from 'react';
import Head from 'next/head';
import Footer from '../layouts/footer';

const CookiePolicy = () => {
  return (
    <div className="cookie-policy-container">
      <Head>
        <title>Cookie Policy | Mikroelectron</title>
        <meta name="description" content="Information about how we use cookies on our website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Enhanced Title Section */}
      <div className="title-section">
        <div className="title-overlay"></div>
        <div className="container">
          <div className="title-content">
            <h1>Cookie Policy</h1>
            <p className="subtitle">How we use cookies to enhance your experience</p>
          </div>
        </div>
      </div>

      <main className="policy-content">
        

        <div className="policy-card">
          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">1</div>
              <h2>What Are Cookies</h2>
            </div>
            <p>Cookies are small text files stored on your device when you visit websites. They help the website remember information about your visit, which can make your next visit easier and the site more useful to you.</p>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">2</div>
              <h2>How We Use Cookies</h2>
            </div>
            <p>We use cookies for various purposes to enhance your experience:</p>
            <ul className="policy-list">
              <li>Essential website functionality (like keeping you logged in)</li>
              <li>Remembering your preferences (like language or region)</li>
              <li>Analyzing website traffic and user behavior</li>
              <li>Improving user experience through personalization</li>
              <li>Measuring the effectiveness of our marketing campaigns</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">3</div>
              <h2>Types of Cookies We Use</h2>
            </div>
            <div className="table-responsive">
              <table className="cookie-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Purpose</th>
                    <th>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Strictly Necessary</td>
                    <td>Essential for website operation</td>
                    <td>Authentication, security, shopping cart</td>
                  </tr>
                  <tr>
                    <td>Performance</td>
                    <td>Help us understand visitor interactions</td>
                    <td>Google Analytics, heatmaps</td>
                  </tr>
                  <tr>
                    <td>Functionality</td>
                    <td>Remember your preferences</td>
                    <td>Language settings, theme preferences</td>
                  </tr>
                  <tr>
                    <td>Targeting/Advertising</td>
                    <td>Deliver relevant ads</td>
                    <td>Facebook Pixel, Google Ads</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">4</div>
              <h2>Managing Cookies</h2>
            </div>
            <p>You have control over cookies through your browser settings. Most browsers allow you to:</p>
            <ul className="policy-list">
              <li>See what cookies you&apos;ve got and delete them</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from particular sites</li>
              <li>Block all cookies from being set</li>
            </ul>
            <p className="security-note">
              Note that disabling cookies may affect the functionality of many websites, including ours. Some features may not work as intended if you disable cookies.
            </p>
          </section>

          <div className="contact-section">
            <h3>Have Questions?</h3>
            <p>If you have any questions about our use of cookies, please contact us at:</p>
            <a href="mailto:info@mikroelectron.com" className="contact-email">
              privacy@mikroelectron.com
            </a>
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
        .cookie-policy-container {
          background-color: #f8fafc;
          min-height: 100vh;
          padding: 2rem 0 0 0;
        }

        .policy-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .policy-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 2.5rem;
          margin-bottom: 3rem;
        }

        .policy-section {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .policy-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-number {
          background-color: #fe5e00;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .policy-section h2 {
          color: #0d1b2a;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        .policy-list {
          padding-left: 1.75rem;
          margin: 1.25rem 0;
        }

        .policy-list li {
          margin-bottom: 0.75rem;
          color: #334155;
          line-height: 1.6;
          position: relative;
        }

        .policy-list li::before {
          content: "•";
          color: #fe5e00;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }

        .security-note {
          background-color: #fef2f2;
          border-left: 4px solid #ef4444;
          padding: 1rem;
          margin: 1.5rem 0;
          color: #7f1d1d;
          font-size: 0.95rem;
        }

        .contact-section {
          background-color: #f0fdf4;
          border-radius: 8px;
          padding: 1.5rem;
          margin-top: 3rem;
          text-align: center;
        }

        .contact-section h3 {
          color: #0d1b2a;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .contact-email {
          color: #fe5e00;
          font-weight: 600;
          margin-top: 0.5rem;
          display: inline-block;
        }

        .cookie-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .cookie-table th, .cookie-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        .cookie-table th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #0d1b2a;
        }

        .cookie-table tr:hover {
          background-color: #f8fafc;
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

        /* Last Updated Styles */
        .last-updated-container {
          text-align: center;
          margin-bottom: 2rem;
        }

        .last-updated {
          display: inline-block;
          background-color: #f8fafc;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #64748b;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
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
          
          .policy-content {
            padding: 0 1rem;
          }
          
          .policy-card {
            padding: 1.5rem;
          }
          
          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .section-number {
            margin-bottom: 0.5rem;
            margin-right: 0;
          }
          
          .cookie-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default CookiePolicy;