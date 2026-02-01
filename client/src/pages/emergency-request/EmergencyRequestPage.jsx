import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  Heart,
  Clock,
  Phone,
  Hospital,
  MapPin,
  User,
  Shield,
  CheckCircle,
  Loader2,
  ArrowRight,
  Bell,
  AlertCircle,
  Droplets,
  Users,
  ChevronDown
} from 'lucide-react';

const EmergencyRequestPage = () => {
  const [formData, setFormData] = useState({
    donationType: 'blood',
    bloodGroup: '',
    units: '1',
    hospitalName: '',
    city: '',
    contactNumber: '',
    urgencyTime: '1',
    patientName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [pulse, setPulse] = useState(false);
  const firstInputRef = useRef(null);

  // Auto-focus first input
  useEffect(() => {
    if (firstInputRef.current && currentStep === 1) {
      setTimeout(() => {
        firstInputRef.current.focus();
      }, 100);
    }
  }, [currentStep]);

  // Pulse animation for alert
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Blood groups
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  
  // Urgency times
  const urgencyTimes = [
    { value: '1', label: 'Within 1 hour' },
    { value: '2', label: 'Within 2 hours' },
    { value: '4', label: 'Within 4 hours' },
    { value: '8', label: 'Within 8 hours' },
    { value: '24', label: 'Within 24 hours' }
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle donation type selection
  const handleDonationTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      donationType: type,
      // Reset blood group if switching to organ
      bloodGroup: type === 'organ' ? '' : prev.bloodGroup
    }));
  };

  // Handle blood group selection
  const handleBloodGroupSelect = (group) => {
    setFormData(prev => ({
      ...prev,
      bloodGroup: group
    }));
  };

  // Handle urgency time selection
  const handleUrgencySelect = (time) => {
    setFormData(prev => ({
      ...prev,
      urgencyTime: time
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.contactNumber || !formData.hospitalName || !formData.city) {
      alert('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }

    if (formData.donationType !== 'organ' && !formData.bloodGroup) {
      alert('Please select blood group');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show confirmation
      setIsSubmitted(true);
      setCurrentStep(2);
      
      // Simulate live status updates
      setTimeout(() => setCurrentStep(3), 3000);
      setTimeout(() => setCurrentStep(4), 6000);
      
    } catch (error) {
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form for new request
  const handleNewRequest = () => {
    setFormData({
      donationType: 'blood',
      bloodGroup: '',
      units: '1',
      hospitalName: '',
      city: '',
      contactNumber: '',
      urgencyTime: '1',
      patientName: ''
    });
    setIsSubmitted(false);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-rose-50">
      
      {/* Emergency Alert Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`relative ${pulse ? 'animate-pulse' : ''}`}>
                <AlertTriangle className="h-6 w-6" fill="white" />
              </div>
              <div>
                <div className="text-sm font-medium">EMERGENCY REQUEST PORTAL</div>
                <div className="text-xs opacity-90">Life-critical situations only</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">24/7 Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">IMMEDIATE ACTION REQUIRED</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="block">Emergency</span>
              <span className="block bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
                {formData.donationType === 'organ' ? 'Organ' : 
                 formData.donationType === 'plasma' ? 'Plasma' : 'Blood'} Required Now
              </span>
            </h1>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-rose-200 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-lg font-semibold mb-2">
                      Life-critical situation detected
                    </p>
                    <p className="text-white/90 text-sm sm:text-base">
                      Complete this form to immediately notify nearby donors and hospitals. 
                      Every second counts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {!isSubmitted ? (
          /* Emergency Request Form */
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Donation Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                What is needed? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { type: 'blood', label: 'Blood', icon: Droplets, color: 'border-rose-500 bg-rose-50' },
                  { type: 'plasma', label: 'Plasma', icon: Heart, color: 'border-blue-500 bg-blue-50' },
                  { type: 'organ', label: 'Organ', icon: Heart, color: 'border-purple-500 bg-purple-50' }
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleDonationTypeSelect(item.type)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-3 ${
                      formData.donationType === item.type
                        ? `${item.color} ring-2 ring-offset-2 ring-opacity-50 ${
                            item.type === 'blood' ? 'ring-rose-500' :
                            item.type === 'plasma' ? 'ring-blue-500' : 'ring-purple-500'
                          }`
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <item.icon className={`h-8 w-8 ${
                      formData.donationType === item.type
                        ? item.type === 'blood' ? 'text-rose-600' :
                          item.type === 'plasma' ? 'text-blue-600' : 'text-purple-600'
                        : 'text-gray-400'
                    }`} />
                    <span className={`font-semibold ${
                      formData.donationType === item.type
                        ? item.type === 'blood' ? 'text-rose-700' :
                          item.type === 'plasma' ? 'text-blue-700' : 'text-purple-700'
                        : 'text-gray-700'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Blood Group Selection (if not organ) */}
            {formData.donationType !== 'organ' && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                  Blood Group Required *
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {bloodGroups.map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() => handleBloodGroupSelect(group)}
                      className={`aspect-square rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                        formData.bloodGroup === group
                          ? 'border-red-500 bg-red-50 text-red-600 scale-105'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="text-lg font-bold">{group}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Units Required (if not organ) */}
            {formData.donationType !== 'organ' && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                  Units Required *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, units: unit.toString() }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                        formData.units === unit.toString()
                          ? 'border-red-500 bg-red-50 text-red-600 scale-105'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="text-2xl font-bold">{unit}</span>
                      <span className="text-xs mt-1">Unit{unit > 1 ? 's' : ''}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Urgency Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                Maximum Time Available *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {urgencyTimes.map((time) => (
                  <button
                    key={time.value}
                    type="button"
                    onClick={() => handleUrgencySelect(time.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                      formData.urgencyTime === time.value
                        ? 'border-red-500 bg-red-50 text-red-600 scale-105'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">{time.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Patient Name (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name (Optional)
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent text-lg"
                    placeholder="Patient's name if available"
                  />
                </div>
              </div>

              {/* Hospital Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name *
                </label>
                <div className="relative">
                  <Hospital className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    ref={firstInputRef}
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent text-lg"
                    placeholder="Enter hospital name"
                  />
                </div>
              </div>

              {/* City/Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City/Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent text-lg"
                    placeholder="Enter city name"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent text-lg"
                    placeholder="+91 9876543210"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This number will be shared with verified donors and hospitals
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-gradient-to-r from-red-600 to-rose-500 text-white 
                       rounded-xl font-bold text-xl hover:shadow-xl hover:scale-105 transition-all duration-300 
                       active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
                       flex items-center justify-center space-x-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Sending Emergency Alert...</span>
                </>
              ) : (
                <>
                  <Bell className="h-6 w-6" />
                  <span>Send Emergency Request</span>
                  <ArrowRight className="h-6 w-6" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Confirmation State */
          <div className="space-y-8">
            {/* Confirmation Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Emergency Request Submitted
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We've received your emergency request and are taking immediate action.
              </p>
            </div>

            {/* Live Status Updates */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="space-y-6">
                {/* Step 1: Request Received */}
                <div className={`flex items-center space-x-4 ${currentStep >= 2 ? 'opacity-100' : 'opacity-60'}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {currentStep >= 2 ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Request received and verified</div>
                    <div className="text-sm text-gray-600">System is analyzing your emergency</div>
                  </div>
                </div>

                {/* Step 2: Notifying Donors */}
                <div className={`flex items-center space-x-4 ${currentStep >= 3 ? 'opacity-100' : 'opacity-60'}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 3 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {currentStep >= 3 ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : currentStep === 2 ? (
                      <Loader2 className="h-6 w-6 animate-spin text-red-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {currentStep === 2 ? 'Notifying nearby donors...' : 'Donors notified'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentStep === 2 ? 'Searching within 5km radius' : '15+ donors alerted'}
                    </div>
                  </div>
                </div>

                {/* Step 3: Hospital Coordination */}
                <div className={`flex items-center space-x-4 ${currentStep >= 4 ? 'opacity-100' : 'opacity-60'}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 4 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {currentStep >= 4 ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : currentStep === 3 ? (
                      <Loader2 className="h-6 w-6 animate-spin text-red-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {currentStep >= 4 ? 'Hospital coordinated' : 'Coordinating with hospitals...'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentStep >= 4 ? 'Emergency team activated' : 'Alerting nearby hospitals'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Response Info */}
              <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">What happens next?</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Our emergency response team will call you within 5 minutes</li>
                      <li>• Verified donors will be directed to your hospital</li>
                      <li>• Keep your phone accessible for coordination</li>
                      <li>• Stay with the patient at the hospital</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleNewRequest}
                className="py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 
                         hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>New Emergency Request</span>
              </button>
              <button className="py-4 bg-gradient-to-r from-red-600 to-rose-500 text-white 
                       rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 
                       flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Call Emergency Line</span>
              </button>
            </div>
          </div>
        )}

        {/* Safety & Privacy Notice */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
          <div className="flex items-start space-x-4">
            <Shield className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Safety & Privacy</h4>
              <p className="text-gray-600 text-sm mb-4">
                Your emergency request is treated with utmost confidentiality. Information is shared 
                only with verified donors and hospitals. All communications are encrypted and secure.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-gray-700">Verified Hospitals Only</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-gray-700">Secure Communication</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fallback CTA for Non-Donors */}
        <div className="mt-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-200">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Heart className="h-5 w-5 text-rose-500" fill="#f43f5e" />
              <span className="text-sm font-medium">ARE YOU A DONOR?</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Be Prepared for Emergencies
            </h3>
            
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Register as a donor today and become part of our emergency response network. 
              Your registration could save a life tomorrow.
            </p>
            
            <button className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                     rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 
                     hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 mx-auto">
              <Users className="h-6 w-6" />
              <span>Register as Donor</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '50K+', label: 'Active Donors' },
                { value: '24/7', label: 'Emergency Ready' },
                { value: '5 min', label: 'Average Response' },
                { value: '3 Lives', label: 'Per Donation' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Emergency Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <div>
                <div className="font-semibold">Emergency Hotline</div>
                <div className="text-2xl font-bold">1075</div>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-sm text-gray-400 mb-2">For life-threatening emergencies only</div>
              <div className="text-xs text-gray-500">© JeevanDaan Emergency Response System</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Auto-focus styling */
        input:focus, button:focus {
          outline: none;
        }
        
        /* Better mobile experience */
        @media (max-width: 640px) {
          input, button, select {
            font-size: 16px !important; /* Prevent zoom on iOS */
            min-height: 48px; /* Better touch targets */
          }
        }
        
        /* Smooth transitions */
        * {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 200ms;
        }
      `}</style>
    </div>
  );
};

export default EmergencyRequestPage;