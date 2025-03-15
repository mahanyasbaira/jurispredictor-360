
import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-legal-50/80 backdrop-blur-sm border-t border-legal-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">NyayaPredict</span>
            </Link>
            <p className="text-sm text-legal-600">
              AI-powered legal case prediction platform for the Indian judicial system,
              helping users make informed decisions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-legal-900 mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/analyze-case" className="text-sm text-legal-600 hover:text-primary transition-colors">
                  Case Analysis
                </Link>
              </li>
              <li>
                <Link to="/legal-insights" className="text-sm text-legal-600 hover:text-primary transition-colors">
                  Legal Insights
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-sm text-legal-600 hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-legal-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-legal-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-legal-600 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-legal-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-legal-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-legal-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-legal-400" />
                <span className="text-sm text-legal-600">support@nyayapredict.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-legal-400" />
                <span className="text-sm text-legal-600">+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-legal-400" />
                <span className="text-sm text-legal-600">
                  New Delhi, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-legal-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-legal-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} NyayaPredict. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-legal-400 hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="text-legal-400 hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
