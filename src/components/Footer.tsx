import { Page } from '../types';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Identity */}
          <div className="space-y-4">
            <div className="cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img src={logo} alt="IVA Work Solutions Logo" className="object-contain h-12 w-auto" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              From expert consulting and strategic staffing to innovative technology solutions, IVA Work Solutions delivers everything your business needs under one roof. We simplify challenges, accelerate growth, and provide the right solutions to help you succeed in a fast-changing world.
            </p>
           
          </div>

          {/* Quick Nav Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-white hover:underline transition-all">Home</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-white hover:underline transition-all">About Us</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-white hover:underline transition-all">Our Services</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('careers')} className="hover:text-white hover:underline transition-all">Careers</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('blog')} className="hover:text-white hover:underline transition-all">Insights & Blog</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-white hover:underline transition-all">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* Services Portfolio */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Our Portfolio</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-white hover:underline text-left">Consulting Services</button>
                <span className="text-xs text-slate-500 block">Strategy, Process, Vendor Management</span>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-white hover:underline text-left">Staffing Solutions</button>
                <span className="text-xs text-slate-500 block">Permanent, Contract, Executive Search</span>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-white hover:underline text-left">Technology Services</button>
                <span className="text-xs text-slate-500 block">IT Strategy, Development, Cloud, Automation</span>
              </li>
            </ul>
          </div>

          {/* Corporate Office Address */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Details</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#5EE3B7] shrink-0 mt-0.5" />
                <span>
                  WorkFlo Hitex Bizness Square, 4th Floor, 
                  Opp. Hitex Road, Hitech City<br />
                  Hyderabad, Telangana - 500081
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#00BFEF] shrink-0" />
                <a href="tel:+917075550125" className="hover:text-white transition-colors">+91 70755 50125</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#5EE3B7] shrink-0" />
                <a href="mailto:info@ivaworksolutions.com" className="hover:text-white transition-colors">info@ivaworksolutions.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Footer */}
        <div className="pt-8 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            &copy; {currentYear} IVA Work Solutions. All rights reserved. 
          </div>
          <div className="flex space-x-6">
            <button onClick={() => setCurrentPage('privacy-policy')} className="hover:text-slate-400 hover:underline flex items-center space-x-1">
              <span>Privacy Policy</span>
            </button>
            <button onClick={() => setCurrentPage('terms-of-service')} className="hover:text-slate-400 hover:underline flex items-center space-x-1">
              <span>Terms of Service</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
