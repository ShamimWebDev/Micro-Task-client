import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold text-gradient">
              MicroTask
            </Link>
            <p className="text-sm leading-relaxed">
              The world's leading micro-tasking platform. Earn money by
              completing small tasks or hire experts to get your work done fast.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a
                href="https://github.com/ShamimWebDev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
              >
                <FiGithub size={20} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-indigo-400 transition-colors"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="/available-tasks"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Available Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/best-workers"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Best Workers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <FiMapPin className="text-indigo-500" />
                <span>123 Task Street, Digital City</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-indigo-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-indigo-500" />
                <span>support@microtask.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} MicroTask Platform. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
