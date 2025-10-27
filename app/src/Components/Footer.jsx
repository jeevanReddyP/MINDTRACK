import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
const MindTrackFooter = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const socialIcons = [
    { icon: FaTwitter, href: 'https://twitter.com/mindtrack' },
    { icon: FaFacebookF, href: 'https://facebook.com/mindtrack' },
    { icon: FaInstagram, href: 'https://instagram.com/mindtrack' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/company/mindtrack' },
  ];

  return (
    <footer className="bg-emerald-800 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-emerald-700 pb-8 mb-8">
          
          {/* Column 1: Logo/Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold mb-2">
              Mind<span className="text-emerald-300">Track</span>
            </h3>
            <p className="text-sm text-emerald-300">
              Wellness Tracking for a Balanced Life.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-emerald-600 pb-1">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-emerald-200 hover:text-white transition duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact/Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-emerald-600 pb-1">Support</h4>
            <ul className="space-y-2 text-sm">
                <li>
                    <a href="/contact" className="text-emerald-200 hover:text-white transition duration-300">Contact Us</a>
                </li>
                <li>
                    <a href="/faq" className="text-emerald-200 hover:text-white transition duration-300">FAQ</a>
                </li>
                <li>
                    <a href="mailto:support@mindtrack.com" className="text-emerald-200 hover:text-white transition duration-300">support@mindtrack.com</a>
                </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-emerald-600 pb-1">Connect</h4>
            <div className="flex space-x-4">
              {socialIcons.map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-300 hover:text-white transition duration-300 p-2 border border-emerald-600 rounded-full hover:bg-emerald-700"
                  aria-label={item.href.includes('twitter') ? 'Twitter' : item.href.includes('facebook') ? 'Facebook' : item.href.includes('instagram') ? 'Instagram' : 'LinkedIn'}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center md:flex md:justify-between md:items-center text-sm text-emerald-400">
          <p>&copy; {currentYear} MindTrack Wellness Tracker. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for Mental Wellness.</p>
        </div>
      </div>
    </footer>
  );
};

export default MindTrackFooter;