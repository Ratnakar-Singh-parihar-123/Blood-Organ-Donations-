import React, { useState } from "react";
import { 
  User, 
  Heart, 
  Hospital, 
  MapPin, 
  Phone, 
  Clock, 
  AlertCircle,
  Send,
  Calendar,
  FileText,
  Shield,
  CheckCircle,
  Stethoscope,
  ChevronDown,
  X,
  Activity,
  Eye,
  Brain,
  Award,
  Ambulance
} from "lucide-react";

export default function OrganRequestForm() {
  const [form, setForm] = useState({
    patientName: "",
    organType: "",
    hospital: "",
    city: "",
    doctorName: "",
    contact: "",
    urgency: "critical",
    patientAge: "",
    patientWeight: "",
    bloodGroup: "",
    medicalCondition: "",
    hospitalRegistrationId: "",
    requiredDate: "",
    alternativeContact: "",
    transplantHistory: "",
    insuranceNumber: "",
    tissueTyping: "pending",
    priorityScore: "",
    additionalNotes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showOrganInfo, setShowOrganInfo] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(async () => {
      try {
        await fetch("/api/urgent/organ", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setForm({
            patientName: "",
            organType: "",
            hospital: "",
            city: "",
            doctorName: "",
            contact: "",
            urgency: "critical",
            patientAge: "",
            patientWeight: "",
            bloodGroup: "",
            medicalCondition: "",
            hospitalRegistrationId: "",
            requiredDate: "",
            alternativeContact: "",
            transplantHistory: "",
            insuranceNumber: "",
            tissueTyping: "pending",
            priorityScore: "",
            additionalNotes: ""
          });
        }, 3000);
        
      } catch (error) {
        alert("Failed to submit request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const organTypes = [
    { value: "kidney", label: "Kidney", icon: Activity, color: "bg-blue-100 text-blue-700", waitTime: "3-5 years" },
    // { value: "liver", label: "Liver", icon: Liver, color: "bg-green-100 text-green-700", waitTime: "1-2 years" },
    { value: "heart", label: "Heart", icon: Heart, color: "bg-red-100 text-red-700", waitTime: "6-12 months" },
    { value: "lungs", label: "Lungs", icon: Activity, color: "bg-cyan-100 text-cyan-700", waitTime: "1-2 years" },
    { value: "pancreas", label: "Pancreas", icon: Activity, color: "bg-purple-100 text-purple-700", waitTime: "2-3 years" },
    { value: "cornea", label: "Cornea", icon: Eye, color: "bg-indigo-100 text-indigo-700", waitTime: "6-12 months" },
    { value: "bone-marrow", label: "Bone Marrow", icon: Activity, color: "bg-amber-100 text-amber-700", waitTime: "1-3 months" },
    { value: "small-intestine", label: "Small Intestine", icon: Activity, color: "bg-emerald-100 text-emerald-700", waitTime: "1-2 years" }
  ];

  const urgencyLevels = [
    { value: "critical", label: "Critical (Immediate)", color: "bg-red-100 text-red-700 border-red-200", description: "Life-threatening condition" },
    { value: "urgent", label: "Urgent (Within 1 month)", color: "bg-orange-100 text-orange-700 border-orange-200", description: "Rapid deterioration" },
    { value: "moderate", label: "Moderate (3-6 months)", color: "bg-yellow-100 text-yellow-700 border-yellow-200", description: "Stable but declining" },
    { value: "elective", label: "Elective (6+ months)", color: "bg-green-100 text-green-700 border-green-200", description: "Planned transplant" }
  ];

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  const handleEmergencyCall = () => {
    window.open("tel:+9118001805678", "_blank");
  };

  const getOrganIcon = (organType) => {
    const organ = organTypes.find(o => o.value === organType);
    return organ ? organ.icon : Activity;
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-2xl border border-purple-100 p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="h-10 w-10 text-purple-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
                <Heart className="h-5 w-5 text-red-500" fill="#f43f5e" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Organ Request Registered! ❤️
              </h3>
              <p className="text-gray-600 mb-4">
                Your organ transplant request has been submitted to the national registry. 
                Our transplant coordinator will contact you within 24 hours.
              </p>
              <div className="bg-purple-50 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Transplant ID: </span>
                  <span className="text-purple-600 font-bold">TX-{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                You will receive updates via SMS and email as we find potential matches.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleEmergencyCall}
                className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Coordinator</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl shadow-xl mb-8 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Organ Transplant Request
                </h2>
                <p className="text-purple-100">Life-saving organ needed urgently</p>
              </div>
            </div>
            <button
              onClick={handleEmergencyCall}
              className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 whitespace-nowrap"
            >
              <Phone className="h-5 w-5" />
              <span>24/7 Helpline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="text-2xl font-bold text-blue-600 mb-1">15,000+</div>
          <div className="text-sm text-gray-600">Patients Waiting</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="text-2xl font-bold text-green-600 mb-1">3,500+</div>
          <div className="text-sm text-gray-600">Annual Transplants</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="text-2xl font-bold text-red-600 mb-1">21/day</div>
          <div className="text-sm text-gray-600">People Die Waiting</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-500" />
                <span>Patient Information</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="patientName"
                      value={form.patientName}
                      onChange={handleChange}
                      required
                      placeholder="Full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="patientAge"
                    value={form.patientAge}
                    onChange={handleChange}
                    required
                    min="0"
                    max="120"
                    placeholder="Years"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="patientWeight"
                      value={form.patientWeight}
                      onChange={handleChange}
                      required
                      placeholder="kg"
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      kg
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Condition & Diagnosis *
                </label>
                <textarea
                  name="medicalCondition"
                  value={form.medicalCondition}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Detailed medical condition requiring organ transplant"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Organ Selection */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Heart className="h-5 w-5 text-purple-500" />
                <span>Organ Required</span>
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Organ Needed *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {organTypes.map(organ => {
                    const Icon = organ.icon;
                    return (
                      <label
                        key={organ.value}
                        className={`relative cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 flex flex-col items-center justify-center ${
                          form.organType === organ.value
                            ? `${organ.color} border-${organ.color.split('-')[1]}-300 ring-2 ring-${organ.color.split('-')[1]}-200`
                            : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'
                        }`}
                        onMouseEnter={() => setShowOrganInfo(organ.value)}
                        onMouseLeave={() => setShowOrganInfo("")}
                      >
                        <input
                          type="radio"
                          name="organType"
                          value={organ.value}
                          checked={form.organType === organ.value}
                          onChange={handleChange}
                          required
                          className="sr-only"
                        />
                        <Icon className="h-8 w-8 mb-2" />
                        <span className="font-medium text-gray-900">{organ.label}</span>
                        <span className="text-xs text-gray-500 mt-1">Wait: {organ.waitTime}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Additional Transplant Details */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transplant History
                  </label>
                  <select
                    name="transplantHistory"
                    value={form.transplantHistory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select history</option>
                    <option value="first">First Transplant</option>
                    <option value="second">Second Transplant</option>
                    <option value="multiple">Multiple Transplants</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tissue Typing Status
                  </label>
                  <select
                    name="tissueTyping"
                    value={form.tissueTyping}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="partial">Partially Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Hospital & Urgency */}
          <div className="space-y-6">
            {/* Urgency Level */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <span>Urgency Level</span>
              </h3>
              <div className="space-y-2">
                {urgencyLevels.map(level => (
                  <label
                    key={level.value}
                    className={`flex items-start space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      form.urgency === level.value
                        ? `${level.color} ring-2 ring-offset-2 ring-${level.color.split('-')[1]}-300`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={level.value}
                      checked={form.urgency === level.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 ${
                      form.urgency === level.value 
                        ? `border-${level.color.split('-')[1]}-500 bg-${level.color.split('-')[1]}-500` 
                        : 'border-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <div className="font-medium">{level.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{level.description}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Priority Score */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Score (Optional)
                </label>
                <input
                  type="number"
                  name="priorityScore"
                  value={form.priorityScore}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="0-100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Hospital Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Hospital className="h-5 w-5 text-purple-500" />
                <span>Hospital Information</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Name *
                  </label>
                  <div className="relative">
                    <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="hospital"
                      value={form.hospital}
                      onChange={handleChange}
                      required
                      placeholder="Transplant center name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Registration ID
                  </label>
                  <input
                    type="text"
                    name="hospitalRegistrationId"
                    value={form.hospitalRegistrationId}
                    onChange={handleChange}
                    placeholder="Hospital registration number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor In-charge *
                  </label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="doctorName"
                      value={form.doctorName}
                      onChange={handleChange}
                      required
                      placeholder="Transplant surgeon name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="City where hospital is located"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Phone className="h-5 w-5 text-purple-500" />
                <span>Contact & Timeline</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Contact *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="contact"
                      value={form.contact}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternative Contact
                  </label>
                  <input
                    type="tel"
                    name="alternativeContact"
                    value={form.alternativeContact}
                    onChange={handleChange}
                    placeholder="Alternative contact number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Transplant Date *
                  </label>
                  <input
                    type="date"
                    name="requiredDate"
                    value={form.requiredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="insuranceNumber"
                    value={form.insuranceNumber}
                    onChange={handleChange}
                    placeholder="Health insurance number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-500" />
            <span>Additional Notes</span>
          </h3>
          <textarea
            name="additionalNotes"
            value={form.additionalNotes}
            onChange={handleChange}
            rows="3"
            placeholder="Any additional information, special requirements, or notes for the transplant coordinator..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* Terms & Submit */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-6">
          <div className="flex items-start space-x-3 mb-6">
            <Shield className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-900 mb-2">Important Legal & Medical Information:</p>
              <ul className="space-y-1">
                <li>• Organ allocation follows national guidelines and priority scoring</li>
                <li>• All information will be verified with the transplant center</li>
                <li>• Patients are prioritized based on medical urgency and waiting time</li>
                <li>• Organ trafficking is illegal and punishable by law</li>
                <li>• This request will be added to the national organ waitlist registry</li>
                <li>• You will be contacted within 24 hours by a transplant coordinator</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-8 py-4 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-xl hover:scale-105 active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5" />
                  <span>🚨 Submit Organ Request</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Information & Helpline */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-purple-500" />
              <span>For immediate assistance or organ donation information:</span>
            </div>
            <div className="flex items-center space-x-2">
              <a 
                href="tel:+9118001805678" 
                className="font-bold text-purple-600 hover:text-purple-700"
              >
                +91 1800 180 5678
              </a>
              <span className="text-gray-400">•</span>
              <a 
                href="mailto:organ@lifesaver.com" 
                className="font-medium text-purple-600 hover:text-purple-700"
              >
                organ@lifesaver.com
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}