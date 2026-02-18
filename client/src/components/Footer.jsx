import React from "react";
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
  Users,
  Download,
  FileText,
  HelpCircle,
  Star,
  ShieldCheck,
  Truck,
  Bell,
} from "lucide-react";
import jeevandaans from "../../public/jeevandaan.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Find Donation Center", href: "#", icon: MapPin },
    { label: "Blood Request Form", href: "#", icon: FileText },
    { label: "Organ Donor Registry", href: "#", icon: Heart },
    { label: "Donor Eligibility", href: "#", icon: ShieldCheck },
    { label: "Campaigns & Drives", href: "#", icon: Bell },
    { label: "Volunteer Opportunities", href: "#", icon: Users },
  ];

  const resources = [
    { label: "Blood Donation Guide", href: "#", icon: Download },
    { label: "Organ Donation FAQs", href: "#", icon: HelpCircle },
    { label: "Health & Safety", href: "#", icon: Shield },
    { label: "Research & Reports", href: "#", icon: FileText },
    { label: "Partner Hospitals", href: "#", icon: Heart },
    { label: "Media Coverage", href: "#", icon: Award },
  ];

  const company = [
    { label: "About Us", href: "/about", icon: Users },
    { label: "Our Impact", href: "#", icon: Star },
    { label: "Careers", href: "#", icon: Award },
    { label: "Press & Media", href: "#", icon: Globe },
    { label: "Contact Us", href: "#", icon: Mail },
    { label: "Privacy Policy", href: "#", icon: Shield },
  ];

  const emergencyContacts = [
    {
      label: "National Emergency",
      number: "102",
      description: "Ambulance",
      color: "bg-red-50 border-red-100 text-red-800",
    },
    {
      label: "Blood Bank Helpline",
      number: "104",
      description: "24/7 Support",
      color: "bg-blue-50 border-blue-100 text-blue-800",
    },
    {
      label: "Medical Emergency",
      number: "108",
      description: "All India",
      color: "bg-emerald-50 border-emerald-100 text-emerald-800",
    },
    {
      label: "Women Helpline",
      number: "1091",
      description: "24/7 Support",
      color: "bg-purple-50 border-purple-100 text-purple-800",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "#",
      color: "bg-blue-50 hover:bg-blue-100 text-blue-600",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "#",
      color: "bg-pink-50 hover:bg-pink-100 text-pink-600",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "#",
      color: "bg-sky-50 hover:bg-sky-100 text-sky-600",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "#",
      color: "bg-red-50 hover:bg-red-100 text-red-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "#",
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
  ];

  const certifications = [
    { label: "ISO 9001:2015", icon: Award, color: "text-blue-600" },
    { label: "NABH Accredited", icon: Shield, color: "text-emerald-600" },
    { label: "Govt. Recognized", icon: Globe, color: "text-amber-600" },
    { label: "150+ Hospitals", icon: Heart, color: "text-rose-600" },
  ];

  // const stats = [
  //   { value: '10K+', label: 'Lives Saved', color: 'text-rose-600' },
  //   { value: '50K+', label: 'Donors Registered', color: 'text-blue-600' },
  //   { value: '500+', label: 'Hospitals Network', color: 'text-emerald-600' },
  //   { value: '24/7', label: 'Emergency Support', color: 'text-amber-600' }
  // ];

  const mobileApps = [
    { platform: "Android", icon: "📱", href: "#" },
    { platform: "iOS", icon: "🍎", href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-10 pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div
          className="absolute top-0 right-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-32 left-1/2 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Banner */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div> */}

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Logo Section */}
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur-xl opacity-70"></div>

                {/* Logo Container */}
                <div className="relative bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-xl ring-1 ring-rose-200">
                  <img
                    src={jeevandaans}
                    alt="JeevanDaan Logo"
                    className="w-20 h-20 object-contain animate-pulse rounded-full"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-700 to-rose-600 bg-clip-text text-transparent">
                  JeevanDaan
                </h2>

                <p className="text-gray-600 font-medium">
                  Blood & Organ Donation Network
                </p>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    4.9/5 • Trusted Platform
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Connecting compassionate donors with those in urgent need through
              India's most trusted blood and organ donation platform. Your
              contribution saves lives.
            </p>

            {/* Certifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <cert.icon className={`h-5 w-5 ${cert.color}`} />
                    <span className="text-sm font-medium text-gray-700">
                      {cert.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Apps */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3">Download our app</p>
              <div className="flex space-x-3">
                {mobileApps.map((app, index) => (
                  <a
                    key={index}
                    href={app.href}
                    className="flex-1 bg-gray-900 text-white rounded-xl p-3 flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-lg">{app.icon}</span>
                    <span className="font-medium">{app.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {[
            { title: "Quick Links", items: quickLinks },
            { title: "Resources", items: resources },
            { title: "Company", items: company },
          ].map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg flex items-center">
                <ChevronRight className="h-5 w-5 text-rose-500 mr-2" />
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="group flex items-center space-x-3 text-gray-600 hover:text-rose-600 transition-all duration-200 p-2 rounded-lg hover:bg-rose-50"
                    >
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                        <item.icon className="h-4 w-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Emergency & Contact Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Emergency Contacts */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Phone className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      24/7 EMERGENCY SUPPORT
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      +91 98765 43210
                    </div>
                  </div>
                </div>
                <a
                  href="tel:+919876543210"
                  className="bg-gradient-to-r from-rose-600 to-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Phone className="inline-block h-4 w-4 mr-2" />
                  CALL NOW
                </a>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-3 border ${contact.color}`}
                  >
                    <div className="text-xl font-bold mb-1">
                      {contact.number}
                    </div>
                    <div className="text-sm font-medium">{contact.label}</div>
                    <div className="text-xs text-gray-600">
                      {contact.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Stay Connected</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Subscribe to receive emergency alerts and donation
                opportunities.
              </p>

              {/* Newsletter Form */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white"
                  />
                  <button className="bg-gradient-to-r from-rose-600 to-rose-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <div className="flex items-center space-x-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${social.color}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-5 w-5 text-rose-500" />
                <a
                  href="mailto:help@JeevanDaan.com"
                  className="hover:text-rose-600 transition-colors"
                >
                  help@JeevanDaan.com
                </a>
              </div>
              <div className="flex items-start space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 text-rose-500 mt-1" />
                <div>
                  <div className="font-medium">JeevanDaan HQ</div>
                  <div className="text-sm text-gray-500">
                    Mumbai, Maharashtra 400001
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <div>
                <div className="font-bold text-gray-900">Secure & Private</div>
                <div className="text-sm text-gray-500">Data Protection</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <Truck className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-bold text-gray-900">Fast Response</div>
                <div className="text-sm text-gray-500">Quick Delivery</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <Clock className="h-6 w-6 text-amber-600" />
              <div>
                <div className="font-bold text-gray-900">24/7 Support</div>
                <div className="text-sm text-gray-500">Always Available</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <Award className="h-6 w-6 text-rose-600" />
              <div>
                <div className="font-bold text-gray-900">Verified</div>
                <div className="text-sm text-gray-500">Hospital Network</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-8 border-t border-gray-200">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
              <Users className="h-5 w-5 text-rose-500" />
              <span className="font-bold text-gray-900">
                Together, We Save Lives
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              © {currentYear} JeevanDaan • A non-profit healthcare initiative
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="#"
              className="text-gray-600 hover:text-rose-600 transition-colors font-medium"
            >
              Terms of Service
            </a>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <a
              href="#"
              className="text-gray-600 hover:text-rose-600 transition-colors font-medium"
            >
              Privacy Policy
            </a>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <a
              href="#"
              className="text-gray-600 hover:text-rose-600 transition-colors font-medium"
            >
              Cookie Policy
            </a>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <a
              href="#"
              className="text-gray-600 hover:text-rose-600 transition-colors font-medium"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>

      {/* CSS for Mobile Optimization */}
      <style jsx global>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 100px;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Better button feedback */
        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
