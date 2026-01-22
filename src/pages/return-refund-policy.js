import React from 'react';
import Head from 'next/head';
import Footer from '../layouts/footer';

const ReturnRefundPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <Head>
        <title>Return & Refund Policy | Mikroelectron</title>
        <meta name="description" content="Our return and refund policy guidelines" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Title Section */}
      <div className="title-section">
        <div className="title-overlay"></div>
        <div className="container">
          <div className="title-content">
            <h1>Return & Refund Policy</h1>
            <p className="subtitle">Guidelines for returns, refunds, and exchanges</p>
          </div>
        </div>
      </div>

      <main className="policy-content">
       {/* <div className="last-updated-container">
               <p className="last-updated">Effective: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
             </div> */}

        <div className="policy-card">
          <div className="policy-intro">
            <p>To ensure a smooth return process, please review the guidelines below:</p>
          </div>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">1</div>
              <h2>Return Timeframe</h2>
            </div>
            <ul className="policy-list">
              <li>Products must be returned within 48 hours of the purchase date.</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">2</div>
              <h2>Condition of Returned Items</h2>
            </div>
            <ul className="policy-list">
              <li>Products must be unused, unopened, and in their original packaging.</li>
              <li>Opened items cannot be returned, except in cases of verified manufacturer defects.</li>
              <li>Items that are used, damaged, or burnt out are not eligible for return.</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">3</div>
              <h2>Proof of Purchase</h2>
            </div>
            <ul className="policy-list">
              <li>A valid purchase invoice is required for all returns or exchanges.</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">4</div>
              <h2>Testing Before Purchase</h2>
            </div>
            <ul className="policy-list">
              <li>Customers are encouraged to test products before purchasing to ensure satisfaction.</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">5</div>
              <h2>Manufacturer Defects</h2>
            </div>
            <ul className="policy-list">
              <li>If a product is opened and used, it may only be returned if there is a manufacturer defect.</li>
              <li>All defect claims will be inspected and verified.</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">6</div>
              <h2>Refund or Replacement Options</h2>
            </div>
            <ul className="policy-list">
              <li>Approved returns may be refunded or exchanged for another item of equal value.</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">7</div>
              <h2>Shipping Costs</h2>
            </div>
            <ul className="policy-list">
              <li>Customers are responsible for all shipping costs associated with returns or exchanges.</li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="section-header">
              <div className="section-number">8</div>
              <h2>Processing Time</h2>
            </div>
            <ul className="policy-list">
              <li>Refunds are processed within 4 business days after the returned item is received and inspected.</li>
            </ul>
          </section>

          <div className="contact-section">
            <h3>Need Help With a Return?</h3>
            <p>Contact our customer service team:</p>
            <a href="mailto:info@mikroelectron.com" className="contact-email">
              support@mikroelectron.com
            </a>
            <p className="contact-phone">
              or call: <a href="tel:96265344772">+962 6 534 4772</a>
            </p>
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

        .policy-intro {
          background-color: #f0f9ff;
          border-left: 4px solid #0ea5e9;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border-radius: 0 8px 8px 0;
          font-size: 1.1rem;
          color: #0369a1;
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
          content: "●";
          color: #fe5e00;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }

        .contact-section {
          background-color: #f0fdf4;
          border-radius: 8px;
          padding: 2rem;
          margin-top: 3rem;
          text-align: center;
        }

        .contact-section h3 {
          color: #0d1b2a;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .contact-email {
          color: #fe5e00;
          font-weight: 600;
          text-decoration: none;
          font-size: 1.1rem;
          margin-top: 0.5rem;
          display: inline-block;
          transition: all 0.2s ease;
        }

        .contact-email:hover {
          color: #d14a00;
          text-decoration: underline;
        }

        .contact-phone {
          margin-top: 1rem;
          color: #64748b;
        }

        .contact-phone a {
          color: #0d1b2a;
          font-weight: 600;
          text-decoration: none;
        }

        .contact-phone a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .policy-content {
            padding: 0 1rem;
          }
          
          .policy-card {
            padding: 1.5rem;
          }
          
          .policy-intro {
            padding: 1rem;
            font-size: 1rem;
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
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230ea5e9' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
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
            
.last-updated-container .last-updated {
          color: #64748b  !important;
          font-size: 1rem  !important;
          font-weight: 500 !important;
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

export default ReturnRefundPolicy;