import React from "react";
import Link from "next/link";
import Image from "next/image";
import logofooter from "./logofooter.png";
import LocationImage from "../assets/location-image.png";
import "bootstrap-icons/font/bootstrap-icons.css";

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
  const whatsappTsNumber = "+962795909648";

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

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "Return & Refund Policy", path: "/return-refund-policy" },
    { name: "Cookie Policy", path: "/cookie-policy" },
    { name: "Sitemap", path: "/sitemap" },
  ];

  return (
    <div className="mk-footer-scope">
      <footer className="mk-footer">
        <div className="container">
          <div className="row g-4">

            {/* Company */}
            <div className="col-12 col-md-6 col-lg-3">
              <Image
                src={logofooter}
                alt="Mikroelectron Logo"
                width={180}
                height={60}
                className="footer-logo"
              />
              <p className="footer-desc">
                Your trusted partner for electronics solutions in Jordan. We provide quality components,
                expert repairs, and innovative technical solutions.
              </p>

              <div className="footer-socials">
                {social?.facebook && (
                  <a href={social.facebook} target="_blank" className="facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                )}
                {social?.instagram && (
                  <a href={social.instagram} target="_blank" className="instagram">
                    <i className="bi bi-instagram"></i>
                  </a>
                )}
                {social?.whatsapp && (
                  <a href={`https://wa.me/${social.whatsapp}`} target="_blank" className="whatsapp">
                    <i className="bi bi-whatsapp"></i>
                  </a>
                )}
                <a href={`https://wa.me/${whatsappTsNumber}`} target="_blank" className="support">
                  <i className="bi bi-headset"></i>
                </a>
                {social?.youtube && (
                  <a href={social.youtube} target="_blank" className="youtube">
                    <i className="bi bi-youtube"></i>
                  </a>
                )}
                {social?.telegram && (
                  <a href={social.telegram} target="_blank" className="telegram">
                    <i className="bi bi-telegram"></i>
                  </a>
                )}
              </div>
            </div>

            {/* Services */}
            <div className="col-6 col-md-3 col-lg-2">
              <h5 className="footer-title">Our Services</h5>
              <ul className="footer-list services-list">
                {services.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="col-6 col-md-3 col-lg-2">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-list quick-links-list">
                {quickLinks.map((l, i) => (
                  <li key={i}>
                    <Link href={l.path} legacyBehavior>
                      <a className="footer-link">{l.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-12 col-md-6 col-lg-3">
              <h5 className="footer-title">Contact Info</h5>

              {social?.call && (
                <p className="footer-contact">
                  <i className="bi bi-telephone-fill contact-call"></i>
                  <a href={`tel:${social.call}`}>{social.call}</a>
                </p>
              )}

              {social?.whatsapp && (
                <p className="footer-contact">
                  <i className="bi bi-whatsapp contact-whatsapp"></i>
                  <a href={`https://wa.me/${social.whatsapp}`} target="_blank">{social.whatsapp}</a>
                </p>
              )}

              <p className="footer-contact">
                <i className="bi bi-headset contact-support"></i> 
                <a href={`https://wa.me/${whatsappTsNumber}`} target="_blank">{whatsappTsNumber}</a>
              </p>

              {social?.email && (
                <p className="footer-contact">
                  <i className="bi bi-envelope-fill contact-email"></i> 
                  <a href={`mailto:${social.email}`}>{social.email}</a>
                </p>
              )}

              <p className="footer-contact">
                <i className="bi bi-globe contact-web"></i> 
                <a href="https://www.mikroelectron.com" target="_blank">www.mikroelectron.com</a>
              </p>
            </div>

            {/* Location */}
            <div className="col-12 col-md-6 col-lg-2">
              <h5 className="footer-title">Our Location</h5>
              <a href={social?.location} target="_blank" className="map-wrapper">
                <img src={LocationImage.src} className="footer-map" />
                <span className="map-overlay">View on Map</span>
              </a>
              <p className="footer-address">
                Queen Rania St, Khalifa Building, 3rd Floor, Amman, Jordan
              </p>
            </div>
          </div>

          <hr className="footer-divider" />

          {/* Bottom */}
          <div className="footer-bottom">
            <span className="footer-copy">
              © {currentYear} Mikroelectron. All rights reserved.
            </span>

            <div className="footer-legal">
              {legalLinks.map((l, i) => (
                <Link key={i} href={l.path} legacyBehavior>
                  <a className="legal-link">{l.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ================= STYLES ================= */}
        <style jsx>{`
          .mk-footer {
            background: #0d1b2a;
            color: #fff;
            padding-top: 3rem;
          }

          .footer-logo {
            filter: brightness(0) invert(1);
            margin-bottom: 1rem;
          }

          .footer-desc {
            font-size: 0.95rem;
            line-height: 1.6;
            opacity: 0.9;
          }

          /* Social Icons */
          .footer-socials a {
            font-size: 1.55rem;
            margin-right: 0.6rem;
            opacity: 0.85;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }

          .footer-socials a.facebook { color: #1877F2; }
          .footer-socials a.instagram { color: #E1306C; }
          .footer-socials a.whatsapp { color: #25D366; }
          .footer-socials a.support { color: #FF9800; }
          .footer-socials a.youtube { color: #FF0000; }
          .footer-socials a.telegram { color: #0088CC; }

          .footer-socials a:hover {
            transform: translateY(-2px);
            opacity: 1;
          }

          /* Services with colored bullets using ::before */
          .services-list {
            list-style: none;
            padding-left: 1rem;
          }
          .services-list li {
            position: relative;
            padding-left: 1.2rem;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            line-height: 1.4;
          }
          .services-list li::before {
            content: "•";
            position: absolute;
            left: 0;
            top: 0;
            color: #fe5e00; /* primary color */
            font-size: 1.2rem;
            line-height: 1;
          }

          .footer-title {
            font-size: 1.05rem;
            border-bottom: 2px solid #fe5e00;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
          }
            .quick-links-list li {
  margin-bottom: 0.8rem; /* adjust the gap as you like */
}


          .footer-list li {
            font-size: 0.9rem;
            line-height: 1.4;
            opacity: 0.9;
          }

          .footer-link,
          .legal-link,
          .footer-contact a {
            color: rgba(255,255,255,0.85);
            text-decoration: none;
            transition: opacity 0.2s ease, text-decoration 0.2s ease;
          }

          .footer-link:hover,
          .legal-link:hover,
          .footer-contact a:hover {
            opacity: 1;
            text-decoration: underline;
          }

          .footer-contact {
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 0.4rem;
            opacity: 0.9;
            display: flex;
            align-items: center;
          }

          /* Colorful contact icons */
          .contact-call { color: #0d6efd; }      /* blue */
          .contact-whatsapp { color: #25D366; } /* green */
          .contact-support { color: #FF9800; }  /* orange */
          .contact-email { color: #FF5722; }    /* deep orange */
          .contact-web { color: #8BC34A; }      /* light green */

          .footer-contact i {
            margin-right: 0.5rem;
          }

          .map-wrapper {
            position: relative;
            display: block;
            overflow: hidden;
            border-radius: 6px;
          }

          .footer-map {
            width: 100%;
            height: 80px;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .map-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(254,94,0,0.75);
            color: #fff;
            font-size: 0.85rem;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .map-wrapper:hover .footer-map {
            transform: scale(1.06);
          }

          .map-wrapper:hover .map-overlay {
            opacity: 1;
          }

          .footer-address {
            font-size: 0.82rem;
            opacity: 0.85;
            margin-top: 0.5rem;
          }

          .footer-divider {
            border-color: rgba(254,94,0,0.3);
            margin: 1.8rem 0 1rem;
          }

          .footer-bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding-bottom: 1rem;
          }

          .footer-copy {
            font-size: 0.78rem;
            opacity: 0.75;
          }

          .footer-legal {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .legal-link {
            font-size: 0.75rem;
            opacity: 0.75;
            white-space: nowrap;
          }

          .legal-link:not(:last-child)::after {
            content: "•";
            margin-left: 6px;
            color: rgba(255,255,255,0.4);
          }

          @media (min-width: 768px) {
            .footer-bottom {
              flex-direction: row;
              justify-content: space-between;
            }
          }
        `}</style>
      </footer>
    </div>
  );
}

export default Footer;
