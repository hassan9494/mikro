import React, { useEffect } from "react";
import Link from 'next/link';
import logofooter from './logofooter.png';
import LocationImage from '../assets/location-image.png';
import Image from "next/image";

interface SocialProps {
  call?: string;
  location?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  telegram?: string;
  youtube?: string;
  whatsapp?: string;
}

interface FooterProps {
  social?: SocialProps;
}

export function Footer({ social }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const whatsappTsNumber = '+962795909648';

  const services = [
    "Electronics Repair",
    "Component Sales",
    "Technical Consulting",
    "Custom Solutions",
    "Maintenance Services",
    "Training Programs",
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Tutorials", path: "/tutorials" },
    { name: "Courses", path: "/courses" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
  ];
  useEffect(() => {
    // Create a style element with Bootstrap CSS
    const style = document.createElement('style');
    style.innerHTML = `
      .footerBootstrapScope {
        ${require('!raw-loader!bootstrap/dist/css/bootstrap.min.css').default}
      }
      .footerBootstrapScope body {
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up on unmount
      document.head.removeChild(style);
    };
  }, []);

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "Cookie Policy", path: "/cookie-policy" },
    { name: "Sitemap", path: "/sitemap" }
  ];
  return (
      <div className="footerBootstrapScope">
        <footer style={{ backgroundColor: "#0d1b2a", color: "#ffffff" }} className="pt-5 pb-0 mb-0">
          <div className="container ">
            <div className="row g-4 pb-0 mb-0">
              {/* Company Info */}
              <div className="col-12 col-md-6 col-lg-3 pb-0 mb-0">
                <div className="mb-4">
                  <img
                      src={logofooter}
                      alt="Mikroelectron Logo"
                      className="footer-logo"
                      style={{
                        // filter: 'brightness(0) invert(1)',
                        maxWidth: '180px',
                        height: 'auto',
                        marginBottom: '1rem'
                      }}
                  />

                  {/*<Image*/}
                  {/*    src={logofooter}*/}
                  {/*    alt="Mikroelectron Logo"*/}
                  {/*    width={250}*/}
                  {/*    height={60}*/}
                  {/*    className="footer-logo"*/}
                  {/*/>*/}
                  {/*<img*/}
                  {/*    src={logofooter.src}*/}
                  {/*    alt="Mikroelectron Logo"*/}
                  {/*    className="footer-logo"*/}
                  {/*    style={{*/}
                  {/*      filter: 'brightness(0) invert(1)',*/}
                  {/*      maxWidth: '180px',*/}
                  {/*      height: 'auto',*/}
                  {/*      marginBottom: '1rem'*/}
                  {/*    }}*/}
                  {/*/>*/}
                </div>
                <p className="text-light mb-4" style={{ lineHeight: '1.6', opacity: 0.9 }}>
                  Your trusted partner for electronics solutions in Jordan. We provide quality components, expert repairs, and innovative technical solutions.
                </p>

                {/* Social Media Icons */}
                <div className="d-flex gap-3">
                  {social?.facebook && (
                      <a
                          href={social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="social-icon"
                          style={{ color: '#4267B2' }}
                          title="Facebook"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                  )}

                  {social?.instagram && (
                      <a
                          href={social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="social-icon"
                          style={{ color: '#E1306C' }}
                          title="Instagram"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                  )}

                  {social?.whatsapp && (
                      <a
                          href={`https://wa.me/${social.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp"
                          className="social-icon"
                          style={{ color: '#25D366' }}
                          title="Sales WhatsApp"
                      >
                        <i className="bi bi-whatsapp"></i>
                      </a>
                  )}

                  <a
                      href={`https://wa.me/${whatsappTsNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Technical Support"
                      className="social-icon"
                      style={{ color: '#25D366' }}
                      title="Technical Support WhatsApp"
                  >
                    <i className="bi bi-headset"></i>
                  </a>

                  {social?.youtube && (
                      <a
                          href={social.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="YouTube"
                          className="social-icon"
                          style={{ color: '#FF0000' }}
                          title="YouTube"
                      >
                        <i className="bi bi-youtube"></i>
                      </a>
                  )}

                  {social?.telegram && (
                      <a
                          href={social.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Telegram"
                          className="social-icon"
                          style={{ color: '#0088CC' }}
                          title="Telegram"
                      >
                        <i className="bi bi-telegram"></i>
                      </a>
                  )}
                </div>
              </div>

              {/* Services */}
              <div className="col-6 col-md-3 col-lg-2">
                <h5 className="text-white mb-4 pb-2" style={{
                  borderBottom: "2px solid #fe5e00",
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  Our Services
                </h5>
                <ul className="list-unstyled">
                  {services.map((service, idx) => (
                      <li key={idx} className="mb-3">
                        <div className="d-flex align-items-center">
                          <span className="service-bullet"></span>
                          <span className="service-text">{service}</span>
                        </div>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="col-6 col-md-3 col-lg-2">
                <h5 className="text-white mb-4 pb-2" style={{
                  borderBottom: "2px solid #fe5e00",
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  Quick Links
                </h5>
                <ul className="list-unstyled">
                  {quickLinks.map(({ name, path }, idx) => (
                      <li key={idx} className="mb-3">
                        <Link href={path} passHref>
                          <a className="footer-link">
                            {name}
                          </a>
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="col-12 col-md-6 col-lg-3">
                <h5 className="text-white mb-4 pb-2" style={{
                  borderBottom: "2px solid #fe5e00",
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  Contact Info
                </h5>
                <div className="mb-3">
                  {social?.call && (
                      <div className="contact-item">
                        <i className="bi bi-telephone-fill contact-icon"  style={{ color: '#2E86DE' }} ></i>
                        <a href={`tel:${social.call}`} className="contact-link">
                          {social.call}
                        </a>
                      </div>
                  )}

                  {social?.whatsapp && (
                      <div className="contact-item">
                        <i className="bi bi-whatsapp whatsapp-icon"></i>
                        <a
                            href={`https://wa.me/${social.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                          Sales: {social.whatsapp}
                        </a>
                      </div>
                  )}

                  <div className="contact-item">
                    <i className="bi bi-whatsapp whatsapp-icon"></i>
                    <a
                        href={`https://wa.me/${whatsappTsNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                      Technical Support: {whatsappTsNumber}
                    </a>
                  </div>

                  {social?.email && (
                      <div className="contact-item">
                        <i className="bi bi-envelope-fill contact-icon" style={{ color: '#d12b1cff' }}></i>
                        <a href={`mailto:${social.email}`} className="contact-link">
                          {social.email}
                        </a>
                      </div>
                  )}

                  <div className="contact-item">
                    <i className="bi bi-globe2 contact-icon" style={{ color: '#fe5e00' }}></i>
                    <a
                        href="https://www.mikroelectron.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                      www.mikroelectron.com
                    </a>
                  </div>
                </div>
              </div>
              {/* Location */}
              <div className="col-12 col-md-6 col-lg-2">
                <h5 className="text-white mb-4 pb-2" style={{
                  borderBottom: "2px solid #fe5e00",
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  Our Location
                </h5>
                <div className="location-image-container">
                  <a href={social?.location} target="_blank" title="Show Location" rel="noopener noreferrer">
                    {/*<img*/}
                    {/*    src={LocationImage}*/}
                    {/*    alt="Location"*/}
                    {/*    className="location-image"*/}
                    {/*/>*/}
                    <Image
                        src={LocationImage}
                        alt="Location"
                        width={200}
                        height={150}
                        className="location-image"
                    />
                    <div className="location-overlay">
                      View on Map
                    </div>
                  </a>
                </div>
                <p className="location-address " >
                  Queen Rania St, Khalifa Building, 3rd Floor, Amman, Jordan
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="footer-divider" />

            {/* Bottom Section */}
            <div className="footer-bottom">
              <div className="copyright">
                &copy; {currentYear} Mikroelectron. All rights reserved.
              </div>
              <div className="footer-links">
                {legalLinks.map((link, idx) => (
                    <Link key={idx} href={link.path} passHref>
                      <a className="footer-link">{link.name}</a>
                    </Link>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
         /* Social Icons */
  .social-icon {
    padding-top: 0.5rem;  
    font-size: 1.8rem;
    opacity: 1;
    transition: all 0.2s ease;
    transform: translateY(-2px);
  }
  
  .social-icon:hover {
    opacity: 0.8;
    transform: translateY(0);
  }
        
        /* Services */
        .service-bullet {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #fe5e00;
          border-radius: 50%;
          margin-right: 0.75rem;
        }
        
        .service-text {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        
        /* Links */
        .footer-link {
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          opacity: 0.9;
          transition: opacity 0.2s ease;
        }
        
        .footer-link:hover {
          opacity: 1;
          text-decoration: underline;
        }
        
       .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .contact-icon {
    color: #fe5e00;
    font-size: 1.1rem;
    margin-right: 0.75rem;
    opacity: 1;
    transition: all 0.2s ease;
  }
  
  .whatsapp-icon {
    color: #25D366;
    font-size: 1.1rem;
    margin-right: 0.75rem;
    opacity: 1;
    transition: all 0.2s ease;
  }
  
  .contact-link {
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    opacity: 1;
    transition: opacity 0.2s ease;
  }
  
  /* Hover Effects */
  .contact-item:hover .contact-icon,
  .contact-item:hover .whatsapp-icon {
    opacity: 0.8;
    transform: translateY(-2px);
  }
  
  .contact-item:hover .contact-link {
    opacity: 0.8;
    text-decoration: underline;
  }
        
        /* Location */
        .location-image-container {
          position: relative;
          margin-bottom: 1rem;
        }
        
        .location-image {
          display: block;
          max-height: 200px;
          width: 100%;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .location-image-container:hover .location-image {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        
        .location-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(254, 94, 0, 0.7);
          color: white;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .location-image-container:hover .location-overlay {
          opacity: 1;
        }
        
        .location-address {
          font-size: 0.85rem;
          opacity: 0.9;
          line-height: 1.5;
        }
        
        /* Divider */
        .footer-divider {
          border-color: rgba(254, 94, 0, 0.3);
          // margin: 3rem 0 1.5rem;
        }
        
        /* Bottom Section */
        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .contact-item i {
    transition: all 0.2s ease;
  }
  .contact-item:hover i {
    opacity: 1;
    transform: translateY(-2px);
  }
  .contact-item:hover a {
    opacity: 1;
  }
  .footer-logo {
      filter: brightness(0) invert(1);
      max-width: 180px;
      height: auto;
      margin-bottom: 1rem;
    }
      @media (max-width: 1050px) and (min-width: 989px) {
    .footer-logo {
      max-width: 160px !important; /* Slightly smaller size */
    }
      .social-icon {
        font-size: 1.5rem; 
        }

  }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        
        .copyright {
          font-size: 0.8rem;
          opacity: 0.8;
          margin-bottom: 1rem;
        }
        
        @media (min-width: 768px) {
          .copyright {
            margin-bottom: 0;
          }
        }
        
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .footer-links a {
          color: white;
          text-decoration: none;
          font-size: 0.8rem;
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }
        
        .footer-links a:hover {
          opacity: 1;
          text-decoration: underline;
        }
      `}</style>
        </footer>
      </div>
  );
}

export default Footer;
