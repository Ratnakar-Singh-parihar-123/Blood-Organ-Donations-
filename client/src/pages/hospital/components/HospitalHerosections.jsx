import React from "react";
import {
    Heart,
    Calendar,
    Shield,
    Clock,
    User,
    Award,
    ChevronRight,
    CheckCircle,
    MapPin,
    Phone,
    Star,
    TrendingUp,
    AlertCircle,
    ArrowRight,
    RefreshCw,
    Zap,
    Target,
    Leaf,
    LifeBuoy,
    Stethoscope,
    Globe,
    Building,
    FileText,
    Users,
    PhoneCall,
    Mail,
    Brain,
    Eye,
    Activity,
    HeartPulse,
    Ambulance,
    HelpCircle,
    Download,
    CalendarDays,
    ClipboardCheck,
    BadgeCheck
} from "lucide-react";

const HospitalHerosections = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-white">
            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tr from-blue-100/30 to-cyan-100/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>

                {/* Floating Particles */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 md:w-4 md:h-4 bg-blue-400/30 rounded-full animate-bounce hidden sm:block"></div>
                <div className="absolute top-1/3 right-1/3 w-2 h-2 md:w-3 md:h-3 bg-cyan-400/30 rounded-full animate-bounce delay-100 hidden sm:block"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20 xl:py-28">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="relative z-10 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-xs md:text-sm font-medium mb-6 md:mb-8 shadow-xl shadow-blue-500/30">
                                <div className="p-1 md:p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                                    <Building className="h-3 w-3 md:h-4 md:w-4" />
                                </div>
                                <span className="font-semibold tracking-wide">Rajhe Hospital - Organ Donation Center</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                                Give the Gift of
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600">
                                    Life Through Organ Donation
                                </span>
                            </h1>

                            <p className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
                                At Rajhe Hospital's Organ Donation Center, we believe one donor can save up to 8 lives and enhance the quality of life for 75+ individuals. Join us in creating a legacy of life.
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 md:mt-10">
                                {[
                                    { icon: Users, value: "500+", label: "Transplants", color: "from-blue-500 to-blue-600" },
                                    { icon: Heart, value: "24/7", label: "Emergency", color: "from-red-500 to-red-600" },
                                    { icon: Award, value: "NABH", label: "Accredited", color: "from-emerald-500 to-emerald-600" },
                                    { icon: Clock, value: "98%", label: "Success Rate", color: "from-purple-500 to-purple-600" },
                                ].map((stat, idx) => (
                                    <div key={idx} className="group bg-white p-3 sm:p-4 rounded-xl shadow-lg border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-md`}>
                                                <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-12">
                                <button className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <span className="flex items-center justify-center gap-2 sm:gap-3 relative z-10">
                                        <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span>Register as Donor</span>
                                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <button className="group flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-700 rounded-xl font-medium border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 group-hover:text-blue-700" />
                                    <span className="text-sm sm:text-base">Download Info Kit</span>
                                    <Download className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                            </div>

                            {/* Quick Contact */}
                            <div className="mt-10 md:mt-14">
                                <p className="text-sm font-medium text-gray-500 mb-3 md:mb-4 flex items-center gap-2">
                                    <HelpCircle className="h-4 w-4" />
                                    Need immediate assistance?
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { icon: Phone, title: "24/7 Helpline", value: "1800-XXX-XXXX", bg: "bg-blue-50", border: "border-blue-100" },
                                        { icon: Mail, title: "Email Support", value: "donation@hospital.com", bg: "bg-cyan-50", border: "border-cyan-100" },
                                        { icon: Ambulance, title: "Emergency", value: "Immediate Response", bg: "bg-red-50", border: "border-red-100" },
                                    ].map((contact, idx) => (
                                        <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl border ${contact.border} ${contact.bg} hover:shadow-md transition-shadow`}>
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                <contact.icon className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500 truncate">{contact.title}</p>
                                                <p className="font-semibold text-gray-900 text-sm truncate">{contact.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Image Section */}
                        <div className="relative order-1 lg:order-2">
                            {/* Main Card Container */}
                            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-blue-500/20 p-4 md:p-6 lg:p-8 overflow-hidden">
                                {/* Background Elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-gradient-to-br from-blue-100/50 to-cyan-100/30 rounded-full -translate-y-16 md:-translate-y-32 translate-x-16 md:translate-x-32"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-tr from-blue-100/30 to-cyan-100/20 rounded-full translate-y-8 md:translate-y-16 -translate-x-8 md:-translate-x-16"></div>

                                {/* Main Image */}
                                <div className="relative z-10">
                                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg md:shadow-xl">
                                        <img
                                            src="https://kdmhospital.in/wp-content/uploads/2025/02/All-modern-facilities-1024x683.png"
                                            alt="Modern Hospital Facility"
                                            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover transform hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                </div>

                                {/* Floating Impact Card */}
                                <div className="absolute top-3 md:top-4 lg:top-6 right-3 md:right-4 lg:right-6 bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl lg:rounded-2xl p-3 md:p-4 lg:p-5 shadow-lg md:shadow-xl lg:shadow-2xl">
                                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md md:shadow-lg">
                                            <Users className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">8+ Lives</p>
                                            <p className="text-xs md:text-sm text-gray-600">Can be saved</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Certification Badge */}
                                {/* <div className="absolute bottom-3 md:bottom-4 lg:bottom-6 left-3 md:left-4 lg:left-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 shadow-lg md:shadow-xl lg:shadow-2xl">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <BadgeCheck className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                                        <div>
                                            <p className="font-bold text-sm md:text-base">NABH</p>
                                            <p className="text-xs opacity-90">Accredited</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= IMPACT SECTION ================= */}
            <section className="py-12 md:py-16 lg:py-20 xl:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                        {/* Image Section */}
                        <div className="relative order-2 lg:order-1">
                            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-blue-500/10 p-4 md:p-6 overflow-hidden">
                                <img
                                    src="https://www.gleneagleshospitals.co.in/assets/2025-02/conditions-treated-heart-transplant.png?VersionId=Y46kJn8zHgYdgl3tjzP.wNOpJLf._o9j"
                                    alt="Transplant Success Story"
                                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-96 rounded-xl md:rounded-2xl shadow-lg object-cover"
                                />

                                {/* Floating Stats Cards */}
                                {/* <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl p-3 md:p-4 lg:p-6 max-w-[180px] md:max-w-xs">
                                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md md:shadow-lg">
                                            <CheckCircle className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm md:text-base">100% Legal</p>
                                            <p className="text-gray-600 text-xs md:text-sm">Govt. Approved</p>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl p-3 md:p-4 lg:p-6 max-w-[180px] md:max-w-xs">
                                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                                        <div className="p-2 md:p-3 bg-white/20 rounded-lg md:rounded-xl backdrop-blur-sm">
                                            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm md:text-base">95% Success</p>
                                            <p className="opacity-90 text-xs md:text-sm">Transplant Rate</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-xs md:text-sm font-medium mb-6 md:mb-8">
                                <Target className="h-3 w-3 md:h-4 md:w-4" />
                                <span className="font-semibold">The Power of Donation</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                                One Donor Can
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                                    Transform Multiple Lives
                                </span>
                            </h2>

                            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 lg:mb-10 leading-relaxed">
                                At Rajhe Hospital, we've witnessed how organ donation creates lasting legacies.
                                Your decision today can give someone a second chance at life tomorrow.
                            </p>

                            {/* Key Impact Points */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {[
                                    {
                                        icon: LifeBuoy,
                                        title: "Save 8 Lives",
                                        desc: "One donor can save up to 8 different lives",
                                        color: "from-blue-500 to-blue-600"
                                    },
                                    {
                                        icon: Leaf,
                                        title: "Leave a Legacy",
                                        desc: "Create an enduring legacy of compassion",
                                        color: "from-emerald-500 to-emerald-600"
                                    },
                                    {
                                        icon: Users,
                                        title: "Family Consent",
                                        desc: "Process begins only with family consent",
                                        color: "from-purple-500 to-purple-600"
                                    },
                                    {
                                        icon: Globe,
                                        title: "Advance Medicine",
                                        desc: "Contribute to medical research and innovation",
                                        color: "from-cyan-500 to-cyan-600"
                                    }
                                ].map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={idx} className="group bg-white p-4 md:p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                                            <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${item.color} rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                                                <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 md:mb-2">{item.title}</h3>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <button className="mt-8 md:mt-10 group flex items-center gap-2 md:gap-3 text-blue-600 font-semibold text-base md:text-lg hover:text-blue-700 transition-colors">
                                <span>Learn More About Impact</span>
                                <ChevronRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= REGISTRATION PROCESS ================= */}
            <section className="py-12 md:py-16 lg:py-20 xl:py-28 bg-gradient-to-b from-white to-blue-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-12 lg:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-xs md:text-sm font-medium mb-4 md:mb-6">
                            <RefreshCw className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="font-semibold">Simple Registration Process</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                            How to Become a Donor
                            <span className="block text-base md:text-lg font-normal text-gray-600 mt-2 md:mt-4 max-w-2xl mx-auto px-4">
                                Four simple steps to register as an organ donor and potentially save lives
                            </span>
                        </h2>
                    </div>

                    {/* Process Steps */}
                    <div className="relative">
                        {/* Connection Line */}
                        <div className="hidden lg:block absolute top-12 md:top-16 lg:top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                            {[
                                {
                                    number: "01",
                                    title: "Complete Registration",
                                    desc: "Fill our secure online form or visit hospital",
                                    icon: FileText,
                                    color: "from-blue-500 to-blue-600"
                                },
                                {
                                    number: "02",
                                    title: "Family Notification",
                                    desc: "Inform family members about your decision",
                                    icon: Users,
                                    color: "from-cyan-500 to-cyan-600"
                                },
                                {
                                    number: "03",
                                    title: "Medical Counseling",
                                    desc: "Expert consultation and information session",
                                    icon: Stethoscope,
                                    color: "from-purple-500 to-purple-600"
                                },
                                {
                                    number: "04",
                                    title: "Registration Complete",
                                    desc: "You're officially in the donor registry",
                                    icon: CheckCircle,
                                    color: "from-emerald-500 to-emerald-600"
                                }
                            ].map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <div key={idx} className="group relative">
                                        <div className="relative bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-gray-100 p-4 md:p-6 lg:p-8 transition-all duration-500 group-hover:shadow-xl md:group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-blue-300">
                                            {/* Step Number */}
                                            <div className={`absolute -top-3 md:-top-4 lg:-top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${step.color} rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-xl lg:text-2xl shadow-lg md:shadow-xl lg:shadow-2xl z-20`}>
                                                {step.number}
                                            </div>

                                            {/* Icon */}
                                            <div className="mb-4 md:mb-6 lg:mb-8 pt-4 md:pt-6 flex justify-center">
                                                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${step.color} rounded-lg md:rounded-xl flex items-center justify-center shadow-md md:shadow-lg`}>
                                                        <Icon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 text-center mb-2 md:mb-3 lg:mb-4 leading-tight">{step.title}</h3>
                                            <p className="text-gray-600 text-center text-xs md:text-sm leading-relaxed">{step.desc}</p>

                                            {/* Progress Arrow */}
                                            <div className="mt-4 md:mt-6 flex justify-center">
                                                <ArrowRight className="h-4 w-4 text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-all duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-10 md:mt-12 lg:mt-16 xl:mt-20">
                        <button className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-xl font-semibold text-base md:text-lg shadow-xl md:shadow-2xl shadow-blue-500/30 hover:shadow-2xl md:hover:shadow-3xl hover:shadow-blue-500/40 transition-all duration-300 inline-flex items-center gap-2 md:gap-3">
                            <FileText className="h-4 w-4 md:h-5 md:w-5" />
                            Start Registration Now
                            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                        </button>
                        <p className="text-sm text-gray-500 mt-3 md:mt-4 lg:mt-6">Registration takes less than 5 minutes</p>
                    </div>
                </div>
            </section>

            {/* ================= SERVICES SECTION ================= */}
            <section className="py-12 md:py-16 lg:py-20 xl:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-12 lg:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-xs md:text-sm font-medium mb-4 md:mb-6">
                            <Building className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="font-semibold">Our Transplant Services</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                            Comprehensive Transplant
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                                Care Programs
                            </span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                            State-of-the-art facilities and expert teams for all major organ transplant procedures
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {[
                            {
                                icon: Heart,
                                title: "Heart Transplant",
                                desc: "Advanced cardiac transplant program with 98% success rate",
                                color: "from-red-500 to-pink-600"
                            },
                            {
                                icon: Kidney,
                                title: "Kidney Transplant",
                                desc: "Living and deceased donor kidney transplantation",
                                color: "from-blue-500 to-cyan-600"
                            },
                            {
                                icon: HeartPulse,
                                title: "HeartPulse Transplant",
                                desc: "Specialized HeartPulse transplant surgical team",
                                color: "from-emerald-500 to-green-600"
                            },
                            {
                                icon: Activity,
                                title: "Activity Transplant",
                                desc: "Comprehensive pulmonary transplant center",
                                color: "from-purple-500 to-indigo-600"
                            },
                            {
                                icon: Eye,
                                title: "Cornea Donation",
                                desc: "Restoring vision through cornea transplantation",
                                color: "from-amber-500 to-orange-600"
                            },
                            {
                                icon: Shield,
                                title: "Post-Transplant Care",
                                desc: "Complete follow-up care and monitoring",
                                color: "from-gray-500 to-gray-700"
                            }
                        ].map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <div key={idx} className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg md:shadow-xl border border-gray-100 hover:border-blue-300 hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                                    <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${service.color} rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 md:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md md:shadow-lg`}>
                                        <Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4">{service.title}</h3>
                                    <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-5 lg:mb-6">{service.desc}</p>
                                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1 md:gap-2 group-hover:gap-2 md:group-hover:gap-3 transition-all">
                                        Learn More
                                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Stats Banner */}
                    <div className="mt-12 md:mt-16 lg:mt-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 xl:p-12 text-white">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {[
                                { value: "500+", label: "Transplants" },
                                { value: "50+", label: "Expert Surgeons" },
                                { value: "24/7", label: "Emergency Support" },
                                { value: "98%", label: "Success Rate" }
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">{stat.value}</p>
                                    <p className="text-blue-100 text-xs md:text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= EMERGENCY SECTION ================= */}
            <section className="py-12 md:py-16 lg:py-20 xl:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl">
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600"></div>
                        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>

                        <div className="relative p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16">
                            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-medium mb-6 md:mb-8">
                                        <AlertCircle className="h-4 w-4 md:h-5 md:w-5" />
                                        <span>24/7 Emergency Response</span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                                        Immediate Organ Donation
                                        <span className="block text-blue-100">Assistance Available</span>
                                    </h2>

                                    <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8 lg:mb-10 max-w-lg leading-relaxed">
                                        Our dedicated emergency team is available round-the-clock to handle organ donation cases with utmost care and urgency.
                                    </p>

                                    {/* Emergency Stats */}
                                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                                        {[
                                            { value: "15 min", label: "Avg Response", icon: Clock },
                                            { value: "50+", label: "Cases", icon: Activity }
                                        ].map((stat, idx) => {
                                            const Icon = stat.icon;
                                            return (
                                                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 lg:p-5 border border-white/20">
                                                    <div className="flex items-center gap-2 md:gap-3">
                                                        <div className="p-1.5 md:p-2 bg-white/20 rounded-lg">
                                                            <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                                                            <p className="text-blue-200 text-xs md:text-sm">{stat.label}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Contact Card */}
                                <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-white/20">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 lg:mb-8">Emergency Contact</h3>

                                    <div className="space-y-3 md:space-y-4 lg:space-y-6">
                                        {[
                                            {
                                                icon: PhoneCall,
                                                title: "Emergency Helpline",
                                                contact: "1800-XXX-XXXX",
                                                bg: "bg-white/10"
                                            },
                                            {
                                                icon: Mail,
                                                title: "Email Support",
                                                contact: "emergency@hospital.com",
                                                bg: "bg-white/5"
                                            },
                                            {
                                                icon: MapPin,
                                                title: "Hospital Address",
                                                contact: "Rajhe Hospital, Main Road, City",
                                                bg: "bg-white/10"
                                            },
                                            {
                                                icon: CalendarDays,
                                                title: "Available",
                                                contact: "24 Hours, 7 Days",
                                                bg: "bg-white/5"
                                            }
                                        ].map((item, idx) => {
                                            const Icon = item.icon;
                                            return (
                                                <div key={idx} className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${item.bg} border border-white/10`}>
                                                    <div className="p-2 md:p-3 bg-white/20 rounded-lg md:rounded-xl">
                                                        <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-medium text-white text-xs md:text-sm mb-1">{item.title}</p>
                                                        <p className="text-base md:text-lg font-semibold text-white truncate">{item.contact}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button className="w-full mt-6 md:mt-8 bg-white text-blue-600 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-blue-50 transition-colors shadow-lg">
                                        Call Emergency Helpline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FAQ SECTION ================= */}
            <section className="py-12 md:py-16 lg:py-20 xl:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10 md:mb-12 lg:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                            Frequently Asked
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                                Questions
                            </span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                            Get answers to common questions about organ donation and transplantation
                        </p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        {[
                            {
                                question: "Who is eligible to become an organ donor?",
                                answer: "Anyone aged 18 years or older can register as an organ donor. The final decision is made by our medical team based on comprehensive evaluation."
                            },
                            {
                                question: "Does organ donation disfigure the body?",
                                answer: "No. Organ donation is performed with utmost respect and care. The body's external appearance is completely preserved, allowing for open-casket funeral services."
                            },
                            {
                                question: "Are there any costs to the donor's family?",
                                answer: "No costs are associated with organ donation. All medical expenses related to the donation process are covered by the hospital and recipient's insurance."
                            },
                            {
                                question: "What religions support organ donation?",
                                answer: "All major religions recognize organ donation as an act of charity and compassion. Most religious leaders actively encourage donation as a way to save lives."
                            },
                            {
                                question: "Can I change my mind after registering?",
                                answer: "Yes, you can change your decision at any time. Simply contact our donor registry to update your donor status preferences."
                            },
                            {
                                question: "How are organs matched with recipients?",
                                answer: "Organs are matched through a national computerized system based on medical urgency, blood type, tissue type, organ size, and waiting time."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="group bg-white rounded-xl md:rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg md:hover:shadow-xl overflow-hidden">
                                <button className="w-full text-left p-4 md:p-6 lg:p-8 flex items-center justify-between hover:bg-blue-50/50 transition-colors">
                                    <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                                        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="font-bold text-blue-700 text-sm md:text-base lg:text-lg">Q{idx + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base md:text-lg lg:text-lg font-semibold text-gray-900">{faq.question}</h3>
                                            <div className="mt-1 md:mt-2">
                                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-gray-400 group-hover:text-blue-600 group-hover:rotate-90 transition-transform duration-300 flex-shrink-0 ml-2 md:ml-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* FAQ CTA */}
                    <div className="text-center mt-8 md:mt-10 lg:mt-12">
                        <p className="text-gray-600 mb-4 md:mb-6">Still have questions?</p>
                        <button className="inline-flex items-center gap-2 md:gap-3 text-blue-600 font-semibold text-base md:text-lg hover:text-blue-700 transition-colors">
                            <span>Contact Our Support Team</span>
                            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= HOSPITAL CREDENTIALS ================= */}
            <section className="py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-blue-100 p-4 md:p-6 lg:p-8 xl:p-12">
                        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    icon: Building,
                                    title: "Rajhe Hospital",
                                    description: "NABH Accredited Medical Center",
                                    features: ["Advanced facilities", "Intl. standards", "Modern technology"],
                                    color: "from-blue-500 to-blue-600"
                                },
                                {
                                    icon: Award,
                                    title: "Expert Medical Team",
                                    description: "Specialized Surgeons & Physicians",
                                    features: ["50+ surgeons", "Team approach", "Continuous training"],
                                    color: "from-emerald-500 to-emerald-600"
                                },
                                {
                                    icon: Shield,
                                    title: "Quality & Safety",
                                    description: "Standard Treatment Protocols",
                                    features: ["98% success rate", "Safety protocols", "Patient focused"],
                                    color: "from-purple-500 to-purple-600"
                                }
                            ].map((credential, idx) => {
                                const Icon = credential.icon;
                                return (
                                    <div key={idx} className="text-center group">
                                        <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-gradient-to-br ${credential.color} rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-white" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-base md:text-lg lg:text-xl mb-2 md:mb-3">{credential.title}</h3>
                                        <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">{credential.description}</p>
                                        <ul className="space-y-1 md:space-y-2">
                                            {credential.features.map((feature, fIdx) => (
                                                <li key={fIdx} className="text-xs md:text-sm text-gray-500 flex items-center justify-center gap-1 md:gap-2">
                                                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Accreditation Badges */}
                        <div className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 lg:pt-12 border-t border-gray-200">
                            <p className="text-center text-gray-600 mb-4 md:mb-6 lg:mb-8 text-sm md:text-base">Accreditations & Recognitions</p>
                            <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
                                {["NABH", "ISO 9001", "JCI", "National Award", "State Recognition"].map((badge, idx) => (
                                    <div key={idx} className="px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-white rounded-lg md:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                        <span className="font-semibold text-gray-700 text-xs md:text-sm lg:text-base">{badge}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Custom Icon Components
const Kidney = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

export default HospitalHerosections;