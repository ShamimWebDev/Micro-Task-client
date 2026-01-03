import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80",
      icon: <Sparkles className="text-yellow-400" />,
      title: "Unlock Your <span class='text-indigo-400'>Earning</span> Potential",
      subtitle: "Join the elite micro-tasking network. Transform your spare time into a high-performance earning engine.",
      badge: "Global Network"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
      icon: <Zap className="text-blue-400" />,
      title: "Scale Your <span class='text-pink-400'>Vision</span> Instantly",
      subtitle: "Access a global workforce of verified professionals. Deploy tasks and see real results within minutes.",
      badge: "Enterprise Ready"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=1920&q=80",
      icon: <ShieldCheck className="text-emerald-400" />,
      title: "Secure <span class='text-violet-400'>Blockchain</span> Economy",
      subtitle: "Experience the next generation of digital labor. Transparent transactions and instant coin-to-dollar payouts.",
      badge: "Secured & Verified"
    },
  ];

  return (
    <section className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[120px]" />
      </div>

      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Cinematic Background */}
              <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "linear" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
              </motion.div>

              <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20">
                <div className="max-w-3xl">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-2 mb-6"
                  >
                    <div className="h-[1px] w-8 bg-indigo-500" />
                    <span className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                      {slide.badge}
                    </span>
                  </motion.div>

                  {/* Icon & Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center border-indigo-500/20 shadow-2xl mb-8">
                      {slide.icon}
                    </div>
                    
                    <h1 
                      className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    />
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-2xl text-slate-400 mt-8 mb-12 max-w-2xl leading-relaxed font-medium"
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* CTA Area */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                  >
                    <Link
                      to="/register"
                      className="group relative px-8 py-4 bg-indigo-600 rounded-2xl text-white font-bold text-lg overflow-hidden transition-all hover:pr-12 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-95"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started Now
                        <ArrowRight size={20} className="absolute right-[-24px] group-hover:right-[-4px] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    
                    <Link
                      to="/login"
                      className="px-8 py-4 glass rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all border-white/5"
                    >
                      Explore Tasks
                    </Link>
                  </motion.div>

                  {/* Stats Quick Look */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-20 flex flex-wrap items-center gap-12 border-t border-slate-900 pt-10"
                  >
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-white">50k+</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Workers</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-white">$12M+</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Paid Out</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-white">99.9%</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Task Success</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-30" />
    </section>
  );
};

export default HeroSection;
