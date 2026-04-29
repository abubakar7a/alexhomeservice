"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MapPin, Mail, Send, CheckCircle2, Clock, Star, ArrowRight } from "lucide-react";

const PHONE_NUMBER = "(951)-981-9160";

const serviceAreas = {
  Northeast: ["New Jersey (Statewide)", "Long Island & Albany, NY", "Boston, MA", "Philadelphia, PA"],
  South: ["Atlanta, GA", "Nashville, TN", "Miami / Tampa / Orlando / Jacksonville, FL", "Charlotte, NC"]
};

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Validation Error State
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCall = () => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:${PHONE_NUMBER}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", phone: "", message: "" };

    if (formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Basic phone validation: allows numbers, spaces, dashes, parentheses, and + (7-15 digits)
    const phoneRegex = /^[\d\s\-\+\(\)]{7,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
      isValid = false;
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // REPLACE THIS WITH YOUR WEB3FORMS ACCESS KEY
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: "New Garage Door Service Request", // Optional: Custom email subject
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      } else {
        alert(result.message || "Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      alert("Oops! Something went wrong. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50"></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-black text-white py-3 px-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 mb-3 sm:mb-0 hover:opacity-80 transition-opacity">
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-blue-400">ALEX</span>
                <span className="text-white ml-1">HANDYMAN</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-300">Professional Garage Door Repair</p>
            </div>
          </Link>
          <button 
            onClick={handleCall}
            className="bg-blue-400 text-black hover:bg-blue-300 transition-colors font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-md text-lg sm:text-xl w-full sm:w-auto flex items-center justify-center"
          >
            <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
            {PHONE_NUMBER}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="grow max-w-5xl mx-auto w-full px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2">Get in Touch</h2>
          <p className="text-gray-600 text-lg">Fill out the form below or call us directly for immediate emergency service.</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          
          {/* LEFT SIDE: Contact Info */}
          <div className="bg-black text-white p-8 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-full shrink-0">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300 mb-1">Call Us 24/7</p>
                    <button onClick={handleCall} className="text-white text-lg hover:text-blue-400 transition-colors font-bold">
                      {PHONE_NUMBER}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-full shrink-0">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300 mb-1">Email Us</p>
                    <p className="text-white">service@alexhandyman.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-full shrink-0">
                    <MapPin className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300 mb-1">Service Area</p>
                    <p className="text-white leading-relaxed">Fast dispatch across major Northeast & Southern US Metro Areas</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>

          {/* RIGHT SIDE: Form */}
          <div className="p-8 md:w-3/5 bg-white">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 animate-in fade-in duration-500">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent Successfully!</h3>
                <p className="text-gray-600 max-w-sm">Thank you for reaching out. One of our garage door experts will contact you shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-blue-600 hover:text-blue-800 font-bold underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-md outline-none transition-all text-gray-900 focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-400 focus:border-transparent'}`} 
                    placeholder="John Doe" 
                  />
                  {errors.name && <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-md outline-none transition-all text-gray-900 focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-400 focus:border-transparent'}`} 
                    placeholder="john@example.com" 
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-md outline-none transition-all text-gray-900 focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-400 focus:border-transparent'}`} 
                    placeholder="(555) 123-4567" 
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-semibold mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-gray-700">How can we help? <span className="text-red-500">*</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-md outline-none transition-all resize-none text-gray-900 focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-400 focus:border-transparent'}`} 
                    placeholder="Describe your garage door issue..."
                  />
                  {errors.message && <p className="text-red-500 text-xs font-semibold mt-1">{errors.message}</p>}
                </div>

                {/* Web3Forms Honeypot for spam prevention */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-blue-400 text-black font-bold hover:bg-blue-500 transition-colors py-4 px-4 rounded-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-md mt-4"
                >
                  {isLoading ? "Sending..." : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-8 sm:py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 sm:mb-10">
            <div className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  <span className="text-blue-400">ALEX</span>
                  <span className="text-white ml-1">HANDYMAN</span>
                </h2>
                <p className="text-sm text-gray-400 mt-1">Professional Garage Door Repair</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="h-5 w-5 text-blue-400 fill-current" />
                  <button onClick={handleCall} className="text-lg hover:text-blue-400 transition-colors">
                    {PHONE_NUMBER}
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="text-lg">24/7 Emergency Service</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-lg">Serving Major US Locations</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold text-blue-400">Our Services</h4>
              <ul className="space-y-3">
                {[
                  "Broken Spring Repair",
                  "Opener Repair & Installation",
                  "Door Off Track Repair",
                  "Broken Cable Repair",
                  "New Garage Door Installation"
                ].map((service, i) => (
                  <li key={i}>
                    <button className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                      <ArrowRight className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold text-blue-400">Service Areas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Northeast</h5>
                  <ul className="space-y-2">
                    {serviceAreas.Northeast.map((area, i) => (
                      <li key={i}>
                        <span className="text-sm text-gray-400">{area.split('/')[0].trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">South</h5>
                  <ul className="space-y-2">
                    {serviceAreas.South.map((area, i) => (
                      <li key={i}>
                        <span className="text-sm text-gray-400">{area.split('/')[0].trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-800 my-6" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4">
            <p className="text-sm text-gray-500 mb-4 sm:mb-0">
              © {new Date().getFullYear()} Alex Handyman. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}