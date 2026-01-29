import React from 'react';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Droplets,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  ChevronRight,
  Globe,
  Award,
  Clock,
  Users
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Find Donation Center', href: '#' },
    { label: 'Blood Request Form', href: '#' },
    { label: 'Organ Donor Registry', href: '#' },
    { label: 'Donor Eligibility', href: '#' },
    { label: 'Campaigns & Drives', href: '#' },
    { label: 'Volunteer Opportunities', href: '#' }
  ];

  const resources = [
    { label: 'Blood Donation Guide', href: '#' },
    { label: 'Organ Donation FAQs', href: '#' },
    { label: 'Health & Safety', href: '#' },
    { label: 'Research & Reports', href: '#' },
    { label: 'Partner Hospitals', href: '#' },
    { label: 'Media Coverage', href: '#' }
  ];

  const company = [
    { label: 'About Us', href: '#' },
    { label: 'Our Impact', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press & Media', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' }
  ];

  const emergencyContacts = [
    { label: 'National Emergency', number: '102', description: 'Ambulance' },
    { label: 'Blood Bank Helpline', number: '104', description: '24/7 Support' },
    { label: 'Medical Emergency', number: '108', description: 'All India' },
    { label: 'Women Helpline', number: '1091', description: '24/7 Support' }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#', color: 'text-blue-600 hover:text-blue-700' },
    { icon: Instagram, label: 'Instagram', href: '#', color: 'text-pink-600 hover:text-pink-700' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'text-sky-500 hover:text-sky-600' },
    { icon: Youtube, label: 'YouTube', href: '#', color: 'text-red-600 hover:text-red-700' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'text-blue-700 hover:text-blue-800' }
  ];

  const certifications = [
    { label: 'ISO 9001:2015', icon: Award },
    { label: 'NABH Accredited', icon: Shield },
    { label: 'Govt. Recognized', icon: Globe }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 pt-12 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-8 mb-10">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-rose-500 to-rose-400 w-12 h-12 rounded-full flex items-center justify-center shadow">
                <Heart className="h-6 w-6 text-white" fill="white" />
                <Droplets className="h-3 w-3 text-white absolute -bottom-1 -right-1" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                  LifeStream
                </h2>
                <p className="text-sm text-gray-500">Blood & Organ Donation Platform</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 max-w-md">
              Connecting donors with those in need through a safe, transparent, and life-saving platform.
              Together, we're making healthcare accessible for everyone.
            </p>
            
            {/* Emergency Banner */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Phone className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Emergency Contact</div>
                  <div className="text-rose-600 font-bold text-lg">+91 98765 43210</div>
                  <div className="text-sm text-gray-600">24/7 Helpline • Immediate Assistance</div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                  <cert.icon className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium text-gray-700">{cert.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <ChevronRight className="h-4 w-4 text-rose-500 mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-200 rounded-full mr-3 group-hover:bg-rose-500 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <ChevronRight className="h-4 w-4 text-rose-500 mr-2" />
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-200 rounded-full mr-3 group-hover:bg-rose-500 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <ChevronRight className="h-4 w-4 text-rose-500 mr-2" />
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-200 rounded-full mr-3 group-hover:bg-rose-500 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Middle Section - Contact & Emergency */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <a href="mailto:help@lifestream.com" className="flex items-center space-x-3 text-gray-600 hover:text-rose-600 transition-colors">
                <Mail className="h-5 w-5 text-rose-500" />
                <span>help@lifestream.com</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5 text-rose-500" />
                <div>
                  <div>+91 98765 43210</div>
                  <div className="text-sm text-gray-500">Monday - Friday, 9AM - 6PM</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 text-rose-500 mt-1" />
                <div>
                  <div>LifeStream Headquarters</div>
                  <div className="text-sm text-gray-500">Mumbai, Maharashtra 400001</div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Emergency Numbers</h3>
            <div className="grid grid-cols-2 gap-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 hover:border-rose-200 transition-colors">
                  <div className="text-lg font-bold text-gray-900">{contact.number}</div>
                  <div className="text-sm text-gray-600">{contact.label}</div>
                  <div className="text-xs text-gray-500">{contact.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Stay Connected</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Subscribe to get updates on emergency needs and donation drives.
            </p>
            
            {/* Newsletter Form */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-rose-500 to-rose-400 text-white px-4 py-3 rounded-r-lg font-medium hover:from-rose-600 hover:to-rose-500 transition-all">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`p-2 bg-gray-100 rounded-lg hover:bg-rose-50 transition-colors ${social.color}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Left: Copyright & Message */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Users className="h-5 w-5 text-rose-500" />
              <span className="text-lg font-medium text-gray-900">Saving lives together</span>
            </div>
            <p className="text-gray-600 text-sm">
              © {currentYear} LifeStream. All rights reserved. A non-profit healthcare initiative.
            </p>
          </div>

          {/* Right: Additional Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">
              Cookie Policy
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">
              Accessibility
            </a>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>100% Secure Platform</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>24/7 Emergency Support</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span>Verified by 150+ Hospitals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Emergency Banner */}
      {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 to-rose-400 text-white p-3 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <div>
              <div className="text-sm font-medium">Emergency Blood Request?</div>
              <div className="text-xs opacity-90">Call +91 98765 43210</div>
            </div>
          </div>
          <a 
            href="tel:+919876543210" 
            className="bg-white text-rose-600 font-bold px-3 py-1 rounded-full text-sm"
          >
            CALL NOW
          </a>
        </div>
      </div> */}

      {/* Custom Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 70px; /* Space for mobile emergency banner */
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;