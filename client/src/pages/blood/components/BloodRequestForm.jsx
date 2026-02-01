import React, { useState } from "react";
import { 
  User, 
  Droplets, 
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
  Ambulance,
  ChevronDown,
  X
} from "lucide-react";

export default function BloodRequestForm() {
  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    city: "",
    contact: "",
    urgency: "critical",
    patientAge: "",
    medicalCondition: "",
    requiredDate: "",
    alternativeContact: "",
    doctorName: "",
    patientWeight: "",
    hemoglobinLevel: "",
    crossMatching: "pending"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(async () => {
      try {
        await fetch("/api/urgent/blood", {
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
            bloodGroup: "",
            units: "",
            hospital: "",
            city: "",
            contact: "",
            urgency: "critical",
            patientAge: "",
            medicalCondition: "",
            requiredDate: "",
            alternativeContact: "",
            doctorName: "",
            patientWeight: "",
            hemoglobinLevel: "",
            crossMatching: "pending"
          });
        }, 3000);
        
      } catch (error) {
        alert("Failed to submit request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const urgencyLevels = [
    { value: "critical", label: "Critical (Within 2 hours)", color: "bg-red-100 text-red-700 border-red-200" },
    { value: "urgent", label: "Urgent (Within 6 hours)", color: "bg-orange-100 text-orange-700 border-orange-200" },
    { value: "moderate", label: "Moderate (Within 24 hours)", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    { value: "normal", label: "Normal (Within 48 hours)", color: "bg-green-100 text-green-700 border-green-200" }
  ];

  const handleEmergencyCall = () => {
    window.open("tel:+9118001801234", "_blank");
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-2xl border border-emerald-100 p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center animate-bounce">
                <Ambulance className="h-5 w-5 text-rose-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Emergency Request Submitted! 🚑
              </h3>
              <p className="text-gray-600 mb-4">
                Your blood request has been broadcasted to all nearby blood banks and donors. 
                Our emergency response team is on it.
              </p>
              <div className="bg-rose-50 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-rose-600" />
                  <span className="font-semibold text-gray-900">Emergency ID: </span>
                  <span className="text-rose-600 font-bold">BLOOD-{Date.now().toString().slice(-6)}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleEmergencyCall}
                className="px-6 py-3 bg-white text-rose-600 font-semibold rounded-xl border-2 border-rose-200 hover:border-rose-300 hover:bg-rose-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Helpline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-500 rounded-2xl shadow-xl mb-8 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Emergency Blood Request
                </h2>
                <p className="text-rose-100">Life-saving blood needed urgently</p>
              </div>
            </div>
            <button
              onClick={handleEmergencyCall}
              className="px-6 py-3 bg-white text-rose-600 font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 whitespace-nowrap"
            >
              <Phone className="h-5 w-5" />
              <span>Emergency Call</span>
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Patient Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <User className="h-5 w-5 text-rose-500" />
                <span>Patient Information</span>
              </h3>
              <div className="space-y-4">
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
                      placeholder="Enter patient's full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight *
                    </label>
                    <input
                      type="number"
                      name="patientWeight"
                      value={form.patientWeight}
                      onChange={handleChange}
                      required
                      placeholder="kg"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Condition *
                  </label>
                  <textarea
                    name="medicalCondition"
                    value={form.medicalCondition}
                    onChange={handleChange}
                    required
                    rows="2"
                    placeholder="Describe the medical condition requiring blood"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Blood Requirements */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-rose-500" />
                <span>Blood Requirements</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodGroups.map(group => (
                      <label
                        key={group}
                        className={`relative cursor-pointer ${
                          form.bloodGroup === group
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-rose-200'
                        } border-2 rounded-lg p-3 text-center font-medium transition-all duration-200`}
                      >
                        <input
                          type="radio"
                          name="bloodGroup"
                          value={group}
                          checked={form.bloodGroup === group}
                          onChange={handleChange}
                          required
                          className="sr-only"
                        />
                        {group}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Units Required *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="units"
                      value={form.units}
                      onChange={handleChange}
                      required
                      min="1"
                      max="20"
                      placeholder="Enter number of units"
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      units
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hemoglobin Level
                  </label>
                  <input
                    type="text"
                    name="hemoglobinLevel"
                    value={form.hemoglobinLevel}
                    onChange={handleChange}
                    placeholder="Current hemoglobin level"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cross Matching Status
                  </label>
                  <select
                    name="crossMatching"
                    value={form.crossMatching}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all appearance-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="not-required">Not Required</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Urgency Level */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-rose-500" />
                <span>Urgency Level</span>
              </h3>
              <div className="space-y-2">
                {urgencyLevels.map(level => (
                  <label
                    key={level.value}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
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
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      form.urgency === level.value 
                        ? `border-${level.color.split('-')[1]}-500 bg-${level.color.split('-')[1]}-500` 
                        : 'border-gray-300'
                    }`}></div>
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-sm text-gray-500">Priority: {level.value.toUpperCase()}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Hospital & Location */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Hospital className="h-5 w-5 text-rose-500" />
                <span>Hospital & Location</span>
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
                      placeholder="Hospital where patient is admitted"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
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
                      placeholder="City/Location"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor In-charge
                  </label>
                  <input
                    type="text"
                    name="doctorName"
                    value={form.doctorName}
                    onChange={handleChange}
                    placeholder="Doctor's name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Phone className="h-5 w-5 text-rose-500" />
                <span>Contact Information</span>
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Required Date */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-rose-500" />
                <span>When is Blood Required?</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="requiredDate"
                    value={form.requiredDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Submit */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-6">
          <div className="flex items-start space-x-3 mb-6">
            <Shield className="h-5 w-5 text-rose-500 mt-1 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-900 mb-2">Important Notice:</p>
              <ul className="space-y-1">
                <li>• All information provided must be accurate and verifiable</li>
                <li>• Emergency requests will be broadcasted to nearby blood banks and registered donors</li>
                <li>• Providing false information is punishable by law</li>
                <li>• You will receive SMS updates on request status</li>
                <li>• In critical cases, our team may contact you within 15 minutes</li>
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
                  : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:shadow-xl hover:scale-105 active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5" />
                  <span>🚨 Submit Emergency Request</span>
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

        {/* Emergency Helpline */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
            <AlertCircle className="h-4 w-4 text-rose-500" />
            <span>For immediate assistance, call our 24/7 helpline:</span>
            <a 
              href="tel:+9118001801234" 
              className="font-bold text-rose-600 hover:text-rose-700"
            >
              +91 1800 180 1234
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}