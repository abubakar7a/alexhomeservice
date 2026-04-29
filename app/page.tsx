"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // <-- Added Next.js Link
import { Phone, Clock, MapPin, Star, ChevronDown, CheckCircle2, ArrowLeft, ArrowRight, Mail } from "lucide-react"; // <-- Added Mail icon

const PHONE_NUMBER = "(951)-981-9160";

const problems = [
  {
    title: "Garage Door Opener Not Working",
    problem: "Motor runs but door won't move? Complete silence when pressing the remote?",
    solution: "Usually it's a stripped gear, burnt motor, or power supply issue. Our techs carry the most common opener parts and can get you running in one visit. We work on all major brands - LiftMaster, Chamberlain, Genie, and more.",
  },
  {
    title: "Garage Door Stuck Halfway",
    problem: "Door stops mid-way up or down and won't complete the cycle?",
    solution: "This screams broken springs or cable issues. Never try to force it - you could make it worse or get hurt. Our guys will safely diagnose if it's spring tension, cable slippage, or track alignment causing the jam.",
  },
  {
    title: "Garage Door Closes Then Opens Again",
    problem: "Door hits the ground and immediately reverses back up?",
    solution: "Your safety system is working, but something's triggering it unnecessarily. Could be sensor misalignment, dirty photo eyes, or incorrect force settings. Quick adjustment usually fixes this annoying problem.",
  },
  {
    title: "Garage Door Off Track",
    problem: "Door is crooked, making grinding noises, or completely derailed?",
    solution: "Stop using it immediately! An off-track door can cause serious damage or injury. Usually caused by worn rollers, bent tracks, or broken cables. Our team will realign everything and replace any damaged hardware.",
  },
  {
    title: "Garage Door Sensor Issue",
    problem: "Door won't close, or you have to hold the button down to make it work?",
    solution: "Your photo-eye sensors are either dirty, misaligned, or one has failed. Sometimes it's just spider webs or dirt blocking the beam. Other times the sensors need replacement or rewiring.",
  },
  {
    title: "Garage Door Making Noise",
    problem: "Grinding, squeaking, banging, or rattling when operating?",
    solution: "Noisy doors usually mean worn rollers, loose hardware, or dry hinges. Sometimes it's chain slack on opener systems. A good tune-up with proper lubrication often solves this, but worn parts may need replacement.",
  },
  {
    title: "Garage Door Remote Not Working",
    problem: "Remote works sometimes, or not at all? Multiple remotes acting up?",
    solution: "Could be dead batteries (try that first!), remote programming issues, or receiver problems in the opener. Our techs can reprogram existing remotes or set up new ones on the spot.",
  },
  {
    title: "Garage Door Keypad Not Working",
    problem: "Keypad lights up but door won't respond, or no response at all?",
    solution: "Usually it's a programming issue or the keypad has lost its connection to the opener. Sometimes battery replacement or keypad cleaning does the trick. We can reprogram or replace if needed.",
  },
  {
    title: "Garage Door Won't Open",
    problem: "Complete dead door - no response to remote, wall button, or keypad?",
    solution: "Could be power issues, blown fuses, broken springs, or opener motor failure. We start with the basics and work up to major component replacement. Most no-power issues are fixable same-day.",
  }
];

const testimonials = [
  { name: "John Smith", initials: "JS", location: "Miami, FL", text: "Incredible service! My garage door was stuck and they had it fixed in under an hour. The technician was professional and explained everything clearly. Highly recommend!" },
  { name: "Maria Lopez", initials: "ML", location: "Chicago, IL", text: "Emergency service at 2 AM! My garage door wouldn't close and they were here within 30 minutes. Fixed the issue and even cleaned up after themselves. Outstanding!" },
  { name: "Robert Taylor", initials: "RT", location: "Dallas, TX", text: "Alex Handyman replaced my old garage door opener with a new smart system. The installation was clean and professional. Now I can control my garage from my phone!" },
  { name: "Emily Chen", initials: "EC", location: "Boston, MA", text: "Very friendly and honest. Alex explained all my options and didn't try to upsell me. My door works perfectly now." },
  { name: "David Patel", initials: "DP", location: "Phoenix, AZ", text: "Quick, efficient, and affordable. I called in the morning and my garage door was fixed before lunch. Will use again." },
  { name: "Sarah Johnson", initials: "SJ", location: "Seattle, WA", text: "Alex Handyman is the real deal. He fixed a problem two other companies couldn't. Super grateful!" }
];

const serviceAreas = {
  Northeast: ["New Jersey (Statewide)", "Long Island & Albany, NY", "Boston, MA", "Philadelphia, PA"],
  South: ["Atlanta, GA", "Nashville, TN", "Miami / Tampa / Orlando / Jacksonville, FL", "Charlotte, NC"]
};

export default function Home() {
  const [openProblemIndex, setOpenProblemIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleProblem = (index: number) => {
    setOpenProblemIndex(openProblemIndex === index ? null : index);
  };

  const handleCall = () => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:${PHONE_NUMBER}`;
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white"></div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="bg-black text-white py-3 px-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-3 sm:mb-0">
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-blue-400">ALEX</span>
                <span className="text-white ml-1">HANDYMAN</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-300">Professional Garage Door Repair</p>
            </div>
          </div>
          <button 
            onClick={handleCall}
            className="bg-blue-400 text-black hover:bg-blue-300 transition-colors font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-md text-lg sm:text-xl w-full sm:w-auto flex items-center justify-center"
          >
            <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
            {PHONE_NUMBER}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-10 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 px-2">
            Need a <span className="text-blue-400">Garage Door Guy</span> Near You?
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-300 px-2">
            We Fix What's Broken. Fast Response. Real Solutions.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8 sm:mb-12">
            <div className="flex items-center space-x-2 text-blue-400">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-base sm:text-lg font-semibold">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-base sm:text-lg font-semibold">30+ Metro Areas</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
              <span className="text-base sm:text-lg font-semibold">4.8/5 Rating</span>
            </div>
          </div>
          
          {/* UPDATED: Now a Link instead of a button */}
          <Link 
            href="/contact"
            className="bg-blue-400 text-black hover:bg-blue-300 transition-colors rounded-md font-bold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-xl w-full sm:w-auto inline-flex items-center justify-center"
          >
            <Mail className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
            Talk to a Garage Door Expert Now
          </Link>
        </div>
      </section>

      {/* COMMON PROBLEMS ACCORDION */}
      <section className="py-10 sm:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-black mb-2 sm:mb-4">
              Common Garage Door Problems We Fix
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Click on your problem below to see how we solve it
            </p>
          </div>
          
          <div className="grid gap-4">
            {problems.map((item, index) => {
              const isOpen = openProblemIndex === index;
              return (
                <div key={index} className="border-2 rounded-lg border-gray-900 hover:border-blue-400 transition-all duration-300 shadow-sm overflow-hidden bg-white">
                  <button 
                    onClick={() => toggleProblem(index)}
                    className="w-full p-3 sm:p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold bg-gray-900 text-white shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-700">{item.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{item.problem}</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 sm:h-6 sm:w-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t bg-blue-50">
                      <div className="pt-3">
                        <h4 className="font-bold text-black mb-2 text-sm sm:text-base">How We Fix It:</h4>
                        <p className="text-sm text-gray-700">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER GALLERY */}
      <section className="py-10 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-black mb-3">Before & After Gallery</h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              We fix garage doors fast with real results you can trust.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { src: "/image1.jpg", label: "Opener Repair Maryland", alt: "Garage door opener repair service in Maryland" },
              { src: "/image2.jpg", label: "Opener Repair San Diego", alt: "Garage door opener repair service in San Diego" },
              { src: "/image3.jpg", label: "Garage Door Off Track", alt: "Visual of a garage door being replaced" }
            ].map((img, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="relative w-full mb-3 aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-sm font-medium">Image {i + 1} Placeholder</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs sm:text-sm px-3 py-1 rounded shadow-lg font-semibold tracking-wide select-none pointer-events-none z-10">
                    Before / After
                  </div>
                </div>
                <span className="font-semibold text-gray-800 text-center">{img.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-10 sm:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-black mb-8 sm:mb-12">
            Why Homeowners Choose Alex Handyman
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100 hover:border-blue-400 transition-all hover:shadow-lg">
              <div className="bg-blue-400 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Clock className="h-7 w-7 sm:h-8 sm:w-8 text-black" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Same-Day Service</h3>
              <p className="text-sm sm:text-base text-gray-600">Most repairs completed in one visit. We stock common parts on every truck.</p>
            </div>
            
            <div className="text-center bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100 hover:border-blue-400 transition-all hover:shadow-lg">
              <div className="bg-blue-400 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-black" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Licensed & Insured</h3>
              <p className="text-sm sm:text-base text-gray-600">Fully certified technicians with comprehensive insurance coverage for your peace of mind.</p>
            </div>
            
            <div className="text-center bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100 hover:border-blue-400 transition-all hover:shadow-lg sm:col-span-2 md:col-span-1">
              <div className="bg-blue-400 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Star className="h-7 w-7 sm:h-8 sm:w-8 text-black fill-current" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Honest Pricing</h3>
              <p className="text-sm sm:text-base text-gray-600">No surprises, no upselling. You'll know exactly what you're paying before we start.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-10 sm:py-16 px-4 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Don't Let a Broken Garage Door Ruin Your Day</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 text-gray-300">Call us directly for professional and reliable garage door service every time.</p>
          <button 
            onClick={handleCall}
            className="bg-blue-400 text-black hover:bg-blue-300 transition-colors rounded-md font-bold px-8 py-4 sm:px-12 sm:py-6 text-xl sm:text-2xl animate-pulse w-full sm:w-auto inline-flex items-center justify-center"
          >
            <Phone className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8 fill-current" />
            Call {PHONE_NUMBER} Now
          </button>
          <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">Available 24/7 for Emergency Repairs</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-black mb-2 sm:mb-4">What Our Customers Say</h2>
            <p className="text-lg sm:text-xl text-gray-600">Real experiences from homeowners we've helped</p>
          </div>
          
          <div className="relative group">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar scroll-smooth"
            >
              {testimonials.map((review, i) => (
                <div key={i} className="snap-start shrink-0 w-full sm:w-1/2 lg:w-1/3 flex">
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 p-6 flex flex-col h-full w-full">
                    <div className="flex items-center mb-4 text-blue-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic grow">"{review.text}"</p>
                    <div className="flex items-center mt-auto">
                      <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-black font-bold shrink-0">
                        {review.initials}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-black">{review.name}</p>
                        <p className="text-sm text-gray-600">{review.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-blue-400 text-black shadow-md rounded-full border border-gray-200 transition-colors z-10 h-10 w-10 flex items-center justify-center opacity-0 md:group-hover:opacity-100"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-blue-400 text-black shadow-md rounded-full border border-gray-200 transition-colors z-10 h-10 w-10 flex items-center justify-center opacity-0 md:group-hover:opacity-100"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-lg sm:text-xl text-gray-700 font-bold">Join thousands of satisfied customers who trust us with their garage door repairs</p>
            <p className="text-base sm:text-lg text-gray-800 mt-2">4.9/5 average rating from over 10,000+ completed service calls</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mb-8 sm:mb-10">
            {/* Brand / Contact */}
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

            {/* Services */}
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

            
          </div>

          <hr className="border-gray-800 my-6" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4">
            <p className="text-sm text-gray-500 mb-4 sm:mb-0">
              © {new Date().getFullYear()} Alex Handyman. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/contact" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
                Contact Us
              </Link>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button 
          onClick={handleCall}
          className="bg-blue-400 text-black hover:bg-blue-300 transition-colors font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-full shadow-lg animate-pulse flex items-center"
        >
          <Phone className="mr-1 h-5 w-5 sm:h-6 sm:w-6 fill-current" />
          Call Now
        </button>
      </div>

    </div>
  );
}