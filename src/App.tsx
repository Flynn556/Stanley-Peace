/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import hero2 from './assets/hero2.png';
import rhino from './assets/rhino.png';
import { 
  Bird, 
  Leaf, 
  BookOpen, 
  HandHeart as Peace, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Send, 
  Disc, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#story' },
    { name: 'Values', href: '#values' },
    { name: 'Token', href: '#token' },
    { name: 'Join', href: '#join' },
    { name: 'Community', href: '#community' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-soft-cream/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-olive-green rounded-full overflow-hidden flex items-center justify-center text-soft-cream shadow-sm">
            <img 
              src={hero2}
              alt="Stanley Icon" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight text-earth-brown">Stanley Peace</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-earth-brown/80 hover:text-olive-green font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-olive-green text-soft-cream px-6 py-2 rounded-full font-semibold hover:bg-olive-green/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Get $STANLEY
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-earth-brown" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-soft-cream border-t border-earth-brown/10 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-earth-brown"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-olive-green text-soft-cream px-6 py-3 rounded-full font-semibold w-full">
              Get $STANLEY
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Sparkle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    className="absolute pointer-events-none"
    style={style}
  >
    <Sparkles size={12 + Math.random() * 8} className="text-sunset-gold" />
  </motion.div>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-serif text-4xl md:text-5xl font-bold text-earth-brown mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-earth-brown/60 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen selection:bg-olive-green/20 selection:text-olive-green">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-blue/30 via-sunset-gold/20 to-soft-cream z-0" />
        
        {/* Animated Birds */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -100, y: 100 + i * 50 }}
              animate={{ x: '110vw', y: 50 + i * 40 }}
              transition={{ 
                duration: 25 + i * 5, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 2
              }}
              className="absolute opacity-20"
            >
              <Bird size={24} />
            </motion.div>
          ))}
        </div>

        {/* Water Shimmer at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-soft-cream via-soft-cream/80 to-transparent z-10 overflow-hidden" />

        {/* Sparkles */}
        {[...Array(15)].map((_, i) => (
          <Sparkle 
            key={i} 
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              zIndex: 15
            }} 
          />
        ))}

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8 relative inline-block"
          >
            {/* Stanley Visual Placeholder (Rhino with Olive Branch) */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 bg-sunset-gold/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tr from-olive-green/20 to-transparent rounded-full" />
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                {/* Stanley Icon Image */}
                <div className="w-56 h-56 md:w-72 md:h-72 bg-white rounded-full border-8 border-olive-green/20 flex items-center justify-center overflow-hidden shadow-2xl">
                  <img 
                    src={hero2}
                    alt="Stanley Peace" 
                    className="w-full h-full object-cover scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Olive Branch Overlay */}
                <motion.div 
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-2 top-1/4 text-olive-green drop-shadow-lg"
                >
                  <Leaf size={56} fill="currentColor" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-6xl md:text-8xl font-bold text-earth-brown mb-6 tracking-tight"
          >
            Stanley Peace
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-earth-brown/70 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A Symbol of Hope on the Blockchain. In a world of noise and volatility, Stanley represents calm strength, unity, and community-driven purpose.
          </motion.p>

        </div>
      </section>

      {/* --- SECTION 2: THE STORY --- */}
      <section id="story" className="py-24 bg-soft-cream relative">
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-sage/30 rounded-3xl overflow-hidden relative">
                <img 
                  src={hero2}
                  alt="Stanley's World" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 border-2 border-soft-cream/50 rounded-2xl" />
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-sunset-gold/20 rounded-full blur-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-brown mb-8">The Story of Stanley</h2>
              <div className="space-y-6 text-lg text-earth-brown/80 leading-relaxed">
                <p>
                  Stanley was born as a symbol — not of dominance, but of resilience. 
                </p>
                <p>
                  In a fast-moving digital world where trends rise and fall overnight, Stanley Peace stands for something enduring. Patience. Unity. Shared growth.
                </p>
                <p>
                  Built on the Solana blockchain, Stanley Peace is a community-driven token inspired by the idea that strength does not need to be loud.
                </p>
                <p className="font-serif italic text-2xl text-olive-green mt-8">
                  "Sometimes, strength is simply staying grounded."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: OUR VALUES --- */}
      <section id="values" className="py-24 bg-sage/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="What We Stand For">Our Core Values</SectionTitle>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Peace size={40} />, title: "Peace", desc: "A reminder that Web3 can be collaborative, not chaotic." },
              { icon: <Leaf size={40} />, title: "Growth", desc: "Building steadily with intention and community support." },
              { icon: <Users size={40} />, title: "Unity", desc: "A decentralized movement shaped by its holders." },
              { icon: <ShieldCheck size={40} />, title: "Resilience", desc: "Endurance in the face of volatility." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-soft-cream p-8 rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-2 text-center"
              >
                <div className="w-20 h-20 bg-sage/30 rounded-2xl flex items-center justify-center text-olive-green mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold text-earth-brown mb-4">{value.title}</h3>
                <p className="text-earth-brown/70">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: THE MOVEMENT --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sunset-gold/10 to-sky-blue/10 z-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <SectionTitle>More Than a Token</SectionTitle>
          <div className="max-w-3xl mx-auto bg-soft-cream/40 backdrop-blur-sm p-12 rounded-[3rem] border border-white/20">
            <p className="text-xl md:text-2xl text-earth-brown/80 mb-8 leading-relaxed">
              Stanley Peace is not just a digital asset. It is a rare rhino born to emerge as a symbol of hope for world peace amidst war.
            </p>
            <div className="grid grid-cols-2 gap-6 text-left">
              {[
                "Long-term presence",
                "Transparency",
                "Collective creativity",
                "Shared responsibility"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-olive-green rounded-full" />
                  <span className="font-medium text-earth-brown/90">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-12 text-lg font-serif italic text-olive-green">
              We are building slowly, intentionally, and together.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: TOKEN DETAILS --- */}
      <section id="token" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="The foundation of our ecosystem">Token Overview</SectionTitle>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                { label: "Blockchain", value: "Solana" },
                { label: "Token Name", value: "Stanley Peace" },
                { label: "Symbol", value: "$STANLEY" },
                { label: "Total Supply", value: "1,000,000,000" },
                { label: "Contract Address", value: "Coming Soon..." },
              ].map((detail, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between items-center border-b border-earth-brown/10 pb-4"
                >
                  <span className="text-earth-brown/60 font-medium uppercase tracking-wider text-sm">{detail.label}</span>
                  <span className="text-earth-brown font-bold text-lg">{detail.value}</span>
                </motion.div>
              ))}
              <p className="text-sm text-earth-brown/40 italic">
                * Please verify the contract address on official channels before any transaction.
              </p>
            </div>

            <div className="flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-80 h-80"
              >
                {/* Elegant Circular Infographic */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F9F4E8" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#7A9E7E" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="50" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F4C46A" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="180" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-serif text-4xl font-bold text-earth-brown">$STANLEY</span>
                  <span className="text-earth-brown/60 text-sm">Ecosystem</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: HOW TO JOIN --- */}
      <section id="join" className="py-24 bg-earth-brown/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-brown mb-12">How to Join the Movement</h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Download Phantom Wallet", desc: "Install the Phantom extension or mobile app to manage your Solana assets." },
                  { step: "02", title: "Fund with SOL", desc: "Purchase SOL from an exchange and send it to your Phantom wallet address." },
                  { step: "03", title: "Swap for $STANLEY", desc: "Visit a Solana DEX like Jupiter or Raydium and swap your SOL for $STANLEY." },
                  { step: "04", title: "Join our community", desc: "Follow us on social media and join our Telegram to stay connected." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-olive-green text-soft-cream rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-earth-brown mb-2">{step.title}</h3>
                      <p className="text-earth-brown/70">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-soft-cream p-12 rounded-[3rem] shadow-xl border border-earth-brown/5">
                <div className="w-full aspect-square bg-sage/20 rounded-2xl overflow-hidden flex items-center justify-center mb-8 shadow-inner">
                  <motion.img
                    src={rhino}
                    alt="Stanley Walking"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-center font-serif italic text-xl text-earth-brown/80">
                  Stanley is walking forward peacefully. Will you walk with him?
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 7: COMMUNITY --- */}
      <section id="community" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-blue/20 to-soft-cream z-0" />
        
        {/* Floating Clouds */}
        <motion.div 
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 opacity-30 pointer-events-none"
        >
          <div className="w-48 h-16 bg-white rounded-full blur-xl" />
        </motion.div>
        <motion.div 
          animate={{ x: [100, -100, 100] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 right-10 opacity-20 pointer-events-none"
        >
          <div className="w-64 h-20 bg-white rounded-full blur-2xl" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <SectionTitle subtitle="Stanley Peace grows through its community">Walk With Us</SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
            {[
              { 
                icon: (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ), 
                label: "X", 
                color: "bg-black",
                href: "https://x.com/StanleyPeace_"
              },
              { icon: <Send />, label: "Telegram", color: "bg-[#0088cc]", href: "https://t.co/VslVcPkFnd" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${social.color} text-white p-8 rounded-3xl flex flex-col items-center gap-4 shadow-lg hover:shadow-xl transition-all`}
              >
                {social.icon}
                <span className="font-bold text-xl">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 8: TRANSPARENCY --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-olive-green/10 rounded-full flex items-center justify-center text-olive-green mx-auto mb-8">
            <ShieldCheck size={40} />
          </div>
          <h2 className="font-serif text-4xl font-bold text-earth-brown mb-8">Built With Transparency</h2>
          <div className="space-y-6 text-lg text-earth-brown/70 leading-relaxed">
            <p>
              Stanley Peace operates through a publicly verifiable smart contract on Solana. All transactions are viewable on-chain, ensuring total accountability to our community.
            </p>
            <p>
              We encourage every participant to research, understand, and engage responsibly. Our code is our word.
            </p>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-sunset-gold/40 via-sky-blue/10 to-soft-cream z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="w-48 h-48 bg-white rounded-full mx-auto flex items-center justify-center border-4 border-olive-green/20 backdrop-blur-sm overflow-hidden shadow-2xl">
              <img 
                src={hero2}
                alt="Stanley Peace Final" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <h2 className="font-serif text-5xl md:text-7xl font-bold text-earth-brown mb-6">Hope Is Stronger When Shared</h2>
          <p className="text-xl md:text-2xl text-earth-brown/70 max-w-2xl mx-auto mb-12">
            Join a community that believes strength can be gentle.
          </p>
          
          <a 
            href="#community"
            className="bg-olive-green text-soft-cream px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-olive-green/20 transition-all hover:-translate-y-1 flex items-center gap-3 mx-auto w-fit"
          >
            <Leaf size={24} />
            Become Part of the Story
          </a>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-soft-cream/50 py-16 relative overflow-hidden border-t border-earth-brown/5">
        <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
          <Peace size={400} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-olive-green rounded-full overflow-hidden flex items-center justify-center text-soft-cream shadow-sm">
                  <img 
                    src={hero2}
                    alt="Stanley Footer" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-serif text-xl font-bold text-earth-brown">Stanley Peace</span>
              </div>
              <p className="text-earth-brown/60 max-w-sm leading-relaxed">
                A community-driven movement on Solana, inspired by the enduring strength of peace and unity.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-earth-brown mb-6">Explore</h4>
              <ul className="space-y-4 text-earth-brown/60">
                <li><a href="#" className="hover:text-olive-green transition-colors">About</a></li>
                <li><a href="#" className="hover:text-olive-green transition-colors">Token Overview</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-earth-brown/10 flex flex-col md:flex-row justify-between items-center gap-4 text-earth-brown/40 text-sm">
            <p>© 2026 Stanley Peace. All rights reserved.</p>
            <div className="flex gap-6 items-center">
              <a href="https://x.com/StanleyPeace_" target="_blank" rel="noopener noreferrer" className="hover:text-olive-green cursor-pointer transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://t.co/VslVcPkFnd" target="_blank" rel="noopener noreferrer" className="hover:text-olive-green cursor-pointer transition-colors">
                <Send size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}