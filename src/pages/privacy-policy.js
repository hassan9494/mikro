import React from 'react';
import Head from 'next/head';
import Footer from '../layouts/footer';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <Head>
        <title>Privacy Policy | Mikroelectron</title>
        <meta name="description" content="Our privacy policy explaining how we handle your data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

        {/* Enhanced Title Section */}
      <div className="title-section">
        <div className="title-overlay"></div>
        <div className="container">
          <div className="title-content">
            <h1>Privacy Policy</h1>
            <p className="subtitle">How we protect and use your information</p>
          </div>
        </div>
      </div>

      <main className="policy-content">
        <div className="last-updated-container">
          <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="policy-card">
          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">1</div>
              <h2>Information We Collect</h2>
            </div>
            <p>We collect information that you provide directly to us when you:</p>
            <ul className="policy-list">
              <li>Create an account on our website</li>
              <li>Place an order for products or services</li>
              <li>Contact our customer support</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or promotions</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">2</div>
              <h2>How We Use Your Information</h2>
            </div>
            <p>We use the information we collect to:</p>
            <ul className="policy-list">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our products and services</li>
              <li>Send you important account/service notifications</li>
              <li>Personalize your experience on our website</li>
              <li>Detect and prevent fraudulent activity</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">3</div>
              <h2>Data Security</h2>
            </div>
            <p>We implement industry-standard security measures to protect your personal information:</p>
            <ul className="policy-list">
              <li>SSL encryption for all data transmissions</li>
              <li>Regular security audits and vulnerability testing</li>
              <li>Limited access to personal data on a need-to-know basis</li>
              <li>Secure storage with encryption at rest</li>
            </ul>
            <p className="security-note">
              While we implement these protections, no system can be 100% secure. We encourage you to use strong passwords and protect your login credentials.
            </p>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">4</div>
              <h2>Changes to This Policy</h2>
            </div>
            <p>We may update our Privacy Policy periodically. When we make changes:</p>
            <ul className="policy-list">
              <li>We will update the &quot;Last updated&quot; date at the top of this policy</li>
              <li>For significant changes, we may provide additional notice (such as email notification)</li>
              <li>Your continued use of our services after changes constitutes acceptance</li>
            </ul>
          </section>

          <div className="contact-section">
            <h3>Contact Us</h3>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
<a href="mailto:info@mikroelectron.com" className="contact-email">
  privacy@mikroelectron.com
</a>          </div>
        </div>
        
      </main>
   <Footer 
        social={{
          call: "96265344772",
          whatsapp: "962790062196", // Sales WhatsApp
          email: "info@mikroelectron.com",
          facebook: "https://www.facebook.com/Mikroelectron", // Must include https://
          instagram: "https://www.instagram.com/mikroelectron", // Must include https://
          youtube: "https://www.youtube.com/@mikroelectronjo", // Must include https://
          location: "https://maps.app.goo.gl/ghdvRSR2uGSfkfAq7", // Google Maps link
          telegram: "https://t.me/mikroelectron",
        }}
      />    

      <style jsx>{`
        .privacy-policy-container {
          background-color: #f8fafc;
          min-height: 100vh;
          padding: 2rem 0 0 0;
        }

        .policy-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .policy-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .policy-header h1 {
          color: #0d1b2a;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .last-updated {
          color: #64748b;
          font-size: 1rem;
          font-weight: 500;
        }

        .policy-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 2.5rem;
          
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
        }

        @media (max-width: 768px) {
          .policy-content {
            padding: 0 1rem;
          }
          
          .policy-card {
            padding: 1.5rem;
          }
          
          .policy-header h1 {
            font-size: 2rem;
          }
          
          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .section-number {
            margin-bottom: 0.5rem;
            margin-right: 0;
          }
        }
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

        /* Rest of your existing styles... */
        .privacy-policy-container {
          background-color: #f8fafc;
        }

        .policy-content {
          max-width: 900px;
          margin: -4rem auto 0;
          padding: 0 1.5rem;
          position: relative;
          z-index: 3;
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
            margin-top: -2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;