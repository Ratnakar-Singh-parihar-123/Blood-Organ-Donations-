import React, { useState } from 'react';
import { 
  X, Ambulance, Eye, EyeOff, User, Mail, Lock, Phone, 
  MapPin, Heart, Stethoscope, Hospital, AlertCircle, CheckCircle,
  ChevronRight
} from 'lucide-react';
import { patientAuthAPI } from '../../../api';
import { useNavigate } from 'react-router-dom';

const PatientAuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [loginData, setLoginData] = useState({ 
    email: '', 
    password: '' 
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    patientType: 'self',
    bloodGroup: '',
    organRequired: '',
    needType: 'blood',
    medicalCondition: '',
    urgencyLevel: 'normal',
    hospitalName: '',
    doctorName: '',
    city: '',
    emergencyContact: '',
    address: ''
  });

  const patientTypes = [
    { value: 'self', label: 'Self' },
    { value: 'family', label: 'Family Member' },
    { value: 'friend', label: 'Friend' }
  ];

  const needTypes = [
    { value: 'blood', label: 'Blood', icon: Heart },
    { value: 'organ', label: 'Organ', icon: Stethoscope },
    { value: 'both', label: 'Both', icon: Ambulance }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const organs = [
    'Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 
    'Cornea', 'Bone Marrow', 'Skin'
  ];

  const urgencyLevels = [
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-amber-100 text-amber-800' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-800' }
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Indore', 'Bhopal', 'Chandigarh', 'Dehradun', 'Nagpur',
    'Other'
  ];

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    setMessage({ type: '', text: '' });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    setMessage({ type: '', text: '' });
  };

  const validateRegisterForm = () => {
    const errors = [];
    
    // Required fields validation
    const requiredFields = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone number',
      password: 'Password',
      patientType: 'Patient type',
      needType: 'Need type',
      urgencyLevel: 'Urgency level',
      hospitalName: 'Hospital name',
      city: 'City'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!registerData[field]?.toString().trim()) {
        errors.push(`${label} is required`);
      }
    });
    
    // Conditional validation for blood/organ based on needType
    if (registerData.needType === 'blood' || registerData.needType === 'both') {
      if (!registerData.bloodGroup) {
        errors.push('Blood group is required for blood donation');
      }
    }
    
    if (registerData.needType === 'organ' || registerData.needType === 'both') {
      if (!registerData.organRequired) {
        errors.push('Organ required is required for organ donation');
      }
    }
    
    // Format validation
    if (registerData.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    
    if (!/^\d{10}$/.test(registerData.phone.replace(/\D/g, ''))) {
      errors.push('Phone must be 10 digits');
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      errors.push('Valid email is required');
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await patientAuthAPI.login(loginData.email, loginData.password);

      if (response.success) {
        localStorage.setItem('patientToken', response.token);
        localStorage.setItem('patient', JSON.stringify(response.patient));

        setMessage({ type: 'success', text: 'Login successful!' });
        setTimeout(() => {
          onClose();
          navigate('/patient/dashboard');
        }, 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const errors = validateRegisterForm();
    if (errors.length > 0) {
      setMessage({ type: 'error', text: errors[0] });
      setLoading(false);
      return;
    }

    try {
      // EXACT PAYLOAD STRUCTURE AS SPECIFIED
      const registerPayload = {
        name: registerData.name.trim(),
        email: registerData.email.trim(),
        phone: registerData.phone.trim(),
        password: registerData.password,
        patientType: registerData.patientType,          // self|family|friend
        needType: registerData.needType,                // blood|organ|both
        bloodGroup: registerData.needType === 'blood' || registerData.needType === 'both' 
                     ? registerData.bloodGroup 
                     : '',
        organRequired: registerData.needType === 'organ' || registerData.needType === 'both' 
                       ? registerData.organRequired 
                       : '',
        medicalCondition: registerData.medicalCondition?.trim() || '',
        urgencyLevel: registerData.urgencyLevel,       // normal|urgent|emergency
        hospitalName: registerData.hospitalName.trim(),
        doctorName: registerData.doctorName?.trim() || '',
        city: registerData.city,                        // must match backend enum
        emergencyContact: registerData.emergencyContact?.trim() || '',
        address: registerData.address?.trim() || ''
      };

      console.log('📤 Sending patient data:', JSON.stringify(registerPayload, null, 2));

      const response = await patientAuthAPI.register(registerPayload);

      if (response.success) {
        setMessage({ 
          type: 'success', 
          text: 'Registration successful! You can now post requests.' 
        });

        // Auto-login after successful registration
        const loginResponse = await patientAuthAPI.login(
          registerData.email, 
          registerData.password
        );

        if (loginResponse.success) {
          localStorage.setItem('patientToken', loginResponse.token);
          localStorage.setItem('patient', JSON.stringify(loginResponse.patient));

          setTimeout(() => {
            onClose();
            navigate('/patient/dashboard');
          }, 2000);
        }
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Registration failed. Please check all required fields.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-red-500 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Ambulance className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Patient Registration</h2>
                <p className="text-white/90 text-sm">Emergency medical assistance</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {/* Left Side - Info */}
          <div className="hidden md:block bg-gradient-to-b from-rose-50 to-red-50 p-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Required Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg">
                    <span className="text-sm text-gray-700">City Field</span>
                    <span className="text-sm font-medium text-rose-600 bg-rose-100 px-2 py-1 rounded">Required</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    The <strong>city</strong> field is required to match you with local donors and hospitals.
                  </p>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-red-100">
                <h4 className="font-bold text-gray-800 mb-3">Registration Tips</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Provide accurate city for local donor matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Emergency contacts help in urgent situations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Hospital details ensure proper coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Select "Both" if you need blood and organ</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div className="p-6 md:p-8">
            {/* Form Toggle */}
            <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 font-semibold rounded-lg transition-all ${
                  isLogin 
                    ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 font-semibold rounded-lg transition-all ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Register
              </button>
            </div>

            {/* Message Alert */}
            {message.text && (
              <div className={`mb-4 p-4 rounded-xl border-l-4 flex items-start space-x-3 ${
                message.type === 'success' 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800' 
                  : 'bg-red-50 border-red-400 text-red-800'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                      placeholder="patient@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <a href="/forgot-password" className="text-sm text-red-500 hover:text-red-600 font-medium">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Registration Form */
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Patient Registration</h3>
                  <p className="text-sm text-gray-600">All fields marked with * are required</p>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={registerData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                        placeholder="Ravi Kumar"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                        placeholder="ravi@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={registerData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                        placeholder="9876543210"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={registerData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                        placeholder="Password@123"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Type *
                    </label>
                    <select
                      name="patientType"
                      value={registerData.patientType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                      required
                    >
                      {patientTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Need Type *
                    </label>
                    <div className="flex gap-2">
                      {needTypes.map(need => {
                        const Icon = need.icon;
                        return (
                          <button
                            key={need.value}
                            type="button"
                            onClick={() => {
                              setRegisterData(prev => ({ 
                                ...prev, 
                                needType: need.value,
                                bloodGroup: need.value === 'organ' ? '' : prev.bloodGroup,
                                organRequired: need.value === 'blood' ? '' : prev.organRequired
                              }));
                            }}
                            className={`flex-1 py-2.5 rounded-xl border-2 flex items-center justify-center gap-2 ${
                              registerData.needType === need.value
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{need.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(registerData.needType === 'blood' || registerData.needType === 'both') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group {registerData.needType === 'both' ? '*' : ''}
                      </label>
                      <select
                        name="bloodGroup"
                        value={registerData.bloodGroup}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                        required={registerData.needType === 'both'}
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {(registerData.needType === 'organ' || registerData.needType === 'both') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organ Required {registerData.needType === 'both' ? '*' : ''}
                      </label>
                      <select
                        name="organRequired"
                        value={registerData.organRequired}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                        required={registerData.needType === 'both'}
                      >
                        <option value="">Select Organ</option>
                        {organs.map(organ => (
                          <option key={organ} value={organ}>{organ}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        name="city"
                        value={registerData.city}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 appearance-none"
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Condition
                    </label>
                    <input
                      type="text"
                      name="medicalCondition"
                      value={registerData.medicalCondition}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                      placeholder="Accident case, Cancer, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level *
                    </label>
                    <select
                      name="urgencyLevel"
                      value={registerData.urgencyLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                      required
                    >
                      {urgencyLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hospital Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital Name *
                    </label>
                    <div className="relative">
                      <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="hospitalName"
                        value={registerData.hospitalName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                        placeholder="City Hospital"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      name="doctorName"
                      value={registerData.doctorName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                      placeholder="Dr. Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={registerData.emergencyContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                      placeholder="9876500000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={registerData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300"
                      placeholder="Andheri East, Mumbai"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Toggle Link */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                {isLogin ? 'Need to register? Click here' : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAuthModal;