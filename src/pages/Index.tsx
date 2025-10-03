import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hero from "@/assets/park-hero.jpg";
import { motion } from "framer-motion";
import { Activity, Leaf, ShieldCheck, Search as SearchIcon, CalendarCheck2, Car, Sparkles, Zap, TrendingUp, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>ParkNet | Smart Parking - Smarter Cities</title>
        <meta name="description" content="Real-time smart parking solution for sustainable cities. Find, reserve, and manage parking with live status updates." />
        <link rel="canonical" href="/" />
      </Helmet>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
        </div>

        <div className="container flex min-h-[80vh] flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.span 
              className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Sparkles className="h-4 w-4" />
              Park smarter. Drive happier.
            </motion.span>
            
            <motion.h1 
              className="mt-6 font-display text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Smart Parking
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Smarter Cities
              </span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Experience the future of urban mobility with real-time parking solutions that make cities more sustainable and efficient.
            </motion.p>

            <motion.div 
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button asChild size="lg" className="hover-scale bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="hover-scale bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-2 border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                <Link to="/login">Login</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 w-full max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.div 
              className="rounded-2xl border bg-background/80 backdrop-blur-sm p-6 text-left hover:scale-105 transition-all duration-300 animate-float shadow-lg hover:shadow-xl"
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/20 animate-glow">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-sm text-muted-foreground">Live Status</div>
              </div>
              <div className="text-2xl font-bold">Real-time updates</div>
              <p className="mt-2 text-sm text-muted-foreground">Instant parking availability and status updates</p>
            </motion.div>
            
            <motion.div 
              className="rounded-2xl border bg-background/80 backdrop-blur-sm p-6 text-left hover:scale-105 transition-all duration-300 animate-float shadow-lg hover:shadow-xl"
              style={{ animationDelay: '1s' }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500/20 animate-glow">
                  <Leaf className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-sm text-muted-foreground">Sustainable</div>
              </div>
              <div className="text-2xl font-bold">Reduced traffic</div>
              <p className="mt-2 text-sm text-muted-foreground">Efficient parking reduces congestion and emissions</p>
            </motion.div>
            
            <motion.div 
              className="rounded-2xl border bg-background/80 backdrop-blur-sm p-6 text-left hover:scale-105 transition-all duration-300 animate-float shadow-lg hover:shadow-xl"
              style={{ animationDelay: '2s' }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20 animate-glow">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-sm text-muted-foreground">Secure</div>
              </div>
              <div className="text-2xl font-bold">Reliable bookings</div>
              <p className="mt-2 text-sm text-muted-foreground">Secure and guaranteed parking reservations</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with ParkNet in just three simple steps
            </p>
          </motion.div>
          
          <div className="grid gap-8 sm:grid-cols-3">
            <motion.article
              className="group relative rounded-2xl border bg-card p-8 text-center hover:shadow-lg transition-all duration-300 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                1
              </div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                <SearchIcon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-xl font-bold mb-3">Find</div>
              <p className="text-muted-foreground">Search nearby parking centers with live availability and real-time status updates.</p>
            </motion.article>

            <motion.article
              className="group relative rounded-2xl border bg-card p-8 text-center hover:shadow-lg transition-all duration-300 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                2
              </div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                <CalendarCheck2 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-xl font-bold mb-3">Reserve</div>
              <p className="text-muted-foreground">Pick your preferred slot and confirm your reservation instantly with secure payment.</p>
            </motion.article>

            <motion.article
              className="group relative rounded-2xl border bg-card p-8 text-center hover:shadow-lg transition-all duration-300 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                3
              </div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <div className="text-xl font-bold mb-3">Park</div>
              <p className="text-muted-foreground">Navigate to your reserved spot and enjoy a seamless parking experience.</p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ParkNet</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Revolutionizing urban mobility with smart parking solutions. Making cities more sustainable and efficient, one parking spot at a time.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    Home
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="http://localhost:8080/dashboard" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    Parking Slots
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="http://localhost:8080/my-reservations" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    Reservation
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="http://localhost:8080/contact" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    Contact
                  </motion.a>
                </li>
              </ul>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">About</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our smart parking system uses advanced technology to provide real-time parking availability, reduce traffic congestion, and create more sustainable urban environments.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Info</h4>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center gap-3 text-gray-300 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>info@parknet.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-300 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+94 70 227 5338</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-300 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>No. 25, Smart Street, Colombo 01</span>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div 
            className="mt-12 pt-8 border-t border-gray-800 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-400 text-sm">
              © 2024 ParkNet. All rights reserved. | Smart Parking for Smarter Cities
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
