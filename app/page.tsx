"use client"

import { useState, useEffect } from "react"
import { Phone, MapPin, Clock, Shield, TestTube, Menu, X, Moon, Sun, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function HospitalWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const isDocAvailable = (days: string, startTime: string, endTime: string) => {
    if (!currentTime) return "unavailable"
    const now = currentTime
    const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute

    // Convert day number to day name
    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const currentDayName = dayNames[currentDay]

    // Parse days
    const daysList = days.toLowerCase()
    let isDayMatch = false

    if (daysList.includes("daily") || daysList.includes("24/7")) {
      isDayMatch = true
    } else if (daysList.includes("mon-sat") && currentDay >= 1 && currentDay <= 6) {
      isDayMatch = true
    } else if (daysList.includes("mon-fri") && currentDay >= 1 && currentDay <= 5) {
      isDayMatch = true
    } else if (daysList.includes("tuesday") && currentDay === 2) {
      isDayMatch = true
    } else if (daysList.includes("thursday") && currentDay === 4) {
      isDayMatch = true
    } else if (daysList.includes("saturday") && currentDay === 6) {
      isDayMatch = true
    } else if (daysList.includes(currentDayName)) {
      isDayMatch = true
    }

    if (!isDayMatch) return "unavailable"
    if (startTime === "24/7" || endTime === "24/7") return "available"

    // Parse time
    const parseTime = (timeStr: string) => {
      if (timeStr === "24/7") return 0
      const [time, period] = timeStr.split(" ")
      const [hours, minutes] = time.split(":").map(Number)
      let hour24 = hours
      if (period === "PM" && hours !== 12) hour24 += 12
      if (period === "AM" && hours === 12) hour24 = 0
      return hour24 * 60 + minutes
    }

    const startMinutes = parseTime(startTime)
    const endMinutes = parseTime(endTime)

    // Enhanced timing logic
    if (currentTimeInMinutes >= startMinutes && currentTimeInMinutes <= endMinutes) {
      return "available"
    } else if (currentTimeInMinutes < startMinutes && currentTimeInMinutes >= startMinutes - 30) {
      // Available soon if within 30 minutes of start time
      return "soon"
    }
    return "unavailable"
  }

  const doctors = [
    {
      name: "Dr. Ahmad Khan",
      specialty: "General Physician",
      days: "Monday - Saturday",
      startTime: "8:00 AM",
      endTime: "2:00 PM",
      room: "Room 1",
      experience: "15+ years",
      contact: "0300-111-2233",
    },
    {
      name: "Dr. Fatima Shah",
      specialty: "Pediatrician",
      days: "Monday - Friday",
      startTime: "9:00 AM",
      endTime: "1:00 PM",
      room: "Room 2",
      experience: "12+ years",
      contact: "0300-111-2244",
    },
    {
      name: "Dr. Hassan Ali",
      specialty: "Emergency Doctor",
      days: "Daily",
      startTime: "24/7",
      endTime: "24/7",
      room: "Emergency Ward",
      experience: "10+ years",
      contact: "091-123-4567",
    },
    {
      name: "Dr. Ayesha Malik",
      specialty: "Gynecologist",
      days: "Tuesday, Thursday, Saturday",
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      room: "Room 3",
      experience: "18+ years",
      contact: "0300-111-2266",
    },
    {
      name: "Dr. Imran Ahmed",
      specialty: "General Physician",
      days: "Monday - Friday",
      startTime: "4:00 PM",
      endTime: "8:00 PM",
      room: "Room 4",
      experience: "8+ years",
      contact: "0300-111-2277",
    },
    {
      name: "Dr. Sadia Rehman",
      specialty: "Pediatrician",
      days: "Tuesday, Thursday, Saturday",
      startTime: "5:00 PM",
      endTime: "8:00 PM",
      room: "Room 5",
      experience: "14+ years",
      contact: "0300-111-2288",
    },
    {
      name: "Dr. Tariq Mahmood",
      specialty: "Orthopedic Surgeon",
      days: "Monday, Wednesday, Friday",
      startTime: "11:00 AM",
      endTime: "3:00 PM",
      room: "Room 6",
      experience: "20+ years",
      contact: "0300-111-2299",
    },
    {
      name: "Dr. Nadia Iqbal",
      specialty: "Dermatologist",
      days: "Tuesday, Thursday",
      startTime: "2:00 PM",
      endTime: "6:00 PM",
      room: "Room 7",
      experience: "11+ years",
      contact: "0300-111-3300",
    },
    {
      name: "Dr. Usman Shah",
      specialty: "Cardiologist",
      days: "Wednesday, Friday",
      startTime: "9:00 AM",
      endTime: "1:00 PM",
      room: "Room 8",
      experience: "16+ years",
      contact: "0300-111-3311",
    },
    {
      name: "Dr. Rabia Khan",
      specialty: "ENT Specialist",
      days: "Monday, Wednesday, Saturday",
      startTime: "3:00 PM",
      endTime: "7:00 PM",
      room: "Room 9",
      experience: "13+ years",
      contact: "0300-111-3322",
    },
    {
      name: "Dr. Bilal Ahmed",
      specialty: "Neurologist",
      days: "Tuesday, Friday",
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      room: "Room 10",
      experience: "19+ years",
      contact: "0300-111-3333",
    },
    {
      name: "Dr. Zainab Ali",
      specialty: "Psychiatrist",
      days: "Thursday, Saturday",
      startTime: "4:00 PM",
      endTime: "8:00 PM",
      room: "Room 11",
      experience: "9+ years",
      contact: "0300-111-3344",
    },
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "available":
        return {
          text: "Available Now",
          color: "text-emerald-700 dark:text-emerald-300",
          bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
          borderColor: "border-emerald-300 dark:border-emerald-700",
          cardBg: "bg-emerald-50 dark:bg-emerald-900/20",
          icon: CheckCircle,
          dotColor: "bg-emerald-500",
          headerGradient: "from-emerald-500 to-green-600",
        }
      case "soon":
        return {
          text: "Available Soon",
          color: "text-amber-700 dark:text-amber-300",
          bgColor: "bg-amber-100 dark:bg-amber-900/30",
          borderColor: "border-amber-300 dark:border-amber-700",
          cardBg: "bg-amber-50 dark:bg-amber-900/20",
          icon: Clock,
          dotColor: "bg-amber-500",
          headerGradient: "from-amber-500 to-orange-600",
        }
      default:
        return {
          text: "Not Available",
          color: "text-rose-700 dark:text-rose-300",
          bgColor: "bg-rose-100 dark:bg-rose-900/30",
          borderColor: "border-rose-300 dark:border-rose-700",
          cardBg: "bg-rose-50 dark:bg-rose-900/20",
          icon: AlertCircle,
          dotColor: "bg-rose-500",
          headerGradient: "from-rose-500 to-red-600",
        }
    }
  }

  // Group doctors by status
  const availableDoctors = doctors.filter(
    (doctor) => isDocAvailable(doctor.days, doctor.startTime, doctor.endTime) === "available",
  )
  const soonDoctors = doctors.filter(
    (doctor) => isDocAvailable(doctor.days, doctor.startTime, doctor.endTime) === "soon",
  )
  const unavailableDoctors = doctors.filter(
    (doctor) => isDocAvailable(doctor.days, doctor.startTime, doctor.endTime) === "unavailable",
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Restructured Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        {/* Emergency Top Bar */}
        <div className="bg-red-600 dark:bg-red-700 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-2 text-sm font-semibold">
              <Phone className="w-4 h-4" />
              <a href="tel:091-123-4567" className="hover:underline">
                Emergency: 091-123-4567
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Hospital Info */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 dark:text-white leading-tight">
                  Gov. Category D Hospital
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-300">Warsak Road Kochian</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { label: "Doctors", id: "doctors" },
                { label: "Lab", id: "lab" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium py-2 px-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </motion.button>

              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <div className="flex flex-col space-y-2">
                {[
                  { label: "Doctors", id: "doctors" },
                  { label: "Lab", id: "lab" },
                  { label: "Contact", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium py-3 px-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-left transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background Image - Responsive */}
        <div className="absolute inset-0">
          {/* Mobile Image - Full building view */}
          <img
            src="/placeholder.svg?height=600&width=400"
            alt="Government Category D Hospital Building"
            className="w-full h-full object-cover sm:hidden"
          />
          {/* Desktop Image - Wide hospital view */}
          <img
            src="https://relief.rmi.edu.pk/wp-content/uploads/2024/10/gari-tajik-1536x400.jpg"
            alt="Government Category D Hospital Building"
            className="w-full h-full object-cover hidden sm:block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 dark:from-black/80 dark:via-black/60 dark:to-black/80"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Quality Healthcare for Our Community
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-8 max-w-4xl mx-auto drop-shadow-xl font-medium">
              Providing essential medical services to Kochian and surrounding areas with modern facilities and
              experienced doctors
            </p>
            <div className="text-sm sm:text-base text-gray-200 bg-black/40 backdrop-blur-md rounded-lg px-6 py-3 inline-block border border-white/20">
              Current time:{" "}
              {currentTime ? `${currentTime.toLocaleTimeString()} • ${currentTime.toLocaleDateString()}` : "Loading..."}
            </div>
          </motion.div>

          {/* Enhanced Quick Stats with better visibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 text-white border border-white/30 shadow-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-green-300">{availableDoctors.length}</div>
              <div className="text-sm sm:text-base font-medium">Doctors Available Now</div>
            </div>
            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 text-white border border-white/30 shadow-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-blue-300">24/7</div>
              <div className="text-sm sm:text-base font-medium">Emergency Services</div>
            </div>
            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 text-white border border-white/30 shadow-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-purple-300">15+</div>
              <div className="text-sm sm:text-base font-medium">Years of Service</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard-Style Doctor Availability */}
      <section id="doctors" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Doctor Availability Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Real-time status of all medical professionals</p>
          </div>

          {/* Status Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                    {availableDoctors.length}
                  </div>
                  <div className="text-green-600 dark:text-green-400 font-medium">Available Now</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                    <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300 mb-2">
                    {soonDoctors.length}
                  </div>
                  <div className="text-yellow-600 dark:text-yellow-400 font-medium">Available Soon</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-3xl font-bold text-red-700 dark:text-red-300 mb-2">
                    {unavailableDoctors.length}
                  </div>
                  <div className="text-red-600 dark:text-red-400 font-medium">Not Available</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Doctor Cards by Status */}
          <div className="space-y-12">
            {/* Available Now */}
            {availableDoctors.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6 flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  Available Now ({availableDoctors.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableDoctors.map((doctor, index) => {
                    const statusInfo = getStatusInfo("available")
                    const StatusIcon = statusInfo.icon

                    return (
                      <motion.div
                        key={`available-${index}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                      >
                        <Card
                          className={`shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${statusInfo.borderColor} ${statusInfo.cardBg}`}
                        >
                          <CardHeader className={`bg-gradient-to-r ${statusInfo.headerGradient} text-white relative`}>
                            <div className="absolute top-3 right-3">
                              <div className={`w-3 h-3 ${statusInfo.dotColor} rounded-full animate-pulse`}></div>
                            </div>
                            <CardTitle className="text-lg pr-8">{doctor.name}</CardTitle>
                            <p className="text-sm opacity-90">{doctor.specialty}</p>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="space-y-3">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} ${statusInfo.bgColor} border ${statusInfo.borderColor}`}
                              >
                                <StatusIcon className="w-4 h-4 mr-2" />
                                {statusInfo.text}
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Schedule:</span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">{doctor.days}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Time:</span>
                                  <span className="font-semibold text-green-600 dark:text-green-400">
                                    {doctor.startTime} - {doctor.endTime}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">{doctor.room}</span>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                <a
                                  href={`tel:${doctor.contact}`}
                                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                  <Phone className="w-4 h-4" />
                                  <span>Call Now</span>
                                </a>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Available Soon */}
            {soonDoctors.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-6 flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                  Available Soon ({soonDoctors.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {soonDoctors.map((doctor, index) => {
                    const statusInfo = getStatusInfo("soon")
                    const StatusIcon = statusInfo.icon

                    return (
                      <motion.div
                        key={`soon-${index}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -2 }}
                      >
                        <Card
                          className={`shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${statusInfo.borderColor} ${statusInfo.cardBg}`}
                        >
                          <CardHeader className={`bg-gradient-to-r ${statusInfo.headerGradient} text-white relative`}>
                            <div className="absolute top-3 right-3">
                              <div className={`w-3 h-3 ${statusInfo.dotColor} rounded-full animate-pulse`}></div>
                            </div>
                            <CardTitle className="text-lg pr-8">{doctor.name}</CardTitle>
                            <p className="text-sm opacity-90">{doctor.specialty}</p>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="space-y-3">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} ${statusInfo.bgColor} border ${statusInfo.borderColor}`}
                              >
                                <StatusIcon className="w-4 h-4 mr-2" />
                                {statusInfo.text}
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Schedule:</span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">{doctor.days}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Time:</span>
                                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                                    {doctor.startTime} - {doctor.endTime}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">{doctor.room}</span>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                <a
                                  href={`tel:${doctor.contact}`}
                                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                  <Phone className="w-4 h-4" />
                                  <span>Contact</span>
                                </a>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Not Available */}
            {unavailableDoctors.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  Not Available ({unavailableDoctors.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {unavailableDoctors.map((doctor, index) => {
                    const statusInfo = getStatusInfo("unavailable")
                    const StatusIcon = statusInfo.icon

                    return (
                      <motion.div
                        key={`unavailable-${index}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card
                          className={`shadow-lg transition-all duration-300 border ${statusInfo.borderColor} ${statusInfo.cardBg} opacity-75`}
                        >
                          <CardHeader className={`bg-gradient-to-r ${statusInfo.headerGradient} text-white relative`}>
                            <div className="absolute top-3 right-3">
                              <div className={`w-3 h-3 ${statusInfo.dotColor} rounded-full`}></div>
                            </div>
                            <CardTitle className="text-lg pr-8">{doctor.name}</CardTitle>
                            <p className="text-sm opacity-90">{doctor.specialty}</p>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="space-y-3">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} ${statusInfo.bgColor} border ${statusInfo.borderColor}`}
                              >
                                <StatusIcon className="w-4 h-4 mr-2" />
                                {statusInfo.text}
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Schedule:</span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">{doctor.days}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Time:</span>
                                  <span className="font-semibold text-gray-600 dark:text-gray-400">
                                    {doctor.startTime} - {doctor.endTime}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">{doctor.room}</span>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                <a
                                  href={`tel:${doctor.contact}`}
                                  className="w-full bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                  <Phone className="w-4 h-4" />
                                  <span>Contact</span>
                                </a>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hospital Services - Compact Markdown Style */}
      <section id="services" className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Medical Services & Treatments
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Comprehensive healthcare services for our community</p>
          </div>

          <Card className="shadow-lg bg-white dark:bg-gray-900 border-0">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">🏥</span>
                    Primary Care
                  </h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🩺</span>
                      <span>General Medicine & Consultation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">👶</span>
                      <span>Pediatric Care & Child Health</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">👩‍⚕️</span>
                      <span>Gynecology & Women&apos;s Health</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🚨</span>
                      <span>24/7 Emergency Services</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">💉</span>
                      <span>Vaccination & Immunization</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">🔬</span>
                    Specialized Services
                  </h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🩻</span>
                      <span>X-Ray & Digital Imaging</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🔬</span>
                      <span>Pathology Lab & Diagnostic Tests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🦷</span>
                      <span>Dental Care & Oral Health</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">⚕️</span>
                      <span>Minor Surgery & Procedures</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">❤️</span>
                      <span>Cardiology & Heart Health</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-300 text-center">
                    <strong>✨ All services available at affordable government rates</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Hospital */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">About Our Hospital</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Serving the community with quality healthcare since decades
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Hospital Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg mr-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Government Category D Hospital
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">Warsak Road, Kochian</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p className="text-lg leading-relaxed">
                      Our hospital is a{" "}
                      <strong className="text-green-600 dark:text-green-400">40-bed healthcare facility</strong>
                      dedicated to providing comprehensive medical services to the residents of Kochian and surrounding
                      rural areas.
                    </p>

                    <p className="leading-relaxed">
                      As a Government Category D Hospital, we serve as the primary healthcare center for our community,
                      offering essential medical services including emergency care, general medicine, pediatrics,
                      gynecology, and specialized treatments.
                    </p>

                    <p className="leading-relaxed">
                      Our facility is equipped with modern medical equipment, a fully functional pathology laboratory,
                      X-ray services, and a dedicated emergency department that operates 24/7 to ensure immediate
                      medical attention when needed.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">40</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Hospital Beds</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Medical Specialists</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Emergency Care</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">15+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Years of Service</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="shadow-lg bg-white dark:bg-gray-800 border-0">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-lg">🎯</span>
                    </div>
                    <span>Our Mission</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    To provide accessible, affordable, and quality healthcare services to the rural community of Kochian
                    and surrounding areas, ensuring that every individual receives the medical attention they deserve
                    regardless of their economic status.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-white dark:bg-gray-800 border-0">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-lg">👁️</span>
                    </div>
                    <span>Our Vision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    To become the leading healthcare provider in the region, known for excellence in patient care,
                    medical innovation, and community health programs that improve the overall well-being of our rural
                    population.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hospital Location */}
      <section id="location" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">Hospital Location</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Find us easily with our interactive map</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Location Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Card className="shadow-xl bg-white dark:bg-gray-900 border-0 h-full">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-6 h-6" />
                    <span>Location Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Address</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Government Category D Hospital
                        <br />
                        Warsak Road, Kochian
                        <br />
                        Peshawar, Khyber Pakhtunkhwa
                        <br />
                        Pakistan
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Directions</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Located on Warsak Road, easily accessible by public transport and private vehicles. The hospital
                        is a prominent landmark in the Kochian area.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Nearby Landmarks</h4>
                      <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                        <li>• Kochian Bus Stop - 2 minutes walk</li>
                        <li>• Local Market - 5 minutes walk</li>
                        <li>• Government School - 3 minutes walk</li>
                        <li>• Main Warsak Road - Direct access</li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href="https://www.google.com/maps/place/Government+Hospital+Gara+Tajik,+Kochian/@34.1311868,71.457242,17z/data=!3m1!4b1!4m6!3m5!1s0x38d9131127a15d73:0x705c72f51f95b4f1!8m2!3d34.1311824!4d71.4598169!16s%2Fg%2F11hz1npf1b?entry=ttu&g_ep=EgoyMDI1MDcyOC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Open in Google Maps</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="shadow-xl bg-white dark:bg-gray-900 border-0 h-full">
                <CardContent className="p-0">
                  <div className="relative w-full h-96 lg:h-full min-h-[400px] rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.8!2d71.4598169!3d34.1311824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d9131127a15d73%3A0x705c72f51f95b4f1!2sGovernment%20Hospital%20Gara%20Tajik%2C%20Kochian!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Government Category D Hospital Location"
                      className="rounded-lg"
                    ></iframe>

                    {/* Map Overlay for better mobile experience */}
                    <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-800 dark:text-white">Hospital Location</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lab Services */}
      <section id="lab" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Laboratory Services
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lab Timings */}
            <Card className="shadow-xl bg-white dark:bg-gray-900 border-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Clock className="w-6 h-6" />
                  <span>Lab Timings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Morning Shift</h4>
                    <p className="text-xl font-medium text-gray-800 dark:text-gray-200">8:00 AM - 2:00 PM</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monday to Saturday</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">Evening Shift</h4>
                    <p className="text-xl font-medium text-gray-800 dark:text-gray-200">4:00 PM - 8:00 PM</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monday to Friday</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Prices */}
            <Card className="shadow-xl bg-white dark:bg-gray-900 border-0">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <TestTube className="w-6 h-6" />
                  <span>Tests & Prices</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[
                    { test: "Complete Blood Count (CBC)", price: "Rs. 300", popular: true },
                    { test: "Blood Sugar Test", price: "Rs. 150", popular: true },
                    { test: "Urine Complete Test", price: "Rs. 100", popular: false },
                    { test: "Liver Function Test", price: "Rs. 500", popular: false },
                    { test: "Pregnancy Test", price: "Rs. 200", popular: true },
                    { test: "COVID-19 Rapid Test", price: "Rs. 600", popular: false },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex justify-between items-center p-3 rounded-lg transition-all hover:shadow-md ${
                        item.popular
                          ? "bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
                          : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.test}</span>
                        {item.popular && (
                          <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-purple-600 dark:text-purple-400 text-base">{item.price}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Note:</strong> Fasting required for blood sugar and liver function tests (8-12 hours)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Protected Polio Campaign */}
      <section id="polio" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Polio Immunization Program
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Protected Campaign Info */}
            <Card className="shadow-xl bg-white dark:bg-gray-900 border-0">
              <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Shield className="w-6 h-6" />
                  <span>Campaign Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-800 dark:text-red-300 mb-3">Regular Campaigns:</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-red-100 dark:border-red-900">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                              Monthly Campaigns
                            </span>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Door-to-door vaccination</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">
                            Ongoing
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-red-100 dark:border-red-900">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                              Hospital Visits
                            </span>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Available daily</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                            Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      <strong>Important:</strong> All children under 5 years should receive polio vaccination. Contact
                      hospital for schedule details.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>For Campaign Dates:</strong> Please contact the hospital directly at 091-123-4567 for
                      current campaign schedules and locations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vaccination Schedule */}
            <Card className="shadow-xl bg-white dark:bg-gray-900 border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardTitle className="text-xl">Routine Immunization Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[
                    {
                      age: "At Birth",
                      vaccines: "BCG, Hepatitis B, Polio",
                      color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                    },
                    {
                      age: "6 Weeks",
                      vaccines: "DPT, Polio, Hepatitis B",
                      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                    },
                    {
                      age: "10 Weeks",
                      vaccines: "DPT, Polio",
                      color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                    },
                    {
                      age: "14 Weeks",
                      vaccines: "DPT, Polio, Hepatitis B",
                      color: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
                    },
                    {
                      age: "9 Months",
                      vaccines: "Measles",
                      color: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`p-4 rounded-lg border ${item.color}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{item.age}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.vaccines}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Remember:</strong> Bring your child&apos;s immunization card for all visits.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-gray-800 dark:bg-gray-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Contact Information</h3>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-gray-300">Warsak Road, Kochian, Peshawar</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Emergency Helpline</p>
                    <a href="tel:091-123-4567" className="text-sm text-gray-300 hover:text-white transition-colors">
                      091-123-4567
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium">General Inquiries</p>
                    <a href="tel:0300-123-4567" className="text-sm text-gray-300 hover:text-white transition-colors">
                      0300-123-4567
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Our Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                {[
                  "24/7 Emergency Services",
                  "General Medicine",
                  "Pediatric Care",
                  "Gynecology Services",
                  "Laboratory Tests",
                  "Immunization Programs",
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="hover:text-white transition-colors cursor-default"
                  >
                    • {service}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2024 Government Category D Hospital, Warsak Road Kochian. Serving our community with quality healthcare.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
